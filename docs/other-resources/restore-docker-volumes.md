---
title: Restore YAFFA from Docker Volume Backups
sidebar_label: Restore Docker Volumes
sidebar_position: 3
description: Learn how to restore your YAFFA data from Docker volume backups, ensuring your application is back online with all your data intact.
---

# Restore YAFFA from Docker Volume Backups

After creating backups of your YAFFA Docker volumes (as described in [Backup YAFFA Docker Volumes](./backup-docker-volumes.md)), you may need to restore your data if something goes wrong. This guide will help you restore your YAFFA instance from previously created backups.

Restoration is critical for recovering from data loss, hardware failures, or accidental deletions. Having a tested restore procedure is part of maintaining a production-ready YAFFA instance.

## Prerequisites

Before proceeding with the restore process, ensure you have:
- Docker and Docker Compose installed on your system
- A backup file created using the methods described in [Backup YAFFA Docker Volumes](./backup-docker-volumes.md)
- Access to the backup files (either local or downloaded from external storage)
- YAFFA containers stopped (if doing a full restore)
- Sufficient disk space for the restore operation

## Important Notes

:::caution
**Restore Operations Overwrite Existing Data:**
When restoring a backup, you are replacing the current contents of your Docker volumes with the backup data. This means:
- Any data created after the backup was taken will be lost
- The existing volumes will be overwritten completely
- There is no automatic rollback - the operation cannot be undone

**Always ensure you have a current backup before starting restoration!**
:::

## Scenario 1: YAFFA Still Running - Restore to New Volumes

If YAFFA is still running and you want to restore to new volumes without affecting the current installation, you can create new volumes and restore to them. This allows you to compare data or keep the current version as a fallback.

### 1.1 Create New Docker Volumes

```bash
docker volume create yaffa_db_restored
docker volume create yaffa_storage_restored
```

### 1.2 Extract Database Backup to New Volume

Navigate to your backup directory:

```bash
cd ~/yaffa-backups
```

Extract the database backup:

```bash
docker run --rm -v yaffa_db_restored:/yaffa_db -v $(pwd):/backup alpine tar xzf /backup/yaffa_db_backup_YYYYMMDD_HHMMSS.tar.gz -C /
```

Replace `yaffa_db_backup_YYYYMMDD_HHMMSS.tar.gz` with your actual backup filename.

:::note
**What this command does:**
- `docker run --rm` - Creates a temporary container
- `-v yaffa_db_restored:/yaffa_db` - Mounts the new database volume
- `-v $(pwd):/backup` - Mounts the current directory (containing backups)
- `tar xzf` - Extracts the compressed backup file

**Screenshot recommendation:** Show the command being executed and the terminal output confirming successful extraction.
:::

### 1.3 Extract Storage Backup to New Volume

Similarly, extract the storage backup:

```bash
docker run --rm -v yaffa_storage_restored:/yaffa_storage -v $(pwd):/backup alpine tar xzf /backup/yaffa_storage_backup_YYYYMMDD_HHMMSS.tar.gz -C /
```

### 1.4 Verify the New Volumes

List the files in the restored volumes to verify they were extracted correctly:

```bash
docker run --rm -v yaffa_db_restored:/yaffa_db alpine ls -la /yaffa_db/
```

You should see database files like `ibdata1`, `mysql`, `yaffa`, etc.

:::note
**Screenshot recommendation:** Show the output of the `ls -la` command displaying the database files in the restored volume.
:::

## Scenario 2: Full Restore - Replace Existing Volumes

If your YAFFA instance is corrupted or you want to do a complete restore, you will need to replace the existing volumes with the backup data.

### 2.1 Stop YAFFA Containers

First, stop all running YAFFA containers:

```bash
cd ~/yaffa-docker
docker-compose down
```

This will stop the containers but preserve the volumes. If you want to completely remove the old volumes after confirming the restore is successful, you can add the `-v` flag:

```bash
docker-compose down -v
```

:::caution
Only use `docker-compose down -v` if you are certain you want to delete the existing volumes. This action cannot be undone. Make sure you have verified backups before doing this.
:::

### 2.2 Verify Backups Are Available

Before proceeding, verify that your backup files are accessible:

```bash
ls -lh ~/yaffa-backups/yaffa_*_backup_*.tar.gz
```

You should see both database and storage backup files.

:::note
**Screenshot recommendation:** Show the backup files listed with their dates and sizes, confirming they are available for restoration.
:::

### 2.3 Delete Existing Volumes (If Starting Fresh)

If you stopped containers without `-v` flag and want to delete the old volumes:

```bash
docker volume rm yaffa_db yaffa_storage
```

:::caution
This step is **optional** and **destructive**. Only perform this if you are certain you don't need the existing data and have verified backups.
:::

### 2.4 Create New Empty Volumes

If you deleted the old volumes in step 2.3, create new ones:

```bash
docker volume create yaffa_db
docker volume create yaffa_storage
```

If you kept the old volumes, skip this step - you will overwrite them.

### 2.5 Extract Database Backup

Navigate to your backup directory:

```bash
cd ~/yaffa-backups
```

Extract the backup into the volume. If you're overwriting an existing volume, you may need to first delete the existing data inside it:

```bash
docker run --rm -v yaffa_db:/yaffa_db alpine sh -c "rm -rf /yaffa_db/* && true"
```

Then extract the backup:

```bash
docker run --rm -v yaffa_db:/yaffa_db -v $(pwd):/backup alpine tar xzf /backup/yaffa_db_backup_YYYYMMDD_HHMMSS.tar.gz -C /
```

Replace `yaffa_db_backup_YYYYMMDD_HHMMSS.tar.gz` with your actual backup filename.

### 2.6 Extract Storage Backup

Similarly, clean and extract the storage backup:

```bash
docker run --rm -v yaffa_storage:/yaffa_storage alpine sh -c "rm -rf /yaffa_storage/* && true"
```

Then extract:

```bash
docker run --rm -v yaffa_storage:/yaffa_storage -v $(pwd):/backup alpine tar xzf /backup/yaffa_storage_backup_YYYYMMDD_HHMMSS.tar.gz -C /
```

### 2.7 Start YAFFA Containers

Navigate back to your YAFFA directory and start the containers:

```bash
cd ~/yaffa-docker
docker-compose up -d
```

This will restart the containers using the restored volumes.

:::note
**Screenshot recommendation:** Show the Docker containers starting up and the output of `docker-compose ps` confirming all services are running.
:::

### 2.8 Verify YAFFA is Accessible

Open your browser and navigate to YAFFA:
- **Docker for Windows:** http://localhost
- **Docker on VPS:** http://your-domain.com:8400 (or your configured domain and port)

Log in and verify that your data has been restored correctly.

:::note
**Screenshot recommendation:** Show the YAFFA login page and a successful login displaying the restored data (accounts, transactions, etc.).
:::

## Scenario 3: Database-Only Restore

If you have a SQL dump backup (created using `mysqldump`), you can restore just the database without the full volume structure.

### 3.1 Stop YAFFA Containers

```bash
cd ~/yaffa-docker
docker-compose down
```

### 3.2 Create or Reset Database Volume

Create an empty database volume:

```bash
docker volume create yaffa_db
```

Or delete and recreate if one already exists:

```bash
docker volume rm yaffa_db
docker volume create yaffa_db
```

### 3.3 Start Only the Database Container

Start just the database container with the volume:

```bash
cd ~/yaffa-docker
docker-compose up -d db
```

Wait a few seconds for the database to initialize.

### 3.4 Restore the SQL Dump

Navigate to your backup directory and restore the SQL dump:

```bash
cd ~/yaffa-backups
```

If your backup is compressed (`.sql.gz`), decompress it first:

```bash
gunzip yaffa_db_dump_YYYYMMDD_HHMMSS.sql.gz
```

Then restore the database:

```bash
docker exec -i yaffa-docker_db_1 mysql -u root -p$DB_ROOT_PASSWORD < yaffa_db_dump_YYYYMMDD_HHMMSS.sql
```

:::caution
This requires the `DB_ROOT_PASSWORD` environment variable to be set, or you can manually provide the password. This is a security risk as passwords in command history can be exposed.

A safer approach is to use a `.my.cnf` file or to source the `.env` file:

```bash
source ~/yaffa-docker/.env
docker exec -i yaffa-docker_db_1 mysql -u root -p$DB_ROOT_PASSWORD < yaffa_db_dump_YYYYMMDD_HHMMSS.sql
```

**Screenshot recommendation:** Show the restore command being executed and the database import process completing.
:::

### 3.5 Start All Containers

Start the remaining containers:

```bash
cd ~/yaffa-docker
docker-compose up -d
```

## Scenario 4: Restore from Cloud Backup

If your backups are stored on cloud storage (AWS S3, Google Cloud Storage, Azure Blob Storage, etc.), you need to download them first.

### 4.1 Download Backup from Cloud

Example using AWS S3:

```bash
aws s3 cp s3://your-bucket-name/yaffa_db_backup_YYYYMMDD_HHMMSS.tar.gz ~/yaffa-backups/
```

Or using a cloud provider's web console, download the backup files to your backup directory.

### 4.2 Proceed with Restore

Once downloaded, proceed with the restore steps from **Scenario 2** or **Scenario 3** above, depending on your backup type.

:::note
**Screenshot recommendation:** Show the cloud storage interface with backup files, and the download/copy operation in progress.
:::

## Verifying Your Restore

After restoring, follow these steps to verify that everything is working correctly:

### Check Container Status

```bash
docker-compose ps
```

All containers should be in the `Up` state.

:::note
**Screenshot recommendation:** Show the output of `docker-compose ps` with all services running.
:::

### Access YAFFA

Open your browser and navigate to your YAFFA instance. Log in and verify:
- Your accounts are present
- Your transactions are visible
- Your categories and payees exist
- Any uploaded files or documents are accessible

### Check Database Integrity

You can verify the database is functioning by creating a new transaction and checking if it saves correctly.

:::note
**Screenshot recommendation:** Show YAFFA dashboard with restored data, and a new transaction being created to verify write operations work.
:::

### Check Application Logs

Check the application logs for any errors:

```bash
docker-compose logs app
```

Look for any error messages that might indicate issues with the restore.

:::note
**Screenshot recommendation:** Show the logs output confirming the application started successfully without major errors.
:::

## Troubleshooting

### Permission Denied When Extracting

If you get permission denied errors:
- Ensure Docker is running: `docker ps`
- On Linux, ensure your user is in the docker group: `sudo usermod -aG docker $USER`
- Try running commands with `sudo` if necessary

### Backup File Not Found

If the backup file cannot be found:
- Verify the filename with `ls ~/yaffa-backups/`
- Ensure you're using the correct path
- Check if the backup file was moved or deleted

### Database Still Won't Start

If the database container fails to start after restore:
- Check the logs: `docker-compose logs db`
- The backup might be corrupted - try restoring a different backup
- Ensure the disk has enough space: `df -h`

### YAFFA Shows No Data After Restore

If YAFFA starts but shows no data:
- Verify the database was restored correctly: `docker exec -it yaffa-docker_db_1 mysql -u root -p$DB_ROOT_PASSWORD -e "USE yaffa; SHOW TABLES;"`
- You may have restored an old or wrong backup
- Try restoring from a different backup file

:::note
**Screenshot recommendation:** Show the MySQL query output displaying the YAFFA tables to verify the database structure is intact.
:::

## Best Practices for Restoring

- **Test Restores Regularly:** Periodically test restoring from backups to ensure they work when you need them
- **Document Your Procedure:** Keep notes on which backup corresponds to what date and what data it contains
- **Verify Before Deleting Old Data:** Always verify the restore is successful before deleting old volumes
- **Keep Multiple Backups:** Maintain multiple versions of backups (daily, weekly, monthly) so you can restore to different points in time
- **Monitor Restore Time:** Note how long restores take so you can plan for recovery time in emergencies

## Summary

You now know how to restore your YAFFA data from Docker volume backups:

1. **Scenario 1:** Restore to new volumes without affecting current installation
2. **Scenario 2:** Full restore, replacing existing volumes (destructive)
3. **Scenario 3:** Database-only restore from SQL dumps
4. **Scenario 4:** Restore from cloud-stored backups

The restoration process is straightforward once you understand the steps. Regular testing of your restore procedure ensures you can recover quickly if disaster strikes.

For detailed backup procedures, see [Backup YAFFA Docker Volumes](./backup-docker-volumes.md).
