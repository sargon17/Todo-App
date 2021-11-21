var btn = document.querySelector(".tras");
var text = document.querySelector(".input");
var memoList = document.querySelector("ul");
var cancBtn = document.querySelector(".cancelBtn");
var todo = document.querySelector("li");
var memos = [];
var cancLitleBtn = document.querySelector("li button");


var countMemos = function(x){
    let i = 0;
    x.forEach(item => i++);
    // i--;
    return i;
};

function toStorage(){
    var memosArr = JSON.stringify(memos);
    localStorage.setItem("memos", memosArr);
}

function fromStorage(){
    var takeMemos = localStorage.getItem("memos");
    var parsedMemos = JSON.parse(takeMemos);
    memos = parsedMemos;
    return memos;
}

function addMemo(){
    if(text.value != ""){
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
function loadMemos(){
    fromStorage();
    let i = countMemos(memos);
    if(memoList.childElementCount === 0){
        for(x = 0; x < i; x++){
            let newMemo = document.createElement("li");
            newMemo.setAttribute("onmouseenter","showRemoveButton("+x+")");
            newMemo.setAttribute("onmouseleave","hideRemoveButton("+x+")");
            newMemo.setAttribute("onclick","completeToDo("+x+")");
            newMemo.setAttribute("style","display: flex;");
            newMemo.innerHTML = `<p id="p${x}" class="didntMade">${memos[x]}</p><button id="btn${x}" class="cancBtn" style="opacity: 0%" onclick="removeMe(${x})"><img src="/Nuova cartella/Frame 1.png" height="20px"></button>`;
            memoList.appendChild(newMemo);
        }
    } else if (memoList.childElementCount < i){
        var dif = Math.floor(i - memoList.childElementCount);
        // if()
        let newMemo = document.createElement("li");
        newMemo.setAttribute("onmouseenter","showRemoveButton("+memoList.childElementCount+")");
        newMemo.setAttribute("onmouseleave","hideRemoveButton("+memoList.childElementCount+")");
        newMemo.setAttribute("onclick","completeToDo("+memoList.childElementCount+")");
        newMemo.setAttribute("style","display: flex;");
            newMemo.innerHTML = `<p id="p${memoList.childElementCount} class="didntMade"">${memos[Math.floor(memoList.childElementCount)]}</p><button id="btn${memoList.childElementCount}" class="cancBtn" style="opacity: 0%" onclick="removeMe(${memoList.childElementCount})"><img src="/Nuova cartella/Frame 1.png" height="20px"></button>`;
            memoList.appendChild(newMemo);
            console.log(memos[Math.floor(memoList.childElementCount)]);
    } 
}

function removeMe(num){
    // fromStorage();
    console.log(num);
    // fromStorage().slice(num);
    memos.splice(num,1);
    console.log(memos);
    toStorage();
    // memoList.removeChild(num);
    window.location.reload();
}
function showRemoveButton(num){
    var cancLitleBtn = document.querySelector("#btn"+num);
    cancLitleBtn.setAttribute("style","opacity: 100%");
}
function hideRemoveButton(num){
    var cancLitleBtn = document.querySelector("#btn"+num);
    cancLitleBtn.setAttribute("style","opacity: 0%");
}

function completeToDo(num){
    var p = document.querySelector("#p"+num);
    if(p.classList.contains("didntMade") == true){
        p.classList.replace("didntMade", "made");
    }
}

text.addEventListener("keydown", function(event){
   if (event.keyCode == 13){
      addMemo();
      loadMemos();
    };},false);

btn.addEventListener("click", addMemo,false);
btn.addEventListener("click", loadMemos,false);
var memosLenght = memos.length;
loadMemos();

cancBtn.addEventListener("click", function(){
    var zeroMemo = [];
    var zeroMemosArr = JSON.stringify(zeroMemo);
    localStorage.setItem("memos",zeroMemosArr);
    removeAllChildNodes(memoList);
    loadMemos();
}, false
);

// todo.addEventListener("click", function() => {

// })