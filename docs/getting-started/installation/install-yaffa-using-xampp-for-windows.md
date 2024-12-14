---
sidebar_position: 2
---

# Install YAFFA using XAMPP for Windows

This guide will help you install a basic working instance of YAFFA on your Windows machine using XAMPP.

 XAMPP is a software stack for Windows, consisting of Apache, MySQL, PHP. At this point, we assume that you have already installed XAMPP on your computer. You can read about the environment requirements in the [Technology stack](./technology.md) guide.

## 1. Start your XAMPP environment

* Start XAMPP on your computer, and using the XAMPP control panel, start Apache and MySQL services as illustrated below.

import XamppInstallationOnline from '/img/xampp-installation-online.png';

<img src={XamppInstallationOnline} alt="Screenshot of XAMPP control panel" className="zoomable img-50" />

This will start the Apache web server and MySQL database server, which are required to run YAFFA. It will allow you to execute the tasks needed to install YAFFA, and later to access the application from your browser.

## 2. Prepare Your Database:

YAFFA stores its data in a MySQL database. This includes varius assets like accounts, payees, categories, and also the transactions you record. You need to create a new database and a user with the necessary permissions to access it.

* Open PhpMyAdmin, which comes bundled with your XAMPP installation. This should be available at [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
* Create a new user and a database for YAFFA, noting the username, password, and database name for the upcoming configuration.
    * For this guide we are using username `yaffa` with password `password` and database named `yaffa`.

import XamppInstallationMysqlDatabase from '/img/xampp-installation-mysql-database.png';

<img src={XamppInstallationMysqlDatabase} alt="Screenshot of PhpMyAdmin" className="zoomable img-50" />

## 3. Download YAFFA

As a next step, you need to download the files of YAFFA. For this, we will use Composer, a dependency manager for PHP. If you don't have Composer installed yet, you can download it from [https://getcomposer.org/download/](https://getcomposer.org/download/).

* Start your Command Prompt or Powershell
* Navigate to your XAMPP installation directory, and open the Document Root folder (commonly C:/xampp/htdocs)
* Create a dedicated folder for YAFFA, for example `yaffa`, and enter it
* Download YAFFA using Composer, with the following command

    ```mdx
    composer create-project kantorge/yaffa --no-dev --no-script --prefer-dist .
    ```

    * This will download the latest version of YAFFA from Packagist, and install it in the current folder, including all its dependencies. Wait until the entire process is complete, it can take a minute or two, depending on your bandwidth and computer.


## 4. Configure YAFFA

As any Laravel application, YAFFA needs to be configured to work with your environment. This includes setting up the database connection, application key, and other settings.

* The settings of YAFFA will be stored in a .env file. While still in your YAFFA folder and your command prompt, make a copy of the sample .env file.

    ```mdx
    cp .env.example .env
    ```

* One important setting is the application key. It can be edited in the newly created .env file directly, or it can be created by running the following command. (Assuming that XAMPP is still running.)

    ```mdx
    php artisan key:generate
    ```

* Open the .env file with a text editor of your choice, and make the following settings as a minimum:
    * Set the database connection parameters according to the values you have used to create the MySQL user and database. Use the `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD` settings accordingly.
    * Review the APP_URL, if you would like to use something else than `http://yaffa.test` to access YAFFA from your browser.

For a basic setup, you can leave the other settings as they are. You can always come back and adjust them later. For a comprehensive list of settings, refer to the comments and descriptions in the .env.example file, which was added to the installation folder. Some of these are also covered in the [Advanced settings](/resources/category/advanced-settings/) guide.

## 5. Set the selected host by editing the hosts file

You need the change some system settings so that your computer knows where to find YAFFA when you type the URL in your browser.

* Open the hosts file with any text editor as an administrator (usually located at C:/Windows/System32/drivers/etc/hosts). Add the following line:

    ```mdx
    127.0.0.1    yaffa.test
    ```

This setting instructs Windows to redirect the requests for yaffa.test to your local machine, where the Apache server is running.

## 6. Edit Apache settings within XAMPP

Next, you need to configure Apache to serve YAFFA from the correct folder.

* Locate the `httpd-vhosts.conf` file in your Apache’s conf directory (e.g., C:/xampp/apache/conf/extra/httpd-vhosts.conf). Add the following lines and save the file. Adjust the path to your installation, if needed.

    ```mdx
    <VirtualHost *:80>
        DocumentRoot "C:/xampp/htdocs/yaffa/public"
        ServerName yaffa.test
        <Directory "C:/xampp/htdocs/yaffa/public">
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>
    </VirtualHost>
    ```

* Restart Apache from the XAMPP Control Panel to apply these changes.

## 7. Build the YAFFA database

In an earlier step you created a database and a user for YAFFA. Now it's time to create the tables and relationships that YAFFA needs to function. Fortunately, Laravel provides a convenient way to do this.

* In the command prompt, from the directory where YAFFA is installed, run the following command to create all the database tables, that are used by YAFFA.

    ```mdx
    php artisan migrate
    ```

## 8. Launch YAFFA

**Congratulations!** You’ve successfully installed YAFFA on your Windows machine using XAMPP. Enjoy managing your finances with ease! If you encounter any issues, refer to our documentation or reach out to us for assistance.

* Open your browser and visit the specified URL, e.g., [http://yaffa.test](http://yaffa.test), to access your newly installed YAFFA instance.

For instructions on the first steps to start using YAFFA, please visit the guide on the [registration](../registration.md).