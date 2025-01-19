---
title: Manage Multi-Currency Finances with Ease
sidebar_label: Currencies
description: Learn about currencies in YAFFA personal finance application, and how to use them to manage multi-currency finances.
---

import globalData from '@site/src/globalData';

# Currencies

**Currencies** are used to represent the correct monetary value of any amount associated with a transaction, the balance of an account, or the total value of your assets and liabilities. Currencies are used to determine the exchange rate when you have transactions in different currencies, and they are used to display amounts in the correct format.

You can have as many currencies as you need, or you can use only one currency for all your account and transactions, if you don't have or don't track transactions in different currencies. If you manage multiple currencies, then you must set a **base currency**, which is the currency in which you want to see the total value of your assets and liabilities, and the majority of the reports.

The base currency is by default the first currency you create, but you can change it at any time.

:::warning

It's recommended to set the base currency at the beginning of your financial tracking journey, and not to change it later. Changing the base currency later will **not** lead to inconsistencies in your data, but you might need to manually refresh your historical currency rates, as it is tracked for each currency only against the base currency by default.

:::

From a generic perspective, you can read more about <a href={globalData.featureURLs.currencies} target="_blank">currencies here</a>, as part of the <a href={globalData.featureURLs.main} target="_blank">Features section</a> of YAFFA website.

## View and manage currencies

**Currencies** can be accessed from the **Assets** menu in the left sidebar. The **Currencies** page displays a list of all your currencies. This page can be used to add new currencies, edit existing ones, or delete currencies that are no longer needed. You can also set the base currency from this page.

![Screenshot of the Currencies list page](/img/currencies-list.png)

:::tip

A currency cannot be deleted if it has accounts or investments associated with it. If you absolutely need to delete a currency, you must first delete all accounts and investments associated with it.

:::

## Add a new currency

To add a new currency, click the **New currency** button in the Actions toolbar. This will open a new page with the form to create a new currency.

![Screenshot of the 'Add currency' form](/img/currencies-add.png)

The following fields are available when creating a new currency:
* **Name** - The name of the currency. This field is required and must be unique among your currencies. You'll use this name to identify the currency in various features.
* **ISO Code** - The ISO code of the currency. This field is required and must be unique among your currencies. It should match the official ISO code of the currency, e.g. `USD` for US Dollar, `EUR` for Euro, `GBP` for British Pound Sterling. This is used to identify the currency during the automatic update of currency rates, if you use this feature, and the currency is supported by the data provider.
* **Automatic update** - Whether the currency rates should be automatically updated against the base currency.

:::info
All other properties, like the **Symbol**, **Decimal places**, **Symbol position**, **Thousands separator**, and **Decimal separator** are based on the locale setting of YAFFA, based on the ISO code of the currency.
:::