---
sidebar_position: 5
---

# Send Emails

YAFFA optionally sends emails to users for various reasons. The following emails can be sent:
* email verification during registration,
* password reset,
* confirm processing of a [receipt received via email](process-receipts-with-ai.md),
* notify the admin about user activity.

As all the above features are optional, it's up to you if you want to enable them, and if as a consequence, you want to send emails.

## Configuration

To enable email sending, you need to configure the email settings in the `.env` file. The following settings are available, and need to be set according to your email provider.

Generally, you can read about the email settings in the Laravel documentation [here](https://laravel.com/docs/10.x/mail#configuration).

```env
# Select the mailer to use. Most likely you want to use SMTP
MAIL_MAILER=smtp

# Host and port of the mail server, as defined by your email provider
MAIL_HOST=mail.myprovider.com
MAIL_PORT=465

# Username and password to authenticate with the mail server
MAIL_USERNAME=myemailaddress@myprovider.com
MAIL_PASSWORD=MySuperSecretPassword

# Encryption method to use
MAIL_ENCRYPTION=ssl

# Email address and name to use as the sender, which will be enabled to use by the mail server configured above
MAIL_FROM_ADDRESS=myemailaddress@myprovider.com
MAIL_FROM_NAME=YAFFA
```

When the changes are made, you need to reload the configuration of your deployment using the appropriate Artisan command.

```bash
php artisan config:cache
```