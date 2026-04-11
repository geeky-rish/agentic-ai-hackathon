# Registration Confirmation Email — Guide

## Placeholders to Replace

Before sending each email, find and replace these placeholders in the HTML:

| Placeholder | Replace With | Example |
|---|---|---|
| `{{TEAM_LEAD_NAME}}` | Team lead's full name | Rishi Kulkarni |
| `{{TEAM_NAME}}` | Team name from the form | Team Alpha |
| `{{MEMBER_LIST}}` | All members (comma or `<br/>` separated) | Rishi, Aman, Priya |
| `{{THEME_1}}` | 1st priority theme | Healthcare and Well Being |
| `{{THEME_2}}` | 2nd priority theme | Recruitment and Hiring |
| `{{THEME_3}}` | 3rd priority theme | Coding and Debugging Agents |
| `{{ACCOMMODATION}}` | YES or NO | YES |

---

## How to Send via Gmail (Recommended)

### Option 1: Gmail — Paste HTML directly

1. Open `confirmation-email.html` in your **browser** (double-click the file)
2. **Select all** content on the page (`Ctrl+A`)
3. **Copy** it (`Ctrl+C`)
4. Open **Gmail** → Click **Compose**
5. **Paste** into the email body (`Ctrl+V`) — Gmail preserves HTML formatting
6. Add the recipient's email in the **To** field
7. Set **Subject** to: `✅ Registration Confirmed — Agentic AI Hackathon 2026`
8. Hit **Send**

> **Important:** Replace the `{{placeholders}}` BEFORE copying from the browser. Open the `.html` file in a text editor (VS Code), do find-and-replace, save, then open in browser.

### Option 2: Gmail — Using developer console (advanced)

1. Open Gmail → Compose
2. Right-click the email body → **Inspect Element**
3. Find the `<div contenteditable="true">` element
4. Replace its `innerHTML` with your HTML template content
5. Fill in subject + recipient and send

### Option 3: Using a mail merge tool (for bulk sending)

If you have many teams, use **Google Sheets + Gmail mail merge**:

1. Create a Google Sheet with columns: `Email`, `TeamLeadName`, `TeamName`, `Members`, `Theme1`, `Theme2`, `Theme3`, `Accommodation`
2. Fill in one row per team from your Google Form responses
3. Install **[Mail Merge with Attachments](https://workspace.google.com/marketplace/app/mail_merge_with_attachments/223404411203)** add-on
4. Use the HTML template as the email body
5. Map `{{placeholders}}` to sheet columns
6. Send all at once

---

## Email Subject Line

```
✅ Registration Confirmed — Agentic AI Hackathon 2026
```

---

## Workflow Summary

```
Google Form Response
       ↓
Open Google Sheet → Copy team details
       ↓
Open confirmation-email.html in text editor
       ↓
Find & Replace all {{placeholders}}
       ↓
Save → Open in browser → Ctrl+A → Ctrl+C
       ↓
Gmail → Compose → Paste → Send
```
