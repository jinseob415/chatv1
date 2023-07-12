
let val = false;
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("서버에 연결 성공 ✅");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement('li');
    li.innerHTML = "<b>" + message.data + "</b>";
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("서버와 연결이 끊어졌습니다. ❌");
});

function handleSubmit(event) {
    event.preventDefault();
    if(nickForm.querySelector("input").value != "" && val === true) {
        const input = messageForm.querySelector("input");
        socket.send(makeMessage("new_message", input.value));
        const li = document.createElement('li');
    }
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.style.display = "none";
    nickForm.querySelector("button").style.display = "none";
    val = true;
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);