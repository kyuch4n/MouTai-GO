var dDate = new Date();
dDate.setHours(19, 59, 59.2);
console.log("今日抢购时间：", dDate);

function checkElementState(path, callback) {
  var ele = document.querySelector(path);
  if (ele) {
    callback && callback();
  } else {
    console.log("异步加载元素中...." + path);
    setTimeout(function () {
      checkElementState(path, callback);
    }, 200);
  }
}

function checkOut() {
  console.log("结算 !!!!");
  checkElementState("#J_Go", function () {
    var btn = document.getElementById("J_Go");
    btn.click();
  });
}

function submitOrder() {
  console.log("下单 !!!!");
  checkElementState(".go-btn", function () {
    var btn = document.querySelector(".go-btn");
    btn.click();
  });
}

function login() {
  checkElementState(".fm-submit", function () {
    document.querySelector("#fm-login-id").value = "";
    document.querySelector("#fm-login-password").value = "";

    setTimeout(function () {
      document.querySelector(".fm-submit").click();
    }, 500);
  });
}

function enterTimeCheckLoop(callback) {
  var date = new Date();
  var diff = Date.parse(dDate) - Date.parse(date);
  console.log(diff);

  if (diff < -900) {
    return;
  }

  if (diff < 500) {
    callback && callback();
    return;
  }

  if (diff < 600000) {
    if (!localStorage.getItem("login")) {
      localStorage.setItem("login", true);
      window.location.reload();
    }
  }

  checkElementState("#J_SelectAllCbx1", function () {
    const checked = document.querySelector("#J_SelectAllCbx1").checked;
    !checked && document.querySelector("#J_SelectAllCbx1").click();

    setTimeout(function () {
      enterTimeCheckLoop(callback);
    }, 400);
  });
}

function main() {
  var href = window.location.href;

  if (href.indexOf("cart.tmall.com") > -1) {
    enterTimeCheckLoop(checkOut);
  }

  if (href.indexOf("login.tmall.com") > -1) {
    setTimeout(login, 10 * 1000);
  }

  if (href.indexOf("buy.tmall.com") > -1) {
    submitOrder();
  }
}

main();

/****** 监听 popupjs ***********************************************************/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.event === "go") {
    localStorage.removeItem("login");
    sendResponse("GO !!!!!!!!!!!");
    location.reload();
  }
});
/******************************************************************************/