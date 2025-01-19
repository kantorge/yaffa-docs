---
sidebar_position: 1
title: Technology stack required by YAFFA personal finance application
sidebar_label: Technology stack
description: Learn about the technology stack required to run YAFFA personal finance application on your computer or server.
---

# Technology stack

YAFFA is a web application built with PHP, using Laravel framework. It uses a MySQL database to store data. The application is designed to be self-hosted, meaning that you can install it on your own computer or server, and have full control over your data.

This also means that in order to run YAFFA, you either need to have a web server with PHP and MySQL installed, or you need to have this environment set up on your local computer. Some of the features, like processing receipts with AI, require the ability to receive emails by the application, which can be better achived on a server than on a local machine.

## Possible environments to run YAFFA

### WAMP, XAMPP

WAMP is a software stack for Windows, consisting of Apache, MySQL and PHP, thus the acronym WAMP. It is a popular choice for local development, as it provides an easy way to set up a web server environment on a Windows computer. You might also use XAMPP, which is a similar software stack.

For step by step instructions on how to install YAFFA using XAMPP, see the [Install YAFFA using XAMPP for Windows](./install-yaffa-using-xampp-for-windows.md) guide.

### LAMP, LEMP

LAMP and LEMP are similar software stacks for Linux, consisting of Apache or Nginx, MySQL and PHP. They are popular choices for setting up web servers on Linux servers or Linux machines.

This stack can be used on other devices as well, such as Raspberry Pi. We have a step by step guide on how to install YAFFA on a Raspberry Pi, which you can find [here](./install-yaffa-on-a-raspberry.md). You can find various other guides on the internet on how to set up a LAMP or LEMP stack on different Linux distributions. For our brief guide on how to get started with LEMP on a Raspberry Pi, see [this guide](../../../other-resources/install-lemp-on-a-raspberry).

### Docker

Docker is a platform for developing, shipping, and running applications in containers. It allows users to install and run applications in isolated environments, which can be easily shared and moved between different computers. This makes it a great choice for running YAFFA on your computer, as it provides a consistent environment for the application, without the need to install all the dependencies on your host machine. Docker will take care of the server environment required to run YAFFA.

## Detailed requirements

In order to run YAFFA, you need to have the following software installed:
* A web server with PHP support (Apache, Nginx, etc.)
* PHP 8.3 or later
* MySQL 8.0 or later
    * Alternatively, you can use MariaDB 10.5 or later, but this engine is not throughly tested
* The following PHP extensions need to be installed and enabled, as they are required by Laravel:
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
* Cron job support (optional, but recommended)