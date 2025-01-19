---
title: Install and Configure YAFFA on Raspberry Pi
sidebar_label: Install YAFFA on a Raspberry Pi
sidebar_position: 3
description: Learn how to install and configure YAFFA on a Raspberry Pi with a LEMP stack, and start managing your finances with ease.
---

# Install and Configure YAFFA on Raspberry Pi

This guide will help you install a basic working instance of YAFFA on your Raspberry Pi. It will guide you through the installation of YAFFA web application itself. This guide assumes that you have already set up your Raspberry Pi with a LEMP stack.

:::tip

For a brief guide on how to set up a LEMP stack on a Raspberry Pi, see [this guide](../../../other-resources/install-lemp-on-a-raspberry). For more detailed instructions or help with troubleshooting, you can refer to the official documentation of the software components or search the internet for more detailed guides.

:::

## 1. Download YAFFA

As a first step, you need to download the files of YAFFA. For this, we will use Composer, a dependency manager for PHP.

First, navigate to the directory where you want to install YAFFA. If you followed our guide, then you can head to the folder we created at `/var/www/yaffa`:

```bash
cd /var/www/yaffa
```

Make sure that the folder is empty, and then download YAFFA using Composer:

```bash
git clone https://github.com/kantorge/yaffa.git . --branch main
```

import Step2RepositoryCloned from '/img/raspberry-pi-yaffa/2-repository-cloned.png';

<img src={Step2RepositoryCloned} alt="Screenshot of the repository cloned" className="zoomable img-50" />

## 2. Prepare your database

YAFFA stores its data in a MySQL database. This includes various assets like accounts, payees, categories, and also the transactions you record. You need to create a new database and a user with the necessary permissions to access it.

* Open your MySQL client, and log in as the root user. You can use the following command:

```bash
sudo mysql -u root -p
```

import Step3CreateDbAssets from '/img/raspberry-pi-yaffa/3-create-db-assets.png';

<img src={Step3CreateDbAssets} alt="Screenshot of creating the database for YAFFA" className="zoomable img-50" />

Let's create a user and a database for YAFFA. You can replace `yaffa` with your desired username, `password` with your desired password, and `yaffa` with your desired database name. In this case, make the necessary changes in the code snippets below:

```sql
CREATE DATABASE yaffa;
CREATE USER 'yaffa'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON yaffa.* TO 'yaffa'@'localhost';
FLUSH PRIVILEGES;
```

import Step4DbAssetsCreated from '/img/raspberry-pi-yaffa/4-db-assets-created.png';

<img src={Step4DbAssetsCreated} alt="Screenshot of the database and user created" className="zoomable img-50" />

You can now exit the MySQL client:

```sql
exit
```

## 3. Install packages

Before you can start using YAFFA, you need to install the necessary packages. This includes Composer, which is a dependency manager for PHP, and NPM, which is a package manager for JavaScript. At this point we assume that you have Composer installed.

* Install the necessary PHP packages:

```bash
composer install --no-dev --no-scripts
```

The end result should look like this:

import Step5ComposerPackagesInstalled from '/img/raspberry-pi-yaffa/5-composer-packages-installed.png';

<img src={Step5ComposerPackagesInstalled} alt="Screenshot of the Composer packages installed" className="zoomable img-50" />

## 4. Configure YAFFA

As any Laravel application, YAFFA needs to be configured to work with your environment. This includes setting up the database connection, application key, and other settings. This guide covers the base configuration, but you can find more advanced settings in the `.env` file. Some of these are also covered in the [Advanced settings](../advanced-settings/index.md) guide.

* The settings of YAFFA will be stored in a `.env` file. While still in your YAFFA folder and your terminal, make a copy of the sample `.env` file:

```bash
cp .env.example .env
```

* One important setting is the application key. It can be edited in the newly created `.env` file directly, or it can be created by running the following command:

```bash
php artisan key:generate
```

import Step6AppKeyGenerated from '/img/raspberry-pi-yaffa/6-app-key-generated.png';

<img src={Step6AppKeyGenerated} alt="Screenshot of the application key generated" className="zoomable img-50" />

At this point, you can open the `.env` file in your favorite text editor and adjust the settings to match your environment.

```bash
nano .env
```

* Set the database connection parameters according to the values you have used to create the MySQL user and database. Use the `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD` settings accordingly.
* Review the APP_URL, if you would like to use something else than the IP address of the Raspberry Pi to access YAFFA from your browser.

import Step7EnvFileUpdated from '/img/raspberry-pi-yaffa/7-env-file-updated.png';

<img src={Step7EnvFileUpdated} alt="Screenshot of the .env file updated" className="zoomable img-50" />

## 5. Build the database

In an earlier step you created a database and a user for YAFFA. Now it's time to create the tables and relationships that YAFFA needs to function. Fortunately, Laravel provides a convenient way to do this. In the command prompt, from the directory where YAFFA is installed, run the following command to create all the database tables, that are used by YAFFA.

```bash
php artisan migrate
```

Your output should look similar to this:

import Step8DatabaseMigrated from '/img/raspberry-pi-yaffa/8-database-migrated.png';

<img src={Step8DatabaseMigrated} alt="Screenshot of the database migrated" className="zoomable img-50" />

## 6. Set up the storage

YAFFA uses the `storage` directory to store various files, like logs, cache, and uploaded files. You need to set the correct permissions for this directory.

```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

## 7. Set up the web server

YAFFA is a web application, so you need to configure your web server to serve the application. In this guide, we will use Nginx as the web server. You might have this configuration in place if you followed our guide on how to set up a LEMP stack on a Raspberry Pi. You still need to make some adjustments to the configuration to serve YAFFA.

* Create a new server block for YAFFA:

```bash
sudo nano /etc/nginx/sites-available/yaffa
```

Paste the following configuration into the file. Make sure to adjust the `server_name` and `root` directives to match your environment.

```nginx
server {
    listen 80;
    server_name yaffa.local;

    root /var/www/yaffa/public;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

Enable the configuration if you haven't done so already, and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/yaffa /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

## 8. Test your YAFFA installation

You can now open your browser and navigate to the IP address of your Raspberry Pi, or the domain you have set up in the Nginx configuration. You should see the YAFFA login screen.

import Step9YaffaLogin from '/img/raspberry-pi-yaffa/9-yaffa-login.png';

<img src={Step9YaffaLogin} alt="Screenshot of the YAFFA login screen" className="zoomable img-50" />

**Congratulations!** You have successfully installed YAFFA on your Raspberry Pi. You can now log in and start using the application. Enjoy managing your finances with ease! If you encounter any issues, refer to our documentation or reach out to us for assistance.

For instructions on the first steps to start using YAFFA, please visit the guide on the [registration](../registration.md).