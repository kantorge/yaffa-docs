---
sidebar_position: 1
---

# Technology stack

YAFFA is a web application built with PHP, using Laravel framework. It uses a MySQL database to store data. The application is designed to be self-hosted, meaning that you can install it on your own computer or server, and have full control over your data.

This means that in order to run YAFFA, you either need to have a web server with PHP and MySQL installed, or you need to have this environment set up on your local computer.

## Possible environments to run YAFFA

### WAMP, XAMPP

WAMP is a software stack for Windows, consisting of Apache, MySQL and PHP, thus the acronym WAMP. It is a popular choice for local development, as it provides an easy way to set up a web server environment on a Windows computer. You might also use XAMPP, which is a similar software stack.

### LAMP, LEMP

LAMP and LEMP are similar software stacks for Linux, consisting of Apache or Nginx, MySQL and PHP. They are popular choices for setting up web servers on Linux servers or Linux machines.
This stack can be used on other devices as well, such as Raspberry Pi.


## Detailed requirements

In order to run YAFFA, you need to have the following software installed:
* A web server with PHP support (Apache, Nginx, etc.)
* PHP 8.3 or later
* The following PHP extensions need to be installed and enabled:
    * Ctype PHP Extension
    * cURL PHP Extension
    * DOM PHP Extension
    * Fileinfo PHP Extension
    * Filter PHP Extension
    * Hash PHP Extension
    * Mbstring PHP Extension
    * OpenSSL PHP Extension
    * PCRE PHP Extension
    * PDO PHP Extension
    * Session PHP Extension
    * Tokenizer PHP Extension
    * XML PHP Extension
* Composer
* Node.js and npm
* Cron job support (optional, but recommended)
* MySQL 8.0 or later