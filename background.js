const DEFAULT_TARGET_URL = "https://inftab.com/";
const DEFAULT_OPEN_MODE = "new-tab";

function getSettings() {
  return chrome.storage.sync
    .get({
      targetUrl: DEFAULT_TARGET_URL,
      openMode: DEFAULT_OPEN_MODE
    })
    .then((result) => ({
      targetUrl: result.targetUrl.trim(),
      openMode: result.openMode === "current-tab" ? "current-tab" : DEFAULT_OPEN_MODE
    }));
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["targetUrl", "openMode"]).then((result) => {
    const nextSettings = {};

    if (!(typeof result.targetUrl === "string" && result.targetUrl.trim())) {
      nextSettings.targetUrl = DEFAULT_TARGET_URL;
    }

    if (result.openMode !== "current-tab" && result.openMode !== "new-tab") {
      nextSettings.openMode = DEFAULT_OPEN_MODE;
    }

    if (Object.keys(nextSettings).length > 0) {
      chrome.storage.sync.set(nextSettings);
    }
  });
});

chrome.action.onClicked.addListener((tab) => {
  getSettings().then(({ targetUrl, openMode }) => {
    if (!targetUrl) {
      chrome.runtime.openOptionsPage();
      return;
    }

    if (openMode === "current-tab" && tab.id) {
      chrome.tabs.update(tab.id, { url: targetUrl });
      return;
    }

    chrome.tabs.create({
      url: targetUrl,
      index: typeof tab.index === "number" ? tab.index + 1 : undefined
    });
  });
});
