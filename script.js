// Make 3 arrays
const myLibrary = [];
const queue = [];
const favorites = [];

// JS variable designations and event listeners
const dialog = document.querySelector("dialog");
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", createNewBook);
const submitNewBook = document.getElementById("book-submit");
const cardContainer = document.getElementById("card-container");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-length");
const bookRead = document.querySelector("#book-read")
const form = document.getElementById("form");
const close = document.querySelector("#exit-button");
const emptyCard = document.createElement("div")
const sidebarQueue = document.querySelector(".queue")
const sidebarFavorites = document.querySelector(".favorites")

emptyCard.id = "emptyCard"

// close Modal
close.addEventListener("click", function(event) {
    event.preventDefault();
    dialog.close();
    form.reset();
})

// Submit and Make new Book
submitNewBook.addEventListener("click", function(event){
    event.preventDefault();
    if (bookTitle.value != "") {
    addBookToLibrary(new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked));
    loadLibrary();
    form.reset();
    dialog.close()};
})

// Pre Populated Library
TheHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
oryxAndCrake = new Book('Oryx & Crake', 'Margaret Atwood', 325, true);
thePragmaticProgrammer = new Book('The Pragmatic Programmer', 'David Thomas and Andrew Hunt', 321, false)
addBookToLibrary(TheHobbit)
addBookToLibrary(oryxAndCrake)
addBookToLibrary(thePragmaticProgrammer)
loadLibrary()

function loadLibrary() {
    loadMain();
    loadSidebar();
}



// Put cards on screen
function loadMain() {
    cardContainer.replaceChildren()
    cardContainer.appendChild(emptyCard)
    myLibrary.forEach(element => {
        let x = createCard(element)
        cardContainer.appendChild(x)
        })
    };

function loadSidebar() {
    sidebarFavorites.replaceChildren()
    sidebarQueue.replaceChildren()
    let queueList = []
    let favList = []

    myLibrary.forEach(element => {
        if (element.favorite === true) {
            favList.push(element)
        }
        if (element.queue === true) {
            queueList.push(element)
        }});
    
    length1 = Math.min(queueList.length, 3)
    length2 = Math.min(favList.length, 3)
    console.log("HERE MATE")
    console.log(length1)
    console.log(length2)
    let count1 = 0
    let count2 = 0
    for (let i = 3-length1; i < 3; i++) {
        console.log("in length1")

        let miniCard = CreateMiniCard(queueList[count1]);
        sidebarQueue.appendChild(miniCard)}
        count1++

    for (let i = 3-length2; i < 3; i++) {
        console.log("in length2")
        
        let miniCard2 = CreateMiniCard(favList[count2]);
        sidebarFavorites.appendChild(miniCard2)
        count2++
    }}
    


function CreateMiniCard(Book) {
    console.log(Book)
    let miniCard = document.createElement('div')
    miniCard.classList.add('miniCard');
    let minicardTitle = document.createElement('h3');
    console.log("Book.title")
    console.log(Book.title)
    minicardTitle.textContent = Book.title;
    minicardTitle.classList.add('mini-card-title');
    let miniCardAuthor = document.createElement('p');
    miniCardAuthor.textContent = Book.author;
    miniCardAuthor.classList.add('mini-card-author');
    Book.favorite === true ? miniCard.classList.add("mini-favorite") : miniCard.classList.remove("mini-favorite");
    Book.queue === true ? miniCard.classList.add("mini-queue") : miniCard.classList.remove("mini-queue");
    miniCard.appendChild(minicardTitle);
    miniCard.appendChild(miniCardAuthor)
    return miniCard
}




// Create card content from Book
function createCard(Book) {
    console.log("Enter Create Card")
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
    let buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('buttonWrapper');
    let cardBookRead = document.createElement('button');
    cardBookRead.textContent = Book.read === true ? "Read" : "Not Read";
    cardBookRead.classList.add('card-read');
    Book.read === true ? card.classList.add("read") : card.classList.add("not-read");
    let Removebutton = document.createElement('button');
    Removebutton.textContent = "Remove";
    Removebutton.classList.add('card-remove');
    Removebutton.id = Book.title
    if(Book.read === true){
        console.log("in book = true")
        let favoriteOrNah = document.createElement("img")
        favoriteOrNah.classList.add("fav")
        if(Book.favorite === true) {
            console.log("in fav true");
            favoriteOrNah.src = "images/full-heart.svg";
            card.classList.add("favorite");
            console.log("out fav true");
            
        }
        else {
            console.log("in fav not true");
            favoriteOrNah.src = "images/heart.svg";
            card.classList.remove("favorite");

            console.log("out fav not true");
        }
        
        card.appendChild(favoriteOrNah)
        
    }
    else{
        Book.favorite = false;
        }

    card.appendChild(cardTitle)
    card.appendChild(cardAuthor)
    card.appendChild(cardpages)
    buttonWrapper.appendChild(cardBookRead)
    buttonWrapper.appendChild(Removebutton)
    card.appendChild(buttonWrapper)
    
    return card
}

// Make Book Object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.favorite = false
    this.queue = false
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }}

// Add books to correct Array
function addBookToLibrary(Book) {
    myLibrary.push(Book)};

// open Modal
function createNewBook() {
    dialog.showModal();
}

// Remove from library
function removeBook(Title) {
    let index = myLibrary.findIndex(x => x.title === Title) 
    myLibrary.splice(index,1)
    
    loadLibrary()
}


// Remove button functionality
document.addEventListener("click", function(e){
    const target = e.target.closest(".card-remove"); 
    if(target != null){
        removeBook(target.id)
    }});

// Read button functionality
document.addEventListener("click", function(e){
    const target = e.target.closest(".card-read"); 
    if(target != null){
        const sister = target.parentNode.childNodes[1];
        readBook(sister.id)
    }});

// Change Read Status
function readBook(Title){
    let index = myLibrary.findIndex(x => x.title === Title)
    let activeBook = myLibrary[index]
    activeBook.read === false ? activeBook.read = true : activeBook.read = false;
    loadLibrary()
}

// Favorite Button Functionality
document.addEventListener("click", function(e){
    console.log("FavButtonstart")
    const target = e.target.closest(".fav"); 
    
  
    if(target != null){
        let currentCard = target.parentNode
        let selector = currentCard.lastChild
        makeFav(selector.childNodes[1].id)
        console.log("makeFavTitle")
        console.log(selector.childNodes[1].id)
    }
    console.log("makeFavButtonend")});


function makeFav(Title) {
    console.log("makeFavstart")
    let index = myLibrary.findIndex(x => x.title === Title)
    console.log("makeFav index")
    console.log(index)
    let activeBook = myLibrary[index]
    activeBook.favorite === false ? activeBook.favorite = true : activeBook.favorite = false;
    console.log(activeBook)
    console.log("creatingcards")
    // activeBook.favorite === true ? addBookTofavorites(activeBook) : removeFav(activeBook)
    
    loadLibrary()
    console.log("makeFavend")
}

// function addBookTofavorites(Book) {
//     console.log("enter addBookTofav")
//     console.log(favorites);
//     console.log(myLibrary)
//     for (var i = 0; i < favorites.length; i++) {
//         if (favorites[i].title === Book.title) {
//             return;                             
//         }
//     }
//     favorites.push(Book);
//     console.log("addBookToFav")
//     console.log(favorites)
//     console.log("leave addBookTofav")}

// Remove from favorites
// function removeFav(Book) {
//     console.log("removeFavstart");
//     for (var i = 0; i < favorites.length; i++) {
//         if (favorites[i].title === Book.title) {
//             console.log("LOOK HERE")
//             console.log(i)
//             console.log(favorites)
//             favorites.splice(i,1)
//             console.log(favorites)
//             loadLibrary()
//             return;                             
//         }
//     }

    
    // loadLibrary()
//     console.log("removeFavend")
// }
    



// 2 lists is muddling everything. Need to refactor without a favorites list just using the object properties