function createCopyButton(context, func) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "Скопировать";
  button.onclick = func;
  button.style.cursor = "pointer";
  button.style.height = "28px";
  button.style.margin = "auto 0 0 10px";

  context.appendChild(button);
}

const extractAllLinks = async () => {
  window.items = [];

  const videoAnchors = Array.from(
    document.querySelectorAll("#thumbnail-anchor")
  );

  const links = videoAnchors.map((anchor) => {
    const fileName = anchor.getAttribute("aria-label");
    const videoId = anchor.getAttribute("href").split("/")[2];
    const url = `https://youtu.be/${videoId}`;

    return {
      fileName,
      url,
    };
  });

  window.items = links;
  draft.links = links;

  await navigator.clipboard.writeText(JSON.stringify(draft));
  console.log(
    `${window.items.length} видео скопировано в буфер обмена. Вставьте конфигурацию ctrl+A ctr+V в config.json`
  );
};

const titleContainer = document.getElementById("page-title-container");
window.items = [];
createCopyButton(titleContainer, extractAllLinks);
