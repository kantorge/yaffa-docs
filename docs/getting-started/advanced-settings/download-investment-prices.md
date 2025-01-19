---
title: Automatically Download Investment Prices
sidebar_label: Download investment prices
sidebar_position: 4
description: Learn how to automatically download the latest prices of your investments in YAFFA personal finance application.
---

# Download Investment Prices

If you are using YAFFA to track your investments, you can download the latest prices of certain investments automatically. This feature is useful to keep your investment portfolio up to date and to calculate the current value of your investments.

At the moment, the following data providers are supported.

## Alpha Vantage

Alpha Vantage is a free API that provides historical and real-time data for stocks, forex, and cryptocurrencies. To use Alpha Vantage, you need to [sign up for a free API key](https://www.alphavantage.co/support/#api-key).

Once this is done, you need to edit the `.env` file of your deployment. Look for the `ALPHA_VANTAGE_KEY` variable and set it to your API key. Make sure to reload the configuration of your deployment using the appropriate Artisan command.

```bash
php artisan config:cache
```

Read about using the feature in the Investments section.

## Web scraping

Web scraping is a technique to extract data from websites. YAFFA is capable of opening a website and to look for some predefined elements to extract the data. This feature is useful if your investment provider does not host an API to access such data. This feature does not require additional configuration on the application level, besides setting up [cron jobs](cron-jobs.md).

Read about using the feature in the Investments section.