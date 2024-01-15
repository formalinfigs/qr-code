const copyLink = async (title) => {
  title.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  const hoverItems = document.querySelectorAll("#hover-items");
  hoverItems[hoverItems.length - 1].click();

  const actions = document.querySelector("[aria-label=Действия]");
  actions.click();

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  );
  const share = document.querySelector('[test-id="share"]');
  share.click();
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  );
};

const extractLink = async (title) => {
  window.focus();

  if (document.activeElement) {
    document.activeElement.blur();
  }

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  );

  const url = await navigator.clipboard.readText();
  const fileName = title.innerText;

  return {
    fileName,
    url,
  };
};

function createButton(context, func) {
  var button = document.createElement("input");
  button.type = "button";
  button.value = "Скопировать ссылки на видео";
  button.onclick = func;
  context.appendChild(button);
}

const titleContainer = document.getElementById("page-title-container");
window.items = [];

const extractAllLinks = async () => {
  window.items = [];

  const titles = Array.from(document.querySelectorAll("#video-title"));

  for (const title of titles) {
    await copyLink(title);
    const link = await extractLink(title);

    items.push(link);
  }

  const draft = {
    format: "png",
    margin: 1,
    color: {
      dark: "#000000ff",
      light: "#ffffffff",
    },
    outputDir: "",
    links: [],
  };

  draft.links = [...window.items];

  await navigator.clipboard.writeText(JSON.stringify(draft));
  console.log(
    `${window.items.length} видео скопировано в буфер обмена. Вставьте конфигурацию ctrl+A ctr+V в config.json`
  );
};

createButton(titleContainer, extractAllLinks);
