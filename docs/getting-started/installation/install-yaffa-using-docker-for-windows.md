---
sidebar_position: 3
---

# Install YAFFA using Docker for Windows

This guide will help you install a basic working instance of YAFFA on your Windows machine using Docker.

Docker is a platform for developing, shipping, and running applications in containers. At this point, we assume that you have already installed Docker and Docker Compose on your computer. This guide uses Windows and Windows Subsystem for Linux (WSL) 2 to run Docker containers.

You can read about the environment requirements in the [Technology stack](./technology.md) guide.

## 1. Start your Docker environment

* Start Docker Desktop on your computer. You can find it in the Start menu, or by searching for it in the search bar.

import DockerDesktopRunning from '/img/docker-installation/1-docker-desktop-running.png';

<img src={DockerDesktopRunning} alt="Screenshot of Docker Desktop running" className="zoomable img-50" />

## 2. Create a new directory for YAFFA

Open a terminal of your choice to proceed with the installation. You can use the WSL Terminal, Command Prompt, or PowerShell. We will use the Ubuntu WSL in this guide.

You will download the necessary files to configure and run YAFFA in this directory. Also, the database files will be stored here later.

* Create a new directory for YAFFA, for example `yaffa`, and enter it.

```bash
mkdir yaffa-docker
cd yaffa-docker
```

## 3. Download YAFFA

You'll need two files to run YAFFA with Docker: `docker-compose.yml` and `.env`.

**A.** You can download these files using your browser and save them in the `yaffa-docker` directory.
- [Download docker-compose.yml](https://raw.githubusercontent.com/kantorge/yaffa/refs/heads/main/docker/docker-compose.yml)
- [Download the .env example file](https://raw.githubusercontent.com/kantorge/yaffa/refs/heads/main/.env.example), and rename it to `.env`.

**B.** Alternatively, you can use the terminal to download the files directly.

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/kantorge/yaffa/refs/heads/main/docker/docker-compose.yml
```

```bash
curl -o .env https://raw.githubusercontent.com/kantorge/yaffa/refs/heads/main/.env.example
```

## 4. Configure YAFFA

As any Laravel application, YAFFA needs to be configured to work with your environment. This includes setting up the database connection, application key, and other settings.

* Open the `.env` file in your  text editor.

```bash
nano .env
```

Review and edit the database settings if you want to use a different database name, user, or password. You can also change the application key, or this can be generated later. Once you are done, save the file and exit the editor.

Most importantly, you need to set the `DB_HOST` to `db`, which is the name of the MySQL service in the Docker Compose file.

## 5. Start YAFFA

* Start YAFFA using Docker Compose.

```bash
docker-compose up -d
```

This command will download the necessary Docker images, create the containers, and start the services. It will take a few minutes to complete, depending on your internet connection and computer performance. The `-d` flag will run the containers in the background, so you can continue using the terminal.

import DockerContainersRunning from '/img/docker-installation/2-docker-containers-running.png';

<img src={DockerContainersRunning} alt="Screenshot of Docker containers running" className="zoomable img-50" />

During the launch of the containers, Docker will also take care of migrating the database, and creating the necessary tables for YAFFA.

## 6. Access YAFFA

Once the containers are running, you can access YAFFA from your browser at [http://localhost](http://localhost).

import YaffaLogin from '/img/docker-installation/3-yaffa-login.png';

<img src={YaffaLogin} alt="Screenshot of YAFFA login page" className="zoomable img-50" />

For instructions on the first steps to start using YAFFA, please visit the guide on the [registration](../registration.md).

## 7. Stop YAFFA

When you are done using YAFFA, you can stop the containers. Note that this will stop the application, its scheduled cron jobs, and the database, but the data will be preserved.

:::caution
You now have a working instance of YAFFA, which stores its data in a MySQL database. The MySQL files are located in the `db_data` directory in your `yaffa-docker` directory.

* If you delete this directory, you will lose all your data.
* If you want to back up your YAFFA data, you need to back up this directory.
* If you want to keep your data private, you need to secure this directory.

These are not handled by YAFFA or Docker, nor covered by this guide.
:::