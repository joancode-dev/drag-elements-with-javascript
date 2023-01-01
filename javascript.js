const ITEMS = [];

const RENDERED_ITEMS = [];

const randomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

// Keep track the index of each list item
let dragStartIndex;

function itemdAttributes(data) {
  return `
  <div class='attributes' style='background-color: ${data.bg}'>
      <p>
        ${data.text} <span class='number'>#${data.id}</span>
      </p>
  </div>`;
}

// This function is responsible for creating the list elements.
// 'Insert items into DOM'
function createItem(data) {
  const ITEM = document.createElement("div");
  ITEM.setAttribute("data-index", data.id);
  ITEM.setAttribute("draggable", "true");
  ITEM.setAttribute("class", "item");
  ITEM.innerHTML = itemdAttributes(data);

  addEventListeners(ITEM);

  RENDERED_ITEMS.push(ITEM);

  document.getElementById("items").appendChild(ITEM);
}

function dragStart() {
  dragStartIndex = +this.closest(".item").getAttribute("data-index");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(from, to) {
  // swap rendered ITEM
  const itemOne = RENDERED_ITEMS[from].querySelector(".attributes");
  const itemTwo = RENDERED_ITEMS[to].querySelector(".attributes");

  RENDERED_ITEMS[from].appendChild(itemTwo);
  RENDERED_ITEMS[to].appendChild(itemOne);

  // array ITEM exchange
  const ITEMOne = ITEMS[from];
  const ITEMTwo = ITEMS[to];

  ITEMS[from] = ITEMTwo;
  ITEMS[to] = ITEMOne;
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function addEventListeners(draggable) {
  draggable.addEventListener("dragstart", dragStart);
  draggable.addEventListener("dragover", dragOver);
  draggable.addEventListener("drop", dragDrop);
  draggable.addEventListener("dragenter", dragEnter);
  draggable.addEventListener("dragleave", dragLeave);
}

let id = 0;
function addItem() {
  let obj = {
    id: id++,
    text: "item",
    bg: randomColor(),
  };

  ITEMS.push(obj);

  createItem(obj);
}

function printResult() {
  console.log(ITEMS);
}

window.onbeforeunload = function () {
  if (ITEMS.length) {
    return "Do you want to reload the web page?";
  }
};
