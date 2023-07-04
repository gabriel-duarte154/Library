const btnSubmit = document.querySelector('#submit');
const btnAddBook = document.querySelector('#addBook');
const formModal = document.querySelector('#form-modal');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

class Book {
  constructor(title, author, pages, isRead, key) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.key = key;
  }
}

let library = [new Book('On the Brevity of Life', 'Seneca', 360, true, 0)];

function makeNewCards() {
  library.forEach((book) => makeCard(book));
}

function openFormModal() {
  formModal.style.display = 'flex';
}

function closeFormModal() {
  formModal.style.display = 'none';
}

function cleanInputs() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

function addBook() {
  let book = new Book(
    title.value,
    author.value,
    Number(pages.value),
    read.checked,
    getKey()
  );

  library.push(book);
  makeCard(library[library.length - 1]);
  closeFormModal();
  cleanInputs();
}

function getKey() {
  return library.length + 1;
}

function makeCard(book) {
  let cardContainer = document.createElement('div');
  let titleCotainer = document.createElement('div');
  let authorContainer = document.createElement('div');
  let pagesContainer = document.createElement('div');

  addClass(cardContainer, titleCotainer, authorContainer, pagesContainer);
  setValues(book, titleCotainer, authorContainer, pagesContainer);
  appendCardAtributtes(
    cardContainer,
    titleCotainer,
    authorContainer,
    pagesContainer
  );
  setButtons(book, cardContainer);
  appendCard(cardContainer);
  setDataKey(book, cardContainer);
}

function addClass(card, title, author, pages) {
  card.classList = 'card-container';
  title.classList = 'book-title';
  author.classList = 'book-author';
  pages.classList = 'book-pages';
}

function setValues(book, title, author, pages) {
  title.innerText = `${book.title}`;
  author.innerText = `${book.author}`;
  pages.innerText = `${book.pages} pages`;
}

function appendCardAtributtes(card, title, author, pages) {
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
}

function setButtons(book, card) {
  let btnRemove = document.createElement('button');
  let btnRead = document.createElement('button');

  btnRemove.classList = 'remove';
  btnRemove.innerText = 'Remove';

  toogleReadBtn(book, btnRead);
  addfunctions(btnRead, btnRemove);
  card.appendChild(btnRead);
  card.appendChild(btnRemove);
}

function toogleReadBtn(book, btn) {
  btn.classList = book.isRead ? 'read' : 'not-read';
  btn.innerText = book.isRead ? 'Read' : 'Not Read';
}

function addfunctions(btnRead, btnRemove) {
  btnRemove.addEventListener('click', removeCard);
  btnRead.addEventListener('click', updadeBookReadStatus);
}

function removeCard(e) {
  let card = e.target.parentElement;
  removeBookFromLibrary(card.dataset.key);
  card.remove();
}

function removeBookFromLibrary(key) {
  let index = findIndexOnLibrary(key);
  library.splice(library[index], 1);
}

function findIndexOnLibrary(key) {
  return library.findIndex((book) => book.key === Number(key));
}

function updadeBookReadStatus(e) {
  let index = findIndexOnLibrary(e.target.parentElement.dataset.key);
  library[index].isRead = library[index].isRead ? false : true;

  toogleReadBtn(library[index], e.target);
}

function appendCard(card) {
  let Cards = document.querySelector('.cards');
  Cards.appendChild(card);
}

function setDataKey({ key }, card) {
  card.dataset.key = key;
}

function isValidInputs() {
  const inputs = [title, author, pages];
  const isInvalid = inputs.find((input) => input.validity.valid === false);
  return isInvalid ? false : true;
}

function formValidation() {
  const inputs = [title, author, pages];
  inputs.forEach((input) => {
    showMenssage(input);
  });
}

function showMenssage(input) {
  const error = document.querySelector(`#${input.id} + .error`);

  if (!input.validity.valid) {
    error.className = 'error active';
    error.textContent = getErrorMensage(input);
  } else {
    error.className = 'error';
    error.textContent = '';
  }
}

function getErrorMensage(input) {
  if (input.validity.badInput) {
    return `You need to provide a number`;
  }
  if (input.validity.valueMissing) {
    return `The ${input.id} field need to be filled`;
  }
  if (input.validity.rangeUnderflow) {
    return `The books pages need to be at least 1`;
  }
}

title.addEventListener('input', () => {
  showMenssage(title);
});
author.addEventListener('input', () => {
  showMenssage(author);
});
pages.addEventListener('input', () => {
  showMenssage(pages);
});

btnAddBook.addEventListener('click', openFormModal);
formModal.addEventListener('click', (e) => {
  if (e.target != formModal) return;
  closeFormModal();
});
btnSubmit.addEventListener('click', () => {
  formValidation();
  if (isValidInputs()) {
    addBook();
  }
});
makeNewCards();
