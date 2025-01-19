---
title: Process Receipts with AI to Automate Your Finances
sidebar_label: Process receipts with AI
sidebar_position: 6
description: Learn how to set up YAFFA personal finance application to process receipts with AI and automate your financial tasks.
---

# Process Receipts with AI

YAFFA can process receipts received via email automatically. This feature can speed up the process of entering transactions into the system. The AI engine will extract the relevant information from the receipt and create a draft transaction for you, which you can review and record.

:::warning

This is one of the most advanced features of YAFFA and requires some setup.
* You need to bring your own OpenAI API key, and set up billing for your OpenAI account.
* YAFFA tries to clean up received emails from styling and other unnecessary information before communicating with the OpenAI API, but the content of the email is still sent to them.
* Experiment with this feature and keep an eye on your OpenAI usage to avoid unexpected costs.
* YAFFA uses the Laravel Mailbox package to receive emails. You need to have an account with one of the supported email providers described [here](https://beyondco.de/docs/laravel-mailbox/drivers/drivers).
* It also assumes that you have full control over the domain of the email address you want to use for this feature. This is necessary to set up the required DNS records for the email provider.

:::

This guide below is an example of how to set this up with SendGrid. You can use any other supported email provider, but the setup might differ slightly.

1. Register an account with SendGrid. You can use the free tier for testing.
2. Set up an MX record for your domain to point to SendGrid. This is necessary for receiving emails. The detailed steps are described [here](https://www.twilio.com/docs/sendgrid/for-developers/parsing-email/setting-up-the-inbound-parse-webhook#set-up-an-mx-record).
3. Head over to SendGrid at https://app.sendgrid.com/settings/parse and add a new record matching your domain.
  * The receiving domain should be your domain, e.g., `your-yaffa-domain.com`
  * The destination URL should be `https://laravel-mailbox:yourpassword@your-yaffa-domain.com/mailbox/sendgrid`
    * The URL should be accessible from the internet, so make sure your YAFFA server is reachable from the internet.
    * The password is a secret you can choose, and you will need to set it in the `.env` file of YAFFA.
  * Make sure to check the "POST the raw, full MIME message" option.
4. In your YAFFA `.env` file, set the following settings:
```env
MAILBOX_DRIVER=sendgrid
MAILBOX_HTTP_PASSWORD=yourpassword
# The email address where incoming receipts are sent, and which is monitored by the Mailbox service
# YAFFA will process emails sent to THIS address from YOUR EMAIL ADDRESS registered in YAFFA
INCOMING_RECEIPTS_EMAIL=
```
5. Register an account with OpenAI, set up billing, and get an API key. At the moment, the GPT engine is hardcoded in YAFFA.
6. Set the OpenAI API key in the `.env` file:
```env
OPENAI_API_KEY=yourapikey
```
7. Reload the configuration of your deployment using the appropriate Artisan command.
```bash
php artisan config:cache
```

You can now send an email with a receipt to the email address you have set up in the `.env` file. YAFFA will process the email and create a draft transaction for you to review. The email should be sent from the email address you have registered in YAFFA. In response, you will receive an email with the draft transaction and a link to review and record it in YAFFA.