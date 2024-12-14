import globalData from '@site/src/globalData';

# Categories

**Categories** and a well-designed category structure is the essence and baseline of personal finance for several goals: record expenses, plan and track budgets, plan and forecast your financial situation.

YAFFA supports categorization of expenses and incomes up to two levels, allowing you to flexibly build and use a categorization system that suits your needs the most. While not mandatory, but it's recommended to utilize both levels of categories, as it ensures the ability to drill down to the fine-grained information you need, and at the same time have an overview of your spending without getting lost in the details.

It might seem daunting to come up with the perfect categorization system, but you have the freedom to tweak and continuously adapt the categories you use to your needs.

:::tip
Want some insipiration? Check out some <a href={globalData.featureURLs.categorySamples} target="_blank">samples and ideas</a> about various levels of categorization supported by YAFFA.
:::

From a generic perspective, you can read more about <a href={globalData.featureURLs.categories} target="_blank">categories here</a>, as part of the <a href={globalData.featureURLs.main} target="_blank">Features section</a> of YAFFA website.

## View and manage categories

**Categories** can be accessed from the **Assets** menu in the left sidebar. The **Categories** page displays a list of all your categories. This page can be used to add new categories, edit existing ones, or delete categories that are no longer needed.

![Screenshot of the Categories list page](/img/categories-list.png)

:::tip

A category cannot be deleted if it has any transactions associated with it. IF you absolutely need to delete a category, you must first delete all transactions associeated with it.

It's more common, that you don't need to have visibility to discontinued category, like diapers, so you can simply mark it as inactive. To do this, either edit the category and uncheck the **Active** checkbox, or click the icon of the given category in the **Active column** in the list of cagegories.

:::

## Add a new category

To add a new category, click the **New category** button in the Actions toolbar. This will open a new page with the form to create a new category.

![Screenshot of the 'Add category' form](/img/categories-add.png)

The following fields are available when creating a new category:
* **Name** - The name of the category. This field is required and must be unique among your categories. More specifically, it needs to be unique among all parent categories, and among the children of one parent category. You'll use this name to identify the category in various features.
* **Active** - Whether the category is active or not. If you uncheck this checkbox, the category will be marked as inactive and will not be visible in the list of categories, e.g. when you record transactions. This is useful for categories that you no longer use, but you don't want to delete them.
* **Parent category** - The parent category of the category you are creating. This field is required, and you can select an existing parent category. If you don't select a parent category, the new category will be a top-level category.

:::tip

For inspiration, find some [sample categorization systems](https://www.yaffa.cc/features-of-yaffa-personal-finance-application/categories/sample-categorization-systems/) that you can use as a starting point for your own categories.

:::