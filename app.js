const btnSubmit = document.querySelector('#submit');
const btnAddBook = document.querySelector('#addBook');
const formModal = document.querySelector('#form-modal');

let mylibrary = [];

class Book {
	constructor(title, author, pages, isRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
	}
}

function addBook() {
	let book = getInputValues();

	if (book === false) {
		alert('You must fill in all inputs to submitting.');
		return;
	}

	mylibrary.push(book);

	closeFormModal();
}

function getInputValues() {
	let title = document.querySelector('#title').value;
	let author = document.querySelector('#author').value;
	let pages = document.querySelector('#pages').value;
	let isRead = document.querySelector('#read').checked;

	if (title === '' || author === '' || pages === '') {
		return false;
	}

	return new Book(title, author, pages, isRead);
}

const openFormModal = () => {
	formModal.style.display = 'flex';
};

const closeFormModal = () => {
	formModal.style.display = 'none';
};

btnAddBook.addEventListener('click', openFormModal);
formModal.addEventListener('click', (e) => {
	if (e.target != formModal) return;
	closeFormModal();
});

btnSubmit.addEventListener('click', addBook);
