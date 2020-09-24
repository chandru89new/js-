const storage = localStorage.getItem("list") || "[]";

// app state
let items = JSON.parse(storage);
let currItem = "";

// somewhat pure functions
const addItem = (data) => {
  let newItems = items.concat({
    id: Math.floor(Math.random() * 10000),
    item: data,
    status: "pending",
    addedAt: new Date(),
  });
  return newItems;
};

const updateCurrentItem = () => {
  let currItem = document.getElementById("current-item").value;
  return currItem;
};

// functions with side-effects
const saveInStorage = (data) => {
  localStorage.setItem("list", JSON.stringify(data));
  return true;
};

const updateHTML = () => {
  const newHTMLUnits = items.map((item) => {
    return `<div class="unit flex items-center justify-between mt-3">
        <div>
          <input type="checkbox" ${
            item.status === "done" ? "checked" : ""
          } class="mr-2" /> ${item.item}
        </div>
        <div class="cursor-pointer text-red-400">Del</div>
      </div>`;
  });
  const newHTMLUnitsString = newHTMLUnits.join("");
  document.getElementById(
    "list-container"
  ).innerHTML = newHTMLUnitsString;
};

const doAddItem = () => {
  const data = updateCurrentItem();
  const newItems = addItem(data);
  items = newItems;
  saveInStorage(newItems);
  updateHTML();
};

updateHTML();
