import globalData from '@site/src/globalData';
import Link from '@docusaurus/Link';

# Accounts

**Accounts** are one of the fundamental building blocks of YAFFA, which will be used in various features, especially during recording financial transactions. An account represents a financial entity, such as a bank account, credit card, or cash.

import StandardTransactionForm from '/img/transaction-form-standard-withdrawal-full-empty.png';

<img src={StandardTransactionForm} alt="Screenshot of the standard transaction form with a withdrawal transaction" className="zoomable img-50" />

<br /><br />
:::info

From a generic perspective, you can read more about <a href={globalData.featureURLs.accounts} target="_blank">accounts here</a>, as part of the <a href={globalData.featureURLs.main} target="_blank">Features section</a> of YAFFA website.

:::

## View and manage accounts

**Accounts** can be accessed from the **Assets** menu in the left sidebar. The **Accounts** page displays a list of all your accounts. This page can be used to add new accounts, edit existing ones, or delete accounts that are no longer needed.

![Screenshot of the Accounts list page](/img/accounts-list.png)

:::tip

An account cannot be deleted if it has any transactions associated with it. If you absolutely need to delete an account, you must first delete all transactions associated with it.

It's more common, that you don't need to have visibility to an abandoned account, like a closed bank account, so you can simply mark it as inactive. To do this, either edit the account and uncheck the **Active** checkbox, or click the icon of the given account in the **Active column** in the list of account.

:::

## Add a new account

To add a new account, click the **New account** button in the Actions toolbar. This will open a new page with the form to create a new account.

![Screenshot of the 'Add account' form](/img/accounts-add.png)

The following fields are available when creating a new account:
* **Name** - The name of the account. This field is required and must be unique. You'll use this name to identify the account in various features.
* **Active** - Whether the account is active or not. If you uncheck this checkbox, the account will be marked as inactive and will not be visible in the list of accounts, e.g. when you record transactions. This is useful for accounts that you no longer use, but you don't want to delete them.
* **Opening balance** - The initial balance of the account, which will be used to calculate the account balance at any later time. This field is required, and should be set based on the balance of the account at the time you start using YAFFA.
* **Account group** - The account group to which the account belongs. This field is required, and you can select an existing account group. It's useful for grouping accounts together for easier management and reporting.
    * See the <Link to="../account-groups">Account groups</Link> feature for more information.
* **Currency** - The currency of the account. This field is required, and you can select from the list of available currencies. It's used to display any amounts related to the account in the correct currency, and also to determine when a currency conversion happens.
* **Import alias** - This is an optional field that can be used to provide alternative names for the account. It is used by the AI receipt processing to help identify the account to which a transaction belongs with more flexibility.

:::tip

One of the ways to use the import alias can be to record the **last** 4 digits of the associated card number for a credit or debit card account. This way, the AI receipt processing can identify the account based on the card number, given that the entire card number should not be visible on receipts.

:::