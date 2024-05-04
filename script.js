// Make 3 arrays
const myLibrary = [];
const queue = [];
const favorites = [];

// JS variable designations and event listeners
const dialog = document.querySelector("dialog");
const addBookButton = document.getElementById("showDialog");
addBookButton.addEventListener("click", createNewBook);
const submitNewBook = document.getElementById("book-submit");
const cardContainer = document.getElementById("card-container");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-length");
const bookRead = document.querySelector("#book-read")
const form = document.getElementById("form");
const close = document.querySelector("#exit-button");

// close Modal
close.addEventListener("click", function(event) {
    event.preventDefault();
    dialog.close();
    form.reset();
})

// Submit and Make new Book
submitNewBook.addEventListener("click", function(event){
    event.preventDefault();
    addBookToLibrary(new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked));
    loadLibrary();
    form.reset();
    dialog.close();
})

// Pre Populated Library
TheHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'not read yet');
oryxAndCrake = new Book('Oryx & Crake', 'Margaret Atwood', 325, 'read');
thePragmaticProgrammer = new Book('The Pragmatic Programmer', 'David Thomas and Andrew Hunt', 321, 'not read yet')
addBookToLibrary(TheHobbit)
addBookToLibrary(oryxAndCrake)
addBookToLibrary(thePragmaticProgrammer)
loadLibrary()

// Put cards on screen
function loadLibrary() {
    cardContainer.replaceChildren()
    myLibrary.forEach(element => {
        let x = createCard(element)
        cardContainer.appendChild(x)
        })
    console.log(myLibrary)
    };

// Create card content from Book
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
    let Removebutton = document.createElement('button');
    Removebutton.textContent = "Remove";
    Removebutton.classList.add('card-remove');
    Removebutton.id = Book.title
    card.appendChild(cardTitle)
    card.appendChild(cardAuthor)
    card.appendChild(cardpages)
    card.appendChild(cardBookRead)
    card.appendChild(Removebutton)
    return card
}

// Make Book Object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }}

// Add books to correct Array
function addBookToLibrary(Book) {
    myLibrary.push(Book)};
function addBookToQueue(Book) {
    queue.push(Book)};
function addBookTofavorites(Book) {
    favorites.push(Book)};

// open Modal
function createNewBook() {
    dialog.showModal();
}

// Remove from library
function removeBook(Title) {
    console.log(Title)
    let index = myLibrary.findIndex(x => x.title === Title)
    console.log(index) 
    myLibrary.splice(index,1)
    loadLibrary()
}

// Remove button functionality
document.addEventListener("click", function(e){
    const target = e.target.closest(".card-remove"); 
  
    if(target != null){
        removeBook(target.id)
    }});
