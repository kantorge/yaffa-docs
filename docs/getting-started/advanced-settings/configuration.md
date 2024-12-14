---
sidebar_position: 1
---

# Advanced configuration

Some features and behaviors of YAFFA can be configured to your needs. This section describes the advanced settings and how to configure them.

## Configuration

The settings of YAFFA are stored in a `.env` file. This file is not part of the repository and is created during the installation process. You can find a sample file in the root of the YAFFA folder, named `.env.example`. This file contains all the settings that YAFFA uses, but with default values.

### User limit

You can decide if you want to limit the number of users that can register in your YAFFA instance. This is a smaller extra security measure to prevent unauthorized useage of your environment, if it is accessible from the internet or for any other users locally.

```env
# The maximum number of users that can be registered in the system.
# For a personal instance, you can set this to 1 to prevent other people from registering.
# Increase this value if you want to allow other users to register, or set it to empty to allow unlimited registrations.
REGISTERED_USER_LIMIT=1
```

### User verification

By default, users need to verify their email address before they can log in to YAFFA. If you want to disable this feature, you can set the following value to `false`.

:::warning

Make sure to configure [outgoing emails](send-emails.md) if you enable this feature, as new users won't be able to log in otherwise.

:::

```env
# Do new users have to verify their email address before they can log in?
# For a local, personal instance, without access to outgoing emails, this should be set to false.
# For a public instance, this should probably be set to true.
EMAIL_VERIFICATION_REQUIRED=FALSE
```

### Application URL

YAFFA needs to know the URL under which it is accessible. This is important for generating links in emails and other parts of the application. Make sure to set this value to the correct URL.

```env
# The URL of the application, used for generating links in emails
APP_URL=http://localhost
```

### Administrator email

If you configured [outgoing emails](send-emails.md), you can set the email address of the administrator. This email address will receive notifications about users logging in to your YAFFA instance.

```env
# The email address of the administrator of the system, who will receive notifications about new users, logins, etc.
# Leave this empty if you don't want to receive any notifications
ADMIN_EMAIL=
```
