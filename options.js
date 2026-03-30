const DEFAULT_TARGET_URL = "https://inftab.com/";
const DEFAULT_OPEN_MODE = "new-tab";

const form = document.getElementById("settings-form");
const input = document.getElementById("target-url");
const resetButton = document.getElementById("reset-button");
const status = document.getElementById("status");
const openModeInputs = document.querySelectorAll('input[name="open-mode"]');

function setStatus(message, type = "") {
  status.textContent = message;
  status.className = "status";

  if (type) {
    status.classList.add(`status-${type}`);
  }
}

function normalizeUrl(value) {
  try {
    const url = new URL(value.trim());
    return url.toString();
  } catch (error) {
    return "";
  }
}

async function loadSettings() {
  const result = await chrome.storage.sync.get({
    targetUrl: DEFAULT_TARGET_URL,
    openMode: DEFAULT_OPEN_MODE
  });

  input.value = result.targetUrl;
  const openMode = result.openMode === "current-tab" ? "current-tab" : DEFAULT_OPEN_MODE;

  for (const radio of openModeInputs) {
    radio.checked = radio.value === openMode;
  }
}

function getSelectedOpenMode() {
  for (const radio of openModeInputs) {
    if (radio.checked) {
      return radio.value;
    }
  }

  return DEFAULT_OPEN_MODE;
}

async function saveSettings(rawValue) {
  const normalizedUrl = normalizeUrl(rawValue);

  if (!normalizedUrl) {
    setStatus("请输入合法的完整 URL，例如 https://example.com/ 。", "error");
    return false;
  }

  const openMode = getSelectedOpenMode() === "current-tab" ? "current-tab" : DEFAULT_OPEN_MODE;

  await chrome.storage.sync.set({
    targetUrl: normalizedUrl,
    openMode
  });

  input.value = normalizedUrl;
  setStatus("已保存。之后点击扩展图标会按这个方式打开地址。", "success");
  return true;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveSettings(input.value);
});

resetButton.addEventListener("click", async () => {
  await chrome.storage.sync.set({
    targetUrl: DEFAULT_TARGET_URL,
    openMode: DEFAULT_OPEN_MODE
  });

  input.value = DEFAULT_TARGET_URL;
  for (const radio of openModeInputs) {
    radio.checked = radio.value === DEFAULT_OPEN_MODE;
  }
  setStatus("已恢复默认地址。", "success");
});

loadSettings().catch(() => {
  setStatus("设置加载失败，请刷新页面后重试。", "error");
});
