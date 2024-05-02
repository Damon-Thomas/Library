const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
}

function addBookToLibrary(Book) {
    myLibrary.push(Book)
}

const dialog = document.querySelector("dialog")
const addBookButton = document.getElementById("showDialog")
addBookButton.addEventListener("click", createNewBook);
const submitNewBook = document.getElementById("book-submit")
const cardContainer = document.getElementById("card-container")
submitNewBook.addEventListener("click", function(event){
    event.preventDefault()
})

function createCard(Book) {
    let card = document.createElement('div');
    card.classList.add('card');
    let cardTitle = document.createElement('h2');
    cardTitle.textContent = Book.title;
    cardTitle.classList.add('card-title');
    let cardAuthor = document.createElement('p');
    cardAuthor.textContent = Book.author;
    cardAuthor.classList.add('card-author');
    let cardpages = document.createElement('p');
    cardpages.textContent = Book.pages;
    cardpages.classList.add('card-pages');
    let cardBookRead = document.createElement('p');
    cardBookRead.textContent = Book.read;
    cardBookRead.classList.add('card-read');

    card.appendChild(cardTitle)
    card.appendChild(cardAuthor)
    card.appendChild(cardpages)
    card.appendChild(cardBookRead)
    return card

}



function createNewBook() {
    dialog.showModal();
}








TheHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'not read yet');
oryxAndCrake = new Book('Oryx & Crake', 'Margaret Atwood', 325, 'read');
thePragmaticProgrammer = new Book('The Pragmatic Programmer', 'David Thomas and Andrew Hunt', 321, 'not read yet')
addBookToLibrary(TheHobbit)
addBookToLibrary(oryxAndCrake)
addBookToLibrary(thePragmaticProgrammer)

myLibrary.forEach(element => {
    let x = createCard(element)
    cardContainer.appendChild(x)
});