# Google Sheets Contact Form Setup

Google Sheet:
https://docs.google.com/spreadsheets/d/1rdFRXk4gQCoKYc9hGRi47uCb_L6QyhcTm5s9jjrMo1g/edit

1. Open https://script.google.com/
2. Create a new Apps Script project.
3. Paste the code from `google-apps-script.js`.
4. Click Deploy > New deployment.
5. Select type: Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Deploy, authorize, and copy the Web app URL.
9. In `script.js`, replace:

```js
const GOOGLE_SHEETS_ENDPOINT = '';
```

with:

```js
const GOOGLE_SHEETS_ENDPOINT = 'YOUR_WEB_APP_URL';
```

After that, contact form submissions will append rows to the Sheet.

When you edit `google-apps-script.js` later, update the live deployment:

1. Open the Apps Script project.
2. Click Deploy > Manage deployments.
3. Click the pencil icon.
4. Choose Version > New version.
5. Click Deploy.

Open the Web app URL in your browser to verify it. It should return JSON with `ok: true`, the spreadsheet ID, sheet name, and current `lastRow`.
