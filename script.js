const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterfield = document.getElementById("filter");
const formbtn = itemForm.querySelector("button");
let iseditmode = false;

function displayitems() {
  const itemsfromstorage = getitemsfromstorage();
  itemsfromstorage.forEach((item) => additemtodom(item));
  checkUI();
}

function onAdditemsubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // validat input
  if (newItem === "") {
    alert("pls add an item");
    return;
  }

  if (iseditmode) {
    const itemtoedit = itemList.querySelector(".edit-mode");

    removeitemfromstorage(itemtoedit.textContent);
    itemtoedit.classList.remove("edit-mode");
    itemtoedit.remove();
    iseditmode = false;
  } else {
    if (checkifitemexists(newItem)) {
      alert("that exists");
      return;
    }
  }

  additemtodom(newItem);

  additemtostorage(newItem);

  checkUI();

  itemInput.value = "";
}

function additemtodom(item) {
  //   const items = itemList.querySelectorAll("li");

  //   create li with words in it
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  //   create button
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  //   add li to DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function additemtostorage(item) {
  const itemsfromstorage = getitemsfromstorage();

  itemsfromstorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsfromstorage));
}

function getitemsfromstorage() {
  let itemsfromstorage;
  if (localStorage.getItem("items") === null) {
    itemsfromstorage = [];
  } else {
    itemsfromstorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsfromstorage;
}

function onclickitem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setitemtoedit(e.target);
  }
}

function checkifitemexists(item) {
  const itemsFromStorage = getitemsfromstorage();
  return itemsFromStorage.includes(item);
}

function setitemtoedit(item) {
  iseditmode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formbtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update item';
  formbtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("are you sure?")) {
    item.remove();

    removeitemfromstorage(item.textContent);

    checkUI();
  }
}

function removeitemfromstorage(item) {
  let itemsfromstorage = getitemsfromstorage();

  itemsfromstorage = itemsfromstorage.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(itemsfromstorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem("items");

  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  itemInput.value = "";
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filterfield.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filterfield.style.display = "block";
  }
  formbtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formbtn.style.backgroundColor = "#333";
  iseditmode = false;
}

// Event Listeners
itemForm.addEventListener("submit", onAdditemsubmit);
itemList.addEventListener("click", onclickitem);
clearBtn.addEventListener("click", clearItems);
filterfield.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayitems);

checkUI();
