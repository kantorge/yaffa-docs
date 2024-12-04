import globalData from '@site/src/globalData';

# Payees

**Payees** are entities that you pay money to (groceries, stores, restaurants, service providers) or receive money from (your employer in most cases). Payees are used during recording a withdrawal or deposit transaction to specify the recipient or sender of the money involved in the transaction.

The granularity of payees can be different based on your preferences. You can have as few as one payee for all your expenses, or you can have a separate payee for each business you interact with. It all depends on how detailed you want to be in your financial tracking, but the "Default category" property is one of the most common ways to simplify and speed up the transaction recording process. So you probably want to achieve a balance between adding too many payees and having too few, generic ones.

:::tip

It's a good idea to start with a few payees and add more as you record transactions. This way, you can see which payees you interact with most often and which ones you can group together. Besides, you should always have an 'Other' or 'Miscellaneous' payee to capture transactions that you don't expect to visit regularly, or that are not relevant for you.

:::

From a generic perspective, you can read more about <a href={globalData.featureURLs.payees} target="_blank">payees here</a>, as part of the <a href={globalData.featureURLs.main} target="_blank">Features section</a> of YAFFA website.


## View and manage payees

**Payees** can be accessed from the **Assets** menu in the left sidebar. The **Payees** page displays a list of all your payees. This page can be used to add new payees, edit existing ones, or delete payees that are no longer needed.

![Screenshot of the Payees list page](/img/payees-list.png)

:::tip

A payee cannot be deleted if it has any transactions associated with it. If you absolutely need to delete a payee, you must first delete all transactions associated with it.

It's more common, that you don't need to have visibility to an abandoned payee, like a store that you no longer visit, so you can simply mark it as inactive. To do this, either edit the payee and uncheck the **Active** checkbox, or click the icon of the given payee in the **Active column** in the list of payees.

:::

## Add a new payee

To add a new payee, click the **New payee** button in the Actions toolbar. This will open a new page with the form to create a new payee.

![Screenshot of the 'Add payee' form](/img/payees-add.png)

The following fields are available when creating a new payee:
* **Name** - The name of the payee. This field is required and must be unique among you payees. You'll use this name to identify the payee in various features.
* **Active** - Whether the payee is active or not. If you uncheck this checkbox, the payee will be marked as inactive and will not be visible in the list of payees, e.g. when you record transactions. This is useful for payees that you no longer interact with, but you don't want to delete them.
* **Default category** - The default category of income or spending to assign to transactions with this payee for the entire amount, or the remaining amount you don't distribute manually among other categories. This field is optional, and you can select an existing category from the dropdown. It's useful for speeding up the transaction recording process.
    * See the Categories feature for more information on categories.
    * See the [Further notes on the Default category property](#further-notes-on-the-default-category-property) section for more information on how the default category works.
* **Import alias** - This is an optional field that can be used to provide alternative names for the payee. It is used by the AI receipt processing to help identify the payee to which a transaction belongs with more flexibility.
* **Preferred categories** - This feature is not yet available, but it will allow you to specify a list of preferred categories for transactions with this payee. This will be useful for speeding up the transaction recording process even more.
* **Excluded categories** - You can select one or more categories that you don't want to assign to transactions with this payee. This will be useful for speeding up the transaction recording process.
    * Let's say, you have *Heating* and *Health care* categories amongst many others, and you don't want to assign the *Health care* category to transactions with the *Doctor* payee. You can select the *Heating* category in the **Excluded categories** field for the *Doctor* payee, and the *Heating* category will not be available for selection when recording transactions with the *Doctor* payee, to make your selection more focused.

## Further notes on the Default category property
* If you are not sure about the default category for a payee, you can leave this field empty, and make a selection later.
* YAFFA will look for patterns in your transactions and suggest a default category for your frequently used payees based on the transactions and categories you have already recorded.
* If you need to change the default category for a payee, you can do so by editing the payee and selecting a different category from the dropdown. This change will not affect the transactions you have already recorded with this payee.

:::tip

As simple as it is, the **Default category** property can save you a lot of time when recording transactions, in two main ways:
1. You often have only one type of spending with a given payee, but with different amounts. In this case, you can set the default category once, and you don't have to select it every time you record a transaction. E.g. you buy fuel only with the *Gas station* payee.
2. You often have multiple types of spending with a given payee, but you want to assign the remaining amount to a specific category. In this case, you can set the default category to the category you want to assign the remaining amount to, and you don't have to select it every time you record a transaction. E.g. you buy groceries with the *Supermarket* payee. You capture the spending for *Snacks* and *Drinks* categories manually, but you want to assign the remaining amount to the *Groceries* category.

:::