let globalList = [
  // { id: 1, data: "Wheat", addedAt: "...", status: "pending" },
  // { id: 2, data: "apple", addedAt: "...", status: "pending" },
  // { id: 3, data: "apricot", addedAt: "...", status: "pending" },
  // { id: 4, data: "banana", addedAt: "...", status: "pending" },
];
let listView = "all"; // 'all' | 'pending'

// pure
const addToList = (data, list) => {
  const obj = {
    id: Math.random() * 10000,
    data: data,
    addedAt: new Date(),
    status: "pending",
  };
  // const newList = [].concat(list, [obj])
  const newList = list.concat(obj);
  return newList;
};

const toggleItem = (list, id) => {
  const match = list.find((item) => item.id === id);
  const newObj = {
    ...match,
    status: match.status === "pending" ? "done" : "pending",
  };
  const index = list.findIndex((item) => item.id === id);
  const updatedList = list.map((item, i) => {
    if (i === index) {
      return newObj;
    } else {
      return item;
    }
  });
  return updatedList;
};

const filterPending = (list) =>
  list.filter((item) => item.status === "pending");

const sortByDate = (list) => {
  const copy = list.map((l) => l);
  copy.sort((a, b) => (a.addedAt > b.addedAt ? -1 : 1));
  return copy;
};

// impure

const _sortByDateAsc = () => {
  _updateListContainer(sortByDate(globalList));
};

const _toggleView = () => {
  const newListView = listView === "all" ? "pending" : "all";
  _updateListContainer(
    newListView === "all" ? globalList : filterPending(globalList)
  );
  _updateListView(newListView);
};

const _updateListView = (a) => {
  listView = a;
};

const _toggleItem = (id) => {
  const updatedList = toggleItem(globalList, id);
  _updateGlobalList(updatedList);
  _updateListContainer(globalList);
};

const _updateListContainer = (list) => {
  const listToHtml = list.map((item) => {
    return `<div class="unit flex items-center justify-between mb-2">
        <div>
          <input type="checkbox" ${
            item.status === "pending" ? "" : "checked"
          } class="mr-2" onclick="_toggleItem(${
      item.id
    })" /> <span class=${
      item.status === "pending" ? "" : "line-through"
    }>
          ${item.data}</span>
        </div>
        <div class="cursor-pointer text-red-400">Del</div>
      </div>`;
  });
  const listAsStringHTML = listToHtml.join(" ");
  document.getElementById(
    "list-container"
  ).innerHTML = listAsStringHTML;
};

const _updateGlobalList = (list) => {
  globalList = list;
};

const _addItem = () => {
  const data = document.getElementById("current-item").value;
  const newList = addToList(data, globalList);
  _updateGlobalList(newList);
  _updateListContainer(globalList);
};

// app load
const main = () => {
  _updateListContainer(globalList);
};

main();
