---
sidebar_position: 2
---

import globalData from '@site/src/globalData';

# Registration

Even that YAFFA is a self-hosted application, it still requires you to register an account to use it. The main purpose of this is to bind your data to a specific user, which needs to be authenticated to access the application. This also allows you to have multiple users access their own data, and have their own settings of the application.

:::note

At the moment, only one user can access the same data, and there is no support for sharing data between users.

:::

Another reason for the registration is to customize your experience with the application. You can define the range of some predefined assets that will be created for you. This can save you some time and also give you some inspiration on how to organize your data. You can make changes to these assets at any time, or create new ones. Optionally, you can completely skip this step and start with a nearly empty database.

## Register a new account

After you install YAFFA and open the application in your web browser, you will be presented with the login page, where you can choose to register a new account, and you'll be presented with the registration form.

![Screenshot of the registration form](/img/register.png)

The following fields need to be filled in when registering yourself:
* **Email** - Your email address, which will be used to log in to the application. This field is required and must be unique among all users.
    * By default, you need to verify your email address before you can log in to the application. This is done by clicking the link in the email that will be sent to you after you submit the registration form.
    * If you are not able to send emails from your system, or you don't want this verification step on your system, you can disable this feature in the `.env` file during the [installation](/resources/category/installation/).
* **Name** - Your name, which will be used to identify you in the application. This field is required, but it is used only for display purposes.
* **Password** and **Password confirmation** - Your password, which will be used to log in to the application. This field is required and must be at least 8 characters long.
* Please accept the **<a href={globalData.genericURLs.toc} target="_blank">Terms of Service</a>** by checking the checkboxes.

In the expandable section below the form, you can optionally make the follwing customizations:
* **Language** - The language in which the application will be displayed. It can be changed at any time in the user settings.
    * The main language of the application is English. Feel free to <a href={globalData.genericURLs.contact} target="_blank">request</a> additional languages to be added or <a href={globalData.genericURLs.github} target="_blank">contribute</a> to the translation.
* **Locale** - The locale in which the application will be displayed, controlling the displayed format of dates, numbers, and currencies. It can be changed at any time in the user settings.
* **Starting assets** - The predefined assets that will be created for you. See the Default assets [TODO] section for more information on the available options. Whichever option you choose, you can make changes to these assets at any time, or create new ones.
* **Base currency** - The currency which you'll likely use the most, and which will be used in the majority of the reports.
    * Read more about [Currencies](../../assets/currencies) for more information on currencies and how they are used in the application.
    * Don't worry, if you don't see your preferred currency in the list. You can add it later in the Currencies feature, and set it as the base currency at any time. Sorry for the inconvenience. Feel free to <a href={globalData.genericURLs.contact} target="_blank">request</a> additional currencies to be added to this list or <a href={globalData.genericURLs.github} target="_blank">contribute</a> to do it yourself.