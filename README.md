# Chrome Click To URL Plugin

A minimal Chrome extension that opens a preset URL when you click its toolbar icon.

Features:

- Click the extension icon to open a target URL
- Opens in a **new tab** or the **current tab**, based on your settings
- Change the target URL and open mode directly from the extension's options page — no code changes needed

## Changing the Target URL

**Method 1:**

- Open `chrome://extensions/`
- Find this extension
- Click **Details**
- Click **Extension options**
- Enter a new URL, choose how to open it, and save

**Method 2:**

- Right-click the extension icon in the browser toolbar
- Click **Options**
- Update the URL in the settings page

## Installation

### Option A: Load unpacked (developer mode)

1. Open Chrome or any Chromium-based browser
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked**
5. Select the `chrome-click-to-url-plugin` directory

### Option B: Install from the release package

1. Download `chrome-click-to-url-plugin.zip` from the [Releases](https://github.com/yunzinan/chrome-click-to-url-plugin/releases) page
2. Unzip the file to a local folder
3. Follow steps 1–5 from **Option A** above, selecting the unzipped folder

After installation, clicking the extension icon will open the target URL according to your settings.

The default URL is:

```text
https://inftab.com/
```

If the URL is cleared, clicking the extension icon will automatically open the options page.
