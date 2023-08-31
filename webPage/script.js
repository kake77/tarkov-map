const socket = new WebSocket("ws://" + window.location.host);
let myId = null;

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "userId":
      myId = data.content;
      break;
    case "write":
      draw(data.startPosition, data.endPosition);
      break;
    default:
      console.log("unknownType:" + data.type);
      break;
  }
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let startPosition = null;

ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

function touchstart(e) {
  startPosition = { x: e.touches[0].pageX, y: e.touches[0].pageY };
}

function touchend() {
  startPosition = null;
}

function touchmove(e) {
  if (1 < e.touches.length) {
    return;
  }
  e.preventDefault();
  if (startPosition === null) {
    return;
  }
  console.log(startPosition);
  socket.send(
    JSON.stringify({
      type: "write",
      id: myId,
      startPosition,
      endPosition: { x: e.touches[0].pageX, y: e.touches[0].pageY },
    })
  );
  startPosition = { x: e.touches[0].pageX, y: e.touches[0].pageY };
}

function draw(startPosition, endPosition) {
  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y);
  ctx.lineTo(endPosition.x, endPosition.y);
  ctx.stroke();
}

canvas.addEventListener("touchstart", touchstart);
canvas.addEventListener("touchend", touchend);
canvas.addEventListener("touchmove", touchmove);

const menu = document.getElementById("menu");
const floatingButton = document.getElementById("floating");
floatingButton.addEventListener("touchstart", (_) => {
  menu.style.display = "block";
});

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("touchstart", (_) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  menu.style.display = "none";
});

const maps = [
  "customs",
  "woods",
  "shoreline",
  "interchange",
  "reserve",
  "lighthouse",
  "sot",
  "factory",
  "lab",
];
maps.forEach((map) => {
  document
    .getElementById(map)
    .addEventListener("touchstart", (_) => switchMap(map));
});

function switchMap(map) {
  const path = "./img/" + map + ".webp";
  document.getElementById("mapImage").src = path;
  menu.style.display = "none";
}
