---
title: Automate Your Financial Tasks with Cron Jobs
sidebar_label: Cron jobs
sidebar_position: 2
description: Learn how to set up cron jobs in YAFFA personal finance application to automate your financial tasks.
---

# Cron jobs

One of the advanced, but still essential, settings for YAFFA is the configuration of cron jobs. Cron jobs are scheduled tasks that run at specific intervals. YAFFA uses cron jobs to perform various tasks, such as
* [updating exchange rates](update-exchange-rates.md),
* [download investment prices](download-investment-prices.md),
* cache certain values to speed up the application,
* automatically record recurring transactions.

Setting up cron jobs depends on your server environment. The generic guideline in the Laravel documentation is available [here](https://laravel.com/docs/10.x/scheduling#running-the-scheduler).
