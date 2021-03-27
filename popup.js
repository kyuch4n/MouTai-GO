document.querySelector("button").onclick = function () {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      let message = {
        event: "go",
      };
      chrome.tabs.sendMessage(tabs[0].id, message, function (res) {
        console.log(res);
      });
    }
  );
};
