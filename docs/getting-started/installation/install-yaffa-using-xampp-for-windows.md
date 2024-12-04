---
sidebar_position: 2
---

# Install YAFFA using XAMPP for Windows

This guide will help you install YAFFA on your Windows machine using XAMPP. XAMPP is a software stack for Windows, consisting of Apache, MySQL, PHP. At this point, we assume that you have already installed XAMPP on your computer.

## 1. Start your XAMPP environment

* Using the XAMPP control panel, start Apache and MySQL services
![Screenshot of XAMPP control panel](/img/xampp-installation-online.png)

## 2. Prepare Your Database:

* Open PhpMyAdmin, which comes bundled with your XAMPP installation. This should be available at <a href="http://localhost/phpmyadmin" rel="nofollow">http://localhost/phpmyadmin</a>
* Create a new user and a database for YAFFA, noting the username, password, and database name for the upcoming configuration.
    * Check out this step-by-step instructions if you need further guidance on this
    * For this guide we are using username `yaffa` with password `password` and database named `yaffa`.
![Screenshot of PhpMyAdmin](/img/xampp-installation-mysql-database.png)

## 3. Download YAFFA

* Start your Command Prompt or Powershell
* Navigate to your XAMPP installation directory, and open the Document Root folder (commonly C:/xampp/htdocs)
* Create a dedicated folder for YAFFA, for example `yaffa`, and enter it
* Download YAFFA using Composer, with the following command
    * This will download the latest version of YAFFA from Packagist, and install it in the current folder, including all its dependencies. Wait until the entire process is complete, it can take a minute or two, depending on your bandwidth and computer.

    ```mdx
    composer create-project kantorge/yaffa --no-dev --no-script --prefer-dist .
    ```

## 4. Configure YAFFA

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

## 5. Set the selected host by editing the hosts file

* Open the hosts file as an administrator (usually located at C:/Windows/System32/drivers/etc/hosts). Add the following line:

    ```mdx
    127.0.0.1    yaffa.test
    ```

## 6. Edit Apache settings within XAMPP

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

* In the command prompt, from the directory where YAFFA is installed, run the following command to create all the database tables, that are used by YAFFA.

    ```mdx
    php artisan migrate
    ```

## 8. Launch YAFFA

* Open your browser and visit the specified URL, e.g., <a href="http://yaffa.test" rel="nofollow">http://yaffa.test</a>, to access your newly installed YAFFA instance.

**Congratulations!** You’ve successfully installed YAFFA on your Windows machine using XAMPP. Enjoy managing your finances with ease! If you encounter any issues, refer to our documentation or reach out to our support team for assistance.

For instructions on the first steps to start using YAFFA, please visit this guide.