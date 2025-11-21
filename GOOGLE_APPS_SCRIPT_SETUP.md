# Google Apps Script Setup Guide

## Quick Setup (5 Minutes)

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Growdit Registrations"
4. **Don't add headers manually** - the script will do it automatically on first submission

### Step 2: Add Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy the entire code from `/google-apps-script/Code.gs`
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) or press `Ctrl+S`
6. Name your project "Growdit Registration Handler"

### Step 3: Deploy as Web App

1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description:** "Growdit Registration Form Handler"
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. You may see a warning "Google hasn't verified this app"
   - Click **Advanced**
   - Click **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### Step 4: Configure Environment Variable

1. Open `.env.local` in your project
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL:
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycby.../exec
   ```
3. Save the file

### Step 5: Test It

1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Open your landing page
3. Fill out the registration form
4. Submit it
5. Check your Google Sheet - you should see the new entry!

---

## Features Included

✅ **Automatic Header Creation** - Headers are added automatically on first submission  
✅ **Duplicate Detection** - Prevents duplicate emails and names  
✅ **Data Validation** - Server-side validation of all fields  
✅ **Timestamp** - Automatically adds submission timestamp  
✅ **IP Address Tracking** - Records submitter's IP (optional)  
✅ **Email Notifications** - Ready to enable (commented out in code)  
✅ **Beautiful Formatting** - Header row is styled automatically  

---

## Optional: Enable Email Notifications

To send confirmation emails to users:

1. Open the Apps Script editor
2. Find this section in the code (around line 90):
   ```javascript
   // Optional: Send confirmation email
   // Uncomment the following lines to enable email notifications
   /*
   MailApp.sendEmail({
   ```
3. Remove the `/*` and `*/` to uncomment
4. Save and redeploy

To send admin notifications:

1. Find the admin notification section (around line 110)
2. Replace `'admin@yourdomain.com'` with your email
3. Uncomment the code
4. Save and redeploy

---

## Troubleshooting

### Issue: "Script function not found: doPost"
**Solution:** Make sure you saved the script and deployed it as a Web App, not as an API executable.

### Issue: Form submits but no data in sheet
**Solution:** 
1. Check the Apps Script execution logs: View → Executions
2. Make sure "Execute as" is set to "Me" in deployment settings
3. Verify you authorized the script to access your Google Sheet

### Issue: "This app isn't verified"
**Solution:** 
1. Click "Advanced"
2. Click "Go to [Project Name] (unsafe)"
3. Click "Allow"
This is normal for personal scripts.

### Issue: Duplicate detection not working
**Solution:** The script checks columns A (name) and C (email). Make sure the data is being written to these columns correctly.

### Issue: CORS errors in browser console
**Solution:** This is expected with `no-cors` mode. The script will still work. If you need to read responses, you can modify the Apps Script to handle CORS properly.

---

## Testing the Script

You can test the script directly in Apps Script:

1. In the Apps Script editor, find the `testSubmission()` function
2. Click **Run** → Select `testSubmission`
3. Authorize the script if prompted
4. Check your Google Sheet for the test data
5. Check View → Logs to see the response

---

## Updating the Deployment

If you make changes to the script:

1. Save your changes in Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the edit icon (pencil) next to your active deployment
4. Select **New version**
5. Click **Deploy**

**Note:** The URL stays the same, so you don't need to update `.env.local`

---

## Data Privacy & Security

- The script runs under your Google account
- Data is stored in your Google Sheet
- Only you have access to the data
- The Web App URL is public but doesn't expose the sheet
- Users can submit data but cannot view the sheet
- Enable email notifications to send confirmations

---

## Sheet Columns

The script automatically creates these columns:

| Column | Name | Description |
|--------|------|-------------|
| A | Full Name | User's full name |
| B | Firm Name | Company/organization name |
| C | Email | User's email address |
| D | WhatsApp | Phone number with country code |
| E | Website/LinkedIn | URL provided by user |
| F | Consent | "Yes" if user agreed to terms |
| G | Timestamp | Date and time of submission |
| H | IP Address | User's IP (if available) |

---

## Need Help?

- [Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Reference](https://developers.google.com/sheets/api)
- [MailApp Documentation](https://developers.google.com/apps-script/reference/mail/mail-app) (for email features)

---

## Advantages Over Backend API

✅ **No backend server needed** - Everything runs on Google's infrastructure  
✅ **No API keys to manage** - Uses your Google account  
✅ **Free** - No hosting costs  
✅ **Automatic scaling** - Google handles all the traffic  
✅ **Built-in database** - Google Sheets is your database  
✅ **Easy to view data** - Just open your Google Sheet  
✅ **Easy to export** - Download as Excel, CSV, etc.  
✅ **5-minute setup** - Much faster than traditional backend  

Enjoy your simple, powerful registration system! 🚀
