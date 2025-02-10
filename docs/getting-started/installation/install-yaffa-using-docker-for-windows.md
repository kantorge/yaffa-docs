---
sidebar_position: 3
---

# Install YAFFA using Docker for Windows

This guide will help you install a basic working instance of YAFFA on your Windows machine using Docker.

Docker is a platform for developing, shipping, and running applications in containers. At this point, we assume that you have already installed Docker and Docker Compose on your computer. This guide uses Windows and Windows Subsystem for Linux (WSL) 2 to run Docker containers.

You can read about the environment requirements in the [Technology stack](./technology.md) guide.

## 1. Start your Docker environment

Start Docker Desktop on your computer.

import DockerDesktopRunning from '/img/docker-installation/1-docker-desktop-running.png';

<img src={DockerDesktopRunning} alt="Screenshot of Docker Desktop running" className="zoomable img-50" />

## 2. Create a new directory for YAFFA

Open a terminal of your choice to proceed with the installation. You can use the WSL Terminal, Command Prompt, or PowerShell. We will use the Ubuntu WSL in this guide.

You will download the necessary files to configure and run YAFFA in this directory.

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

* To do this, open the `.env` file in your text editor, e.g.

```bash
nano .env
```

* Review and edit the database settings if you want to use a different database name, user, or password. **Most importantly**, you need to set the `DB_HOST` to `db`, which is the name of the MySQL service in the Docker Compose file.

Once you are done with all changes, save the file and exit the editor.

You also need change the application key, either manually by editing the `.env` file, or by running the following command in the terminal. This will fill in the `APP_KEY` value in the `.env` file, or overwrite it if it already exists.
(It assumes, that you are in the `yaffa-docker` directory, and you have OpenSSL installed, which should be the case by default on most Linux/macOS systems.)

```bash
grep -q '^APP_KEY=' .env && \
  sed -i 's|^APP_KEY=.*|APP_KEY=base64:'"$(openssl rand -base64 32)"'|' .env || \
  echo "APP_KEY=base64:$(openssl rand -base64 32)" >> .env
```

## 5. Start YAFFA

Start YAFFA using Docker Compose.

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

When you are done using YAFFA, you can stop the containers.

```bash
docker-compose down
```

Note that this will stop the application, its scheduled cron jobs, and the database, but the data will be preserved.

:::caution
You now have a working instance of YAFFA, which stores its data in a MySQL database. The MySQL files, logs, and any uploaded content are located in the `yaffa_db` and `yaffa_storage` Docker volumes, respectively.

* If you delete these volumes, you will lose all your data.
* If you want to back up your YAFFA data, you need to back up the Docker volumes.
* If you want to keep your data private, you need to secure access to the Docker volumes.

These are not handled by YAFFA or Docker, nor covered by this guide.
:::