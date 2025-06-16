# Eunpyeong Club Website

This repository contains a very small static web site for the Eunpyeong club. It includes
an index page for visitors and a simple admin interface for adding photos or videos of
club activities.

## Features

- **Gallery**: Uploaded images or videos are saved in the browser's `localStorage` and
  shown on the main page.
- **Club Application Form**: Submissions are sent to a Google Sheet using a Google Apps
  Script web app.
- **Admin Page**: Accessible via `admin.html` for uploading media and activity text.

## Google Sheets Integration

To make the application form work, deploy a Google Apps Script that writes form data
into a spreadsheet and replace `YOUR_GOOGLE_APPS_SCRIPT_URL` in `script.js` with the
web app URL.

## Local Development

Open `index.html` in your browser to view the site. Use `admin.html` to add items to the
local gallery.
