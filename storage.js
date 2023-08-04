const storage = localStorage;

function saveData(data) {
  storage.setItem('library', JSON.stringify(data));
}

function getData() {
  return JSON.parse(storage.getItem('library'));
}

export { saveData, getData };
