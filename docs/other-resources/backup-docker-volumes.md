---
title: Backup YAFFA Docker Volumes
sidebar_label: Backup Docker Volumes
sidebar_position: 2
description: Learn how to create reliable backups of your YAFFA Docker volumes to ensure your data is safe and can be restored in case of data loss.
---

# Backup YAFFA Docker Volumes

When running YAFFA in Docker, your data is stored in two Docker volumes: `yaffa_db` (MySQL database) and `yaffa_storage` (uploaded files and application storage). These volumes are persistent and will survive container restarts, but they can be lost if deleted accidentally or if your system fails. Creating regular backups of these volumes is essential for maintaining a reliable, production-ready YAFFA instance.

This guide will help you create backups of your Docker volumes in a simple, step-by-step manner. It is assumed you have basic familiarity with Docker and command-line operations and you haven't made significant customizations to your YAFFA instance.

## Why Backup Your Docker Volumes?

Docker volumes are the lifeline of your data. Without backups, you risk losing:
- Your financial data (transactions, accounts, categories, etc.)
- Your uploaded documents and receipts
- Any customizations or configurations you've made

A production-ready YAFFA instance requires regular backups to ensure business continuity and data protection.

## Prerequisites

Before proceeding with the backup process, ensure you have:
- Docker and Docker Compose installed on your system
- YAFFA running in Docker containers
- Terminal or command-line access to your system
- Sufficient disk space for the backup files

## Backup Strategy

There are several approaches to backing up Docker volumes, each with its own advantages:

1. **Full Volume Backup** - Back up the entire volume as an archive file
2. **Incremental Backups** - Create regular backups and store only changes
3. **Cloud Backups** - Automatically back up to cloud storage services
4. **Database-Only Backups** - Back up just the MySQL database (lighter weight)

For beginners, we recommend starting with **Full Volume Backup** as it is the most straightforward and provides complete data protection.

## Method 1: Full Volume Backup Using Docker

This method backs up your entire YAFFA Docker volumes as compressed archive files. This is the recommended approach for most self-hosted instances.
This will backup both the database and storage volumes, ensuring you have a complete snapshot of your YAFFA data.

### 1.1 Create a Backup Directory

First, create a dedicated directory on your system to store the backups. For safety, this should be on a different disk or location than your YAFFA installation.

```bash
mkdir -p ~/yaffa-backups
cd ~/yaffa-backups
```

:::tip
On a VPS, consider backing up to a different partition or using an external storage service for extra redundancy.
:::

### 1.2 Back Up the Database Volume

To back up the `yaffa_db` Docker volume, you will create a temporary container that mounts the volume and creates a compressed archive.

```bash
docker run --rm -v yaffa_db:/yaffa_db -v ~/yaffa-backups:/backup alpine tar czf /backup/yaffa_db_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C / yaffa_db
```

:::note
**What this command does:**
- `docker run --rm` - Creates a temporary container that is deleted after use
- `-v yaffa_db:/yaffa_db` - Mounts the database volume
- `-v ~/yaffa-backups:/backup` - Mounts your backup directory
- `tar czf` - Creates a compressed tar.gz archive
- `$(date +%Y%m%d_%H%M%S)` - Adds timestamp to filename (e.g., `yaffa_db_backup_20260206_143022.tar.gz`)

<!--
**Screenshot recommendation:** Include a screenshot showing the command running and the terminal output confirming the backup was created successfully.
-->
:::

### 1.3 Back Up the Storage Volume

Similarly, back up the `yaffa_storage` volume which contains your uploaded files and documents.

```bash
docker run --rm -v yaffa_storage:/yaffa_storage -v ~/yaffa-backups:/backup alpine tar czf /backup/yaffa_storage_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C / yaffa_storage
```

:::note
This backup may be larger depending on how many files you've uploaded to YAFFA. If your storage volume is very large, you may want to consider backing it up less frequently or using incremental backup strategies.

**Screenshot recommendation:** Show the command output and verify both backup files are created by listing the backup directory.
:::

### 1.4 Verify Your Backups

After both backups complete, verify that the backup files were created successfully:

```bash
ls -lh ~/yaffa-backups/
```

You should see two files with recent timestamps:
- `yaffa_db_backup_YYYYMMDD_HHMMSS.tar.gz`
- `yaffa_storage_backup_YYYYMMDD_HHMMSS.tar.gz`

:::tip
Make a note of the file sizes. The database backup should typically be much smaller than the storage backup (depending on your usage).

**Screenshot recommendation:** Show the output of `ls -lh` command displaying both backup files with their sizes and timestamps.
:::

## Method 2: Backup Using Docker Compose Exec (Alternative)

If you prefer to back up the database directly from the running MySQL container without creating a temporary container, you can use `docker-compose exec` with `mysqldump`. This is useful if you want to back up just the database schema and data without the full volume structure.

### 2.1 Navigate to Your YAFFA Directory

```bash
cd ~/yaffa-docker
```

or wherever your `docker-compose.yml` file is located.

### 2.2 Create a Database Dump

Create a MySQL dump of the YAFFA database. This creates a SQL file that contains all your database data and schema.

```bash
docker-compose exec -T db mysqldump -u root -p$DB_ROOT_PASSWORD --all-databases > ~/yaffa-backups/yaffa_db_dump_$(date +%Y%m%d_%H%M%S).sql
```

:::caution
You need to have the `DB_ROOT_PASSWORD` environment variable available, or you can manually replace `$DB_ROOT_PASSWORD` with the actual password from your `.env` file. This command will output the password in your shell history, so handle it with care on shared systems.

**Screenshot recommendation:** Show the command being executed and the resulting .sql file created.
:::

### 2.3 Compress the SQL Dump (Optional)

To save disk space, you can compress the SQL file:

```bash
gzip ~/yaffa-backups/yaffa_db_dump_*.sql
```

## Method 3: Automated Backups Using a Script

For production-ready setups, automating backups is highly recommended. You can create a simple bash script that runs backups on a schedule.

### 3.1 Create a Backup Script

Create a new file called `backup.sh` in your YAFFA directory:

```bash
nano ~/yaffa-docker/backup.sh
```

Copy the following script content:

```bash
#!/bin/bash

# YAFFA Docker Backup Script
# This script backs up both the database and storage volumes

# Configuration
BACKUP_DIR="$HOME/yaffa-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_BACKUP="$BACKUP_DIR/yaffa_db_backup_$TIMESTAMP.tar.gz"
STORAGE_BACKUP="$BACKUP_DIR/yaffa_storage_backup_$TIMESTAMP.tar.gz"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup database volume
echo "Starting database volume backup..."
docker run --rm -v yaffa_db:/yaffa_db -v "$BACKUP_DIR":/backup alpine tar czf "/backup/yaffa_db_backup_$TIMESTAMP.tar.gz" -C / yaffa_db
echo "Database backup completed: $DB_BACKUP"

# Backup storage volume
echo "Starting storage volume backup..."
docker run --rm -v yaffa_storage:/yaffa_storage -v "$BACKUP_DIR":/backup alpine tar czf "/backup/yaffa_storage_backup_$TIMESTAMP.tar.gz" -C / yaffa_storage
echo "Storage backup completed: $STORAGE_BACKUP"

# Optional: Log backup completion
echo "Backup completed at $(date)" >> "$BACKUP_DIR/backup.log"

echo "All backups completed successfully!"
```

Save the file (in nano, press `Ctrl+O`, `Enter`, then `Ctrl+X`).

### 3.2 Make the Script Executable

```bash
chmod +x ~/yaffa-docker/backup.sh
```

### 3.3 Run the Backup Script

Test the script manually first:

```bash
~/yaffa-docker/backup.sh
```

:::note
**Screenshot recommendation:** Show the script output with both backups completing successfully and the log entry being created.
:::

### 3.4 Schedule Automated Backups with Cron (Linux/macOS)

For Linux or macOS systems, you can schedule the backup script to run automatically using cron. Edit your crontab:

```bash
crontab -e
```

Add a line to run the backup daily at 2:00 AM:

```bash
0 2 * * * /home/youruser/yaffa-docker/backup.sh
```

Or to run daily at 3:00 AM:

```bash
0 3 * * * /home/youruser/yaffa-docker/backup.sh
```

:::note
Replace `/home/youruser` with your actual home directory path. You can verify your username with the `whoami` command.

**Screenshot recommendation:** Show the crontab editor with the scheduled backup entry, and provide an example of the cron schedule format.
:::

### 3.5 Schedule Automated Backups with Task Scheduler (Windows)

On Windows, you can use Task Scheduler to run the backup script. This is more complex and may require converting the bash script to a PowerShell script. Consider using the PowerShell backup script approach instead.

## Method 4: Backup Using PowerShell (Windows)

On Windows systems, you can use PowerShell to create backups. This example assumes you're running Docker Desktop with WSL 2.

### 4.1 Create a PowerShell Backup Script

Create a new file called `backup.ps1` in your YAFFA directory:

```powershell
# YAFFA Docker Backup Script (PowerShell)
# This script backs up both the database and storage volumes

# Configuration
$BACKUP_DIR = "$env:USERPROFILE\yaffa-backups"
$TIMESTAMP = Get-Date -Format "yyyyMMdd_HHmmss"

# Create backup directory if it doesn't exist
if (!(Test-Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR | Out-Null
}

# Backup database volume
Write-Host "Starting database volume backup..."
docker run --rm -v yaffa_db:/yaffa_db -v "$($BACKUP_DIR):/backup" alpine tar czf "/backup/yaffa_db_backup_$TIMESTAMP.tar.gz" -C / yaffa_db
Write-Host "Database backup completed"

# Backup storage volume
Write-Host "Starting storage volume backup..."
docker run --rm -v yaffa_storage:/yaffa_storage -v "$($BACKUP_DIR):/backup" alpine tar czf "/backup/yaffa_storage_backup_$TIMESTAMP.tar.gz" -C / yaffa_storage
Write-Host "Storage backup completed"

# Log backup completion
"Backup completed at $(Get-Date)" | Add-Content "$BACKUP_DIR\backup.log"

Write-Host "All backups completed successfully!"
```

### 4.2 Run the PowerShell Script

```powershell
.\backup.ps1
```

### 4.3 Schedule Automated Backups with Task Scheduler

You can schedule the PowerShell script to run automatically using Windows Task Scheduler. See the [Windows Task Scheduler documentation](https://docs.microsoft.com/en-us/windows/win32/taskschd/task-scheduler-start-page) for detailed instructions.

:::note
**Screenshot recommendation:** Show the Task Scheduler interface with a scheduled backup task configured to run at a specific time.
:::

## Restoring from Backups

If you need to restore your YAFFA data from a backup, see the [Restore YAFFA from Docker Volume Backups](./restore-docker-volumes.md) guide for detailed instructions.

## Best Practices

- **Regular Backups:** Create backups at least weekly, preferably daily for production instances
- **Off-Site Storage:** Keep copies of your backups on a different system, external drive, or cloud storage
- **Backup Rotation:** Implement a backup rotation strategy (e.g., keep daily backups for 7 days, weekly backups for 4 weeks, monthly backups for 1 year)
- **Test Restores:** Periodically test restoring from backups to ensure they are valid and complete
- **Monitor Backup Space:** Monitor available disk space and ensure you have enough room for regular backups
- **Backup Automation:** Use automated scripts and schedulers to ensure backups run consistently without manual intervention

## Troubleshooting

### Backup Takes Too Long

If your backup is taking a very long time:
- The storage volume may be very large. Consider backing it up less frequently or using the database-only backup method
- Your system's disk I/O may be slow. Consider using faster storage or running backups during off-peak hours
- Check if Docker is under heavy load and consider running backups when the system is less busy

### Out of Disk Space

If you run out of backup space:
- Delete old backups to free up space
- Move backups to a different partition or external storage
- Implement a backup rotation script to automatically delete old backups

:::note
**Screenshot recommendation:** Show an example of checking disk space with `df -h` command and the backup directory size with `du -sh ~/yaffa-backups`.
:::

### Permission Denied Errors

If you get permission errors when running Docker commands:
- Ensure Docker is installed and running
- On Linux, add your user to the docker group: `sudo usermod -aG docker $USER`
- Log out and log back in for the group change to take effect

## Summary

You now have multiple methods to back up your YAFFA Docker volumes:
1. **Full Volume Backup** - Complete backup of both database and storage volumes (recommended for beginners)
2. **Docker Compose Exec** - Direct database dumps without full volume structure
3. **Automated Backups** - Scheduled backups using scripts and cron/Task Scheduler
4. **PowerShell Backups** - Windows-specific backup approach

Choose the method that best fits your needs and system. For most users, the automated full volume backup approach (Method 3 or 4) is ideal for maintaining a production-ready YAFFA instance.
