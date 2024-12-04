import globalData from '@site/src/globalData';

# Account groups

**Account groups** serve as an organizational tool for your accounts. They allow you to group accounts together for easier management and reporting. One example of this grouping is the Account Balance report on the Dashboard, which rolls up account balances by account group.

import DashboardAccountBalanceReport from '/img/dashboard-account-balance-report.png';

<img src={DashboardAccountBalanceReport} alt="Screenshot of the Account Summary report on the Dashboard" className="zoomable img-25" />

<br /><br />
:::info

From a generic perspective, you can read more about <a href={globalData.featureURLs.accountGroups} target="_blank">account groups here</a>, as part of the <a href={globalData.featureURLs.main} target="_blank">Features section</a> of YAFFA website.

:::

## View and manage account groups

Similary to other assets, **account groups** can be accessed from the **Assets** menu in the left sidebar. The **Account Groups** page displays a list of all account groups you have already created. This page can be used to add new account groups, edit existing ones, or delete account groups that are no longer needed.

:::note

*Any account groups that are already associated with one or more accounts cannot be deleted. To delete an account group, you must first reassign or remove the accounts associated with it.*

:::

![Screenshot of the Account Groups list page](/img/accountgroups-list.png)

If you visit the **Account Groups** page for the first time, you can optionally start an inline guided tour of the main features and elements of this page.

## Add a new account group

To add a new account group, click the **New account group** button in the Actions toolbar. This will open a new page with the form to create a new account group.

![Screenshot of the 'Add account group' form](/img/accountgroups-add.png)

At the moment, the only available field is the **Name** field, which is required. Enter a name for the new account group and click the **Save** button to create it. No other properties are required and used by this feature.

:::note

*The name of the account group must be unique.*

:::