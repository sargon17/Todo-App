let btn = document.querySelector(".tras");
let text = document.querySelector(".input");
let memoList = document.querySelector("ul");
let cancBtn = document.querySelector(".cancelBtn");
let todo = document.querySelector("li");
let memos = ["hello", "world", "this is a test"];
let cancLitleBtn = document.querySelector("li button");

toStorage();
function toStorage() {
  let memosArr = JSON.stringify(memos);
  localStorage.setItem("memos", memosArr);
}

function fromStorage() {
  let takeMemos = localStorage.getItem("memos");
  let parsedMemos = JSON.parse(takeMemos);
  return parsedMemos;
}

function addMemo() {
  if (text.value != "") {
    memos.push(text.value);
    text.value = "";
  }
  toStorage();
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function loadMemos() {
  memos = fromStorage();
  let i = memos.length;
  if (memoList.childElementCount === 0) {
    for (x = 0; x < i; x++) {
      let newMemo = document.createElement("li");
      newMemo.setAttribute("onmouseenter", "showRemoveButton(" + x + ")");
      newMemo.setAttribute("onmouseleave", "hideRemoveButton(" + x + ")");
      newMemo.setAttribute("onclick", "completeToDo(" + x + ")");
      newMemo.setAttribute("style", "display: flex;");
      newMemo.innerHTML = `<p id="p${x}" class="didntMade">${memos[x]}</p><button id="btn${x}" class="cancBtn" style="opacity: 0%" onclick="removeMe(${x})"><img src="/Nuova cartella/Frame 1.png" height="20px"></button>`;
      memoList.appendChild(newMemo);
    }
  } else if (memoList.childElementCount < i) {
    var dif = Math.floor(i - memoList.childElementCount);
    // if()
    let newMemo = document.createElement("li");
    newMemo.setAttribute(
      "onmouseenter",
      "showRemoveButton(" + memoList.childElementCount + ")"
    );
    newMemo.setAttribute(
      "onmouseleave",
      "hideRemoveButton(" + memoList.childElementCount + ")"
    );
    newMemo.setAttribute(
      "onclick",
      "completeToDo(" + memoList.childElementCount + ")"
    );
    newMemo.setAttribute("style", "display: flex;");
    newMemo.innerHTML = `<p id="p${
      memoList.childElementCount
    } class="didntMade"">${
      memos[Math.floor(memoList.childElementCount)]
    }</p><button id="btn${
      memoList.childElementCount
    }" class="cancBtn" style="opacity: 0%" onclick="removeMe(${
      memoList.childElementCount
    })"><img src="/Nuova cartella/Frame 1.png" height="20px"></button>`;
    memoList.appendChild(newMemo);
    console.log(memos[Math.floor(memoList.childElementCount)]);
  }
}

function removeMe(num) {
  // fromStorage();
  console.log(num);
  // fromStorage().slice(num);
  memos.splice(num, 1);
  console.log(memos);
  toStorage();
  // memoList.removeChild(num);
  window.location.reload();
}
function showRemoveButton(num) {
  var cancLitleBtn = document.querySelector("#btn" + num);
  cancLitleBtn.setAttribute("style", "opacity: 100%");
}
function hideRemoveButton(num) {
  var cancLitleBtn = document.querySelector("#btn" + num);
  cancLitleBtn.setAttribute("style", "opacity: 0%");
}

function completeToDo(num) {
  var p = document.querySelector("#p" + num);
  if (p.classList.contains("didntMade") == true) {
    p.classList.replace("didntMade", "made");
  }
}

text.addEventListener(
  "keydown",
  function (event) {
    console.log(event.key);
    if (event.key == "Enter") {
      loadMemos();
      addMemo();
    }
  },
  false
);

btn.addEventListener("click", addMemo, false);
btn.addEventListener("click", loadMemos, false);
var memosLenght = memos.length;
loadMemos();

cancBtn.addEventListener(
  "click",
  function () {
    var zeroMemo = [];
    var zeroMemosArr = JSON.stringify(zeroMemo);
    localStorage.setItem("memos", zeroMemosArr);
    removeAllChildNodes(memoList);
    loadMemos();
  },
  false
);

// todo.addEventListener("click", function() => {

// })
