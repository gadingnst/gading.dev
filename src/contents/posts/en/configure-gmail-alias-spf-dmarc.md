---
title: "Configure Gmail Alias with SPF and DMARC"
slug: {
  en: "configure-gmail-alias-spf-dmarc",
  id: "gmail-alias-domain-sendiri-spf-dmarc"
}
date: 2025-05-11
description: "A complete guide to sending emails from a custom domain alias in Gmail using proper SPF and DMARC setup."
keywords: "gmail alias, smtp gmail, spf, dmarc, email forwarding, dns records, send mail as, app password, email authentication"
tags: ["email", "infrastructure", "security"]
image: "/media/blog/gmail-alias-setup/alias-flow.png"
---

Using a **Gmail alias with a custom domain** (e.g., `xxx@gading.dev`) allows you to send professional-looking emails through Gmail while maintaining your brand identity. However, without proper **SPF** and **DMARC** configuration, your emails might get **rejected** or flagged as **spoofed** by recipient servers such as Gmail or Outlook.

This guide walks you through how to set up a Gmail alias, generate an App Password, configure DNS records for **SPF** and **DMARC**, and test everything to ensure reliable email delivery.

![Alias email flow diagram](/media/blog/gmail-alias-setup/alias-flow.png)

---

## 1. Prerequisites

| Requirement                      | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| A Gmail Account                  | A personal Google account (not Google Workspace).                           |
| A custom domain & DNS access     | e.g., `gading.dev`, with access to manage its DNS settings.                 |
| Email forwarding set up          | e.g., `xxx@gading.dev → youraccount@gmail.com`, and verified working.       |
| 2-Step Verification enabled      | Required to generate a Gmail App Password.                                 |

---

## 2. Gmail Configuration

### 2.1 Generate an App Password

1. Visit [Google App Passwords](https://myaccount.google.com/apppasswords).
2. Select _Mail_ → _Other (Custom name)_ → name it (e.g., “Gmail Alias SMTP”) → click **Generate**.
3. Copy the **16-digit App Password** that appears. You’ll use it shortly.

![App Password UI](/media/blog/gmail-alias-setup/app-password.png)

### 2.2 Add Your Alias in Gmail

1. Open Gmail → ⚙ → **See all settings** → **Accounts and Import** tab.
2. Under **Send mail as**, click **Add another email address**.
3. Enter the following:
   - **Name**: The sender name you want to display.
   - **Email address**: `xxx@gading.dev`
   - Check **Treat as an alias**, then click **Next Step**.

4. On the SMTP configuration screen, enter:

   | Field           | Value                                      |
   |-----------------|---------------------------------------------|
   | SMTP Server     | `smtp.gmail.com`                            |
   | Port            | `587` (TLS)                                 |
   | Username        | Your primary Gmail address (`youraccount@gmail.com`) |
   | Password        | The 16-digit App Password you just created |
   | Connection      | TLS (recommended)                           |

5. Click **Add Account**. Gmail will send a verification code to your alias. Since forwarding is enabled, the code will arrive in your Gmail inbox. Enter the code to complete verification.

---

## 3. Add SPF and DMARC DNS Records

To allow Gmail to send emails on behalf of your domain, and to pass authentication checks (especially DMARC), you need to set up SPF and DMARC records in your domain’s DNS settings. This can be done via your domain registrar or DNS provider (e.g., Cloudflare, Namecheap, GoDaddy, etc).

### 3.1 Add SPF Record

1. Go to your domain’s DNS management page.
2. Add a new **TXT record**:
   - **Host/Name**: `@`
   - **Value**:
     ```txt
     v=spf1 include:_spf.google.com ~all
     ```

3. Save the record.

> ⚠️ **Note:** Only one SPF record is allowed per domain. If one already exists, merge the values instead of creating a new one.

### 3.2 Add DMARC Record

1. Add another **TXT record**:
   - **Host/Name**: `_dmarc`
   - **Value**:
     ```txt
     v=DMARC1; p=none; rua=mailto:postmaster@gading.dev; aspf=r; adkim=r
     ```

2. Save the record.

> `p=none` instructs mail servers to only monitor failed authentication, without rejecting messages. Once you verify proper setup, you may change it to `quarantine` or `reject`.

![Example DNS record UI](/media/blog/gmail-alias-setup/dns-records.png)

---

## 4. Testing & Verification

1. Wait 15–30 minutes for DNS propagation.
2. In Gmail, compose a new message and select `xxx@gading.dev` as the **From** address.
3. Send the message to a different email provider (e.g., another Gmail or Outlook account).
4. Open the received email, click **More → Show original**, and verify:

   - **SPF**: `PASS`
   - **DKIM**: `PASS` (signed by gmail.com)
   - **DMARC**: `PASS` or aligned with `p=none`

5. Use tools like [MXToolbox](https://mxtoolbox.com), [Google Admin Toolbox](https://toolbox.googleapps.com/apps/checkmx/), or [Mail-tester.com](https://www.mail-tester.com) for deeper validation and header analysis.

![Selecting an alias mailing](/media/blog/gmail-alias-setup/selecting-alias.png)

---

## 5. Optional Hardening & Monitoring

| Option                                 | Benefit                                                                   |
|----------------------------------------|---------------------------------------------------------------------------|
| Set DMARC to `quarantine` or `reject`  | Prevent spoofed emails from passing validation.                          |
| Use a third-party SMTP provider        | e.g., SendGrid, Brevo – ensures full DKIM alignment with your domain.    |
| Use Google Postmaster Tools            | Monitor domain reputation and DMARC reports over time.                   |

---

## Conclusion

By correctly adding a Gmail alias, generating an App Password, and setting SPF and DMARC records in your domain’s DNS, you can send emails as `xxx@gading.dev` directly from Gmail—securely and reliably. Always monitor your email deliverability and update your policies accordingly.

![Success email result](/media/blog/gmail-alias-setup/success.png)

Happy emailing!
