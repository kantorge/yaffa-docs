---
sidebar_position: 3
---

# Update Currency Exchange Rates

YAFFA can automatically update the currency exchange rates for you. This feature is useful if you have accounts in different currencies and want to keep the values up to date. The exchange rates are used to convert the values of transactions and accounts to your base currency.

You can read more about currencies in general in the [Currencies](../../assets/currencies.md) section.

At the moment, the following data providers are supported.

## Frankfurter

[Frankfurter](https://www.frankfurter.app) is a free, open-source API for current and historical foreign exchange rates. It is based on data sets published by the European Central Bank. To use Frankfurter, you do not need to sign up for an API key. This feature does not require additional configuration on the application level, besides setting up [cron jobs](cron-jobs.md).
