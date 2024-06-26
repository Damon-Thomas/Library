// Make library
let myLibrary = [];

const notReadFilter = document.querySelector("#closedbook");
const ReadFilter = document.querySelector("#openbook");
const favFilter = document.querySelector("#heart");
const queFilter = document.querySelector("#next");
const fullLibrary = document.querySelector("#fullLibrary");
const allIcons = document.querySelectorAll(".feather");
const deleteLibrary = document.getElementById("startOver");
const iconDiv = document.querySelector(".filter-buttons");
const backupIcons = document.querySelector(".icons");
const backupIconsTitle = document.querySelector(".filter-title");
const header = document.querySelector(".header");
let masterFilter = 0;

// JS variable designations and event listeners
const dialog = document.querySelector("dialog");
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", createNewBook);
const submitNewBook = document.getElementById("book-submit");
const cardContainer = document.getElementById("card-container");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-length");
const bookRead = document.querySelector("#book-read");
const form = document.getElementById("form");
const close = document.querySelector("#exit-button");
const emptyCard = document.createElement("div");
const sidebarQueue = document.querySelector(".Sidebarqueue");
const sidebarFavorites = document.querySelector(".Sidebarfavorites");
emptyCard.id = "emptyCard";

const bookTitleError = document.querySelector("#book-title + span.error");
const bookAuthorError = document.querySelector("#book-author + span.error");
const bookPagesError = document.querySelector("#book-length + span.error");

bookAuthor.addEventListener("input", (event) => {
  if (bookAuthor.validity.valid) {
    bookAuthorError.textContent = "";
    bookAuthorError.className = "error";
  } else {
    showErrorAuthor();
  }
});

bookPages.addEventListener("input", (event) => {
  console.log("pages", bookPages.validity.valid);
  if (bookPages.validity.valid) {
    bookPagesError.textContent = "";
    bookPagesError.className = "error";
  } else {
    showErrorPages();
  }
});

bookTitle.addEventListener("input", (event) => {
  if (bookTitle.validity.valid) {
    bookTitleError.textContent = "";
    bookTitleError.className = "error";
  } else {
    showErrorTitle();
  }
});

function showErrorPages() {
  if (bookPages.validity.valueMissing) {
    bookPagesError.textContent = "Please enter Book Pages";
  } else if (bookPages.validity.rangeOverflow) {
    bookPagesError.textContent = `Book length should be more than ${bookPages.max} pages; you entered ${bookPages.value}.`;
  } else if (bookPages.validity.rangeUnderflow) {
    bookPagesError.textContent = `Book length should be at least ${bookPages.min} pages; you entered ${bookPages.value}.`;
  }

  // Set the styling appropriately
  bookPagesError.className = "error active";
}

function showErrorTitle() {
  if (bookTitle.validity.valueMissing) {
    bookTitleError.textContent = "Please enter Book Title";
  } else if (bookTitle.validity.tooLong) {
    bookTitleError.textContent = `Book title should be less than ${bookTitle.maxLength} characters; you entered ${bookTitle.value.length}.`;
  } else if (bookTitle.validity.tooShort) {
    bookTitleError.textContent = `Book title should be at least ${bookTitle.minLength} characters; you entered ${bookTitle.value.length}.`;
  }

  // Set the styling appropriately
  bookTitleError.className = "error active";
}

function showErrorAuthor() {
  if (bookAuthor.validity.valueMissing) {
    bookAuthorError.textContent = "Please enter Book Author";
  } else if (bookAuthor.validity.tooLong) {
    bookAuthorError.textContent = `Author should be less than ${bookAuthor.maxLength} characters; you entered ${bookAuthor.value.length}.`;
  } else if (bookAuthor.validity.tooShort) {
    bookAuthorError.textContent = `Author should be at least ${bookAuthor.minLength} characters; you entered ${bookAuthor.value.length}.`;
  }

  // Set the styling appropriately
  bookAuthorError.className = "error active";
}

// close Modal
close.addEventListener("click", function (event) {
  event.preventDefault();
  dialog.close();
  form.reset();
});

// Submit and Make new Book
submitNewBook.addEventListener("click", function (event) {
  event.preventDefault();
  if (!bookAuthor.validity.valid) {
    showErrorAuthor();
  }
  if (!bookTitle.validity.valid) {
    showErrorTitle();
  }
  if (!bookPages.validity.valid) {
    showErrorPages();
  }

  event.preventDefault();
  if (
    bookAuthor.validity.valid &&
    bookTitle.validity.valid &&
    bookPages.validity.valid
  ) {
    addBookToLibrary(
      new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookRead.checked
      )
    );
    filterContent(fullLibrary, 0);
    loadLibrary();
    form.reset();
    dialog.close();
  }
});

function loadLibrary() {
  loadMain();
  loadSidebar();
}

// Put cards on screen
function loadMain() {
  cardContainer.replaceChildren();
  cardContainer.appendChild(emptyCard);
  for (let index = myLibrary.length - 1; index >= 0; index--) {
    const element = myLibrary[index];
    if (masterFilter === 1) {
      if (element.read === true) {
        continue;
      }
    } else if (masterFilter === 2) {
      if (element.read === false) {
        continue;
      }
    } else if (masterFilter === 3) {
      if (element.favorite === false) {
        continue;
      }
    } else if (masterFilter === 4) {
      if (element.queue === false) {
        continue;
      }
    }
    let x = createCard(element);
    cardContainer.appendChild(x);
  }
}

// Make sidebar display
function loadSidebar() {
  sidebarFavorites.replaceChildren();
  sidebarQueue.replaceChildren();

  let queueTitle = document.createElement("h1");
  queueTitle.textContent = "Next to Read";
  queueTitle.classList.add("sidebar-heading");
  sidebarQueue.appendChild(queueTitle);
  let favTitle = document.createElement("h1");
  favTitle.textContent = "Latest Favs";
  favTitle.classList.add("sidebar-heading");
  sidebarFavorites.appendChild(favTitle);

  let queueList = [];
  let favList = [];

  myLibrary.forEach((element) => {
    if (element.favorite === true) {
      favList.push(element);
    }
    if (element.queue === true) {
      queueList.push(element);
    }
  });

  length1 = Math.min(queueList.length, 3);
  length2 = Math.min(favList.length, 3);

  let count1 = 0;
  let count2 = favList.length - 1;

  for (let i = 3 - length1; i < 3; i++) {
    let miniCard = CreateMiniCard(queueList[count1]);
    sidebarQueue.appendChild(miniCard);
    count1++;
  }
  for (let i = 3 - length2; i < 3; i++) {
    let miniCard2 = CreateMiniCard(favList[count2]);
    sidebarFavorites.appendChild(miniCard2);
    count2--;
  }

  let queueInstructions = document.createElement("h2");
  queueInstructions.classList.add("instructions");
  queueInstructions.textContent =
    'Click on the "+" button at the top-right of one of your NOT READ books to add a book to your "Next to Read" Section';

  if (length1 === 0) {
    sidebarQueue.appendChild(queueInstructions);
  }

  let favInstructions = document.createElement("h2");
  favInstructions.classList.add("instructions");
  favInstructions.textContent =
    'Click on the "♡" button at the top-left of one of your READ books to add a book to your "Favorites" Section';

  if (length2 === 0) {
    sidebarFavorites.appendChild(favInstructions);
  }
}

// Create Side Card
function CreateMiniCard(Book) {
  let miniCard = document.createElement("div");
  miniCard.classList.add("miniCard");
  let minicardTitle = document.createElement("h3");
  minicardTitle.textContent = Book.title;
  minicardTitle.classList.add("mini-card-title");
  let miniCardAuthor = document.createElement("p");
  miniCardAuthor.textContent = Book.author;
  miniCardAuthor.classList.add("mini-card-author");
  Book.favorite === true
    ? miniCard.classList.add("mini-favorite")
    : miniCard.classList.remove("mini-favorite");
  Book.queue === true
    ? miniCard.classList.add("mini-queue")
    : miniCard.classList.remove("mini-queue");
  miniCard.appendChild(minicardTitle);
  miniCard.appendChild(miniCardAuthor);
  return miniCard;
}

// Create card content from Book
function createCard(Book) {
  let card = document.createElement("div");
  card.classList.add("card");
  let cardTitle = document.createElement("h2");
  cardTitle.textContent = Book.title;
  cardTitle.classList.add("card-title");
  let cardAuthor = document.createElement("p");
  cardAuthor.textContent = Book.author;
  cardAuthor.classList.add("card-author");
  let cardpages = document.createElement("p");
  cardpages.textContent = Book.pages;
  cardpages.classList.add("card-pages");
  let buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("buttonWrapper");
  let cardBookRead = document.createElement("button");
  cardBookRead.textContent = Book.read === true ? "Read" : "Not Read";
  cardBookRead.classList.add("card-read");
  Book.read === true
    ? card.classList.add("read")
    : card.classList.add("not-read");
  let Removebutton = document.createElement("button");
  Removebutton.textContent = "Remove";
  Removebutton.classList.add("card-remove");
  Removebutton.id = Book.title;
  if (Book.read === true) {
    let favoriteOrNah = document.createElement("img");
    favoriteOrNah.classList.add("fav");
    if (Book.favorite === true) {
      favoriteOrNah.src = "images/full-heart.svg";
      card.classList.add("favorite");
    } else {
      favoriteOrNah.src = "images/heart.svg";
      card.classList.remove("favorite");
    }
    card.appendChild(favoriteOrNah);
  } else {
    Book.favorite = false;
  }

  if (Book.read === false) {
    let queueOrNah = document.createElement("img");
    queueOrNah.classList.add("que");
    if (Book.queue === true) {
      queueOrNah.src = "images/full-plus-square.svg";
      card.classList.add("queue");
    } else {
      queueOrNah.src = "images/plus-square.svg";
      card.classList.remove("queue");
    }
    card.appendChild(queueOrNah);
  } else {
    Book.queue = false;
  }

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardpages);
  buttonWrapper.appendChild(cardBookRead);
  buttonWrapper.appendChild(Removebutton);
  card.appendChild(buttonWrapper);

  return card;
}

// Make Book Object
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.favorite = false;
    this.queue = false;
    this.info = function () {
      return `${title} by ${author}, ${pages} pages, ${read}`;
    };
  }
}

// Add books to correct Array
function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

// open Modal
function createNewBook() {
  dialog.showModal();
}

// Remove from library
function removeBook(Title) {
  let index = myLibrary.findIndex((x) => x.title === Title);
  myLibrary.splice(index, 1);

  loadLibrary();
}

// Remove button functionality
document.addEventListener("click", function (e) {
  const target = e.target.closest(".card-remove");
  if (target != null) {
    removeBook(target.id);
  }
});

// Read button functionality
document.addEventListener("click", function (e) {
  const target = e.target.closest(".card-read");
  if (target != null) {
    const sister = target.parentNode.childNodes[1];
    readBook(sister.id);
  }
});

// Change Read Status
function readBook(Title) {
  let index = myLibrary.findIndex((x) => x.title === Title);
  let activeBook = myLibrary[index];
  activeBook.read === false
    ? (activeBook.read = true)
    : (activeBook.read = false);
  loadLibrary();
}

// Favorite Button Functionality
document.addEventListener("click", function (e) {
  const target = e.target.closest(".fav");

  if (target != null) {
    let currentCard = target.parentNode;
    let selector = currentCard.lastChild;
    makeFav(selector.childNodes[1].id);
  }
});

// toggle fav
function makeFav(Title) {
  let index = myLibrary.findIndex((x) => x.title === Title);
  let activeBook = myLibrary[index];
  activeBook.favorite === false
    ? (activeBook.favorite = true)
    : (activeBook.favorite = false);

  loadLibrary();
}

// que toggle button
document.addEventListener("click", function (e) {
  const target = e.target.closest(".que");
  if (target != null) {
    let currentCard = target.parentNode;
    let selector = currentCard.lastChild;
    addQue(selector.childNodes[1].id);
  }
});

// toggle que status
function addQue(Title) {
  let index = myLibrary.findIndex((x) => x.title === Title);
  let activeBook = myLibrary[index];
  activeBook.queue === false
    ? (activeBook.queue = true)
    : (activeBook.queue = false);
  loadLibrary();
}

// filter event listeners
notReadFilter.addEventListener("click", () => {
  filterContent(notReadFilter, 1);
});
ReadFilter.addEventListener("click", () => {
  filterContent(ReadFilter, 2);
});
favFilter.addEventListener("click", () => {
  filterContent(favFilter, 3);
});
queFilter.addEventListener("click", () => {
  filterContent(queFilter, 4);
});
fullLibrary.addEventListener("click", () => {
  filterContent(fullLibrary, 0);
});

// filter function for icons
function filterContent(element, filterNumber) {
  allIcons.forEach((element) => {
    element.classList.remove("chosen");
  });

  if (masterFilter === filterNumber) {
    masterFilter = 0;
    fullLibrary.classList.add("chosen");
  } else {
    masterFilter = filterNumber;
    element.classList.add("chosen");
  }

  loadLibrary();
}

// Delete button listeners
startOver.addEventListener("click", () => {
  startDeleteLibrary();
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".backButton");
  if (target != null) {
    returnToLibrary();
  }
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".deleteButton");

  if (target != null) {
    if (target.textContent === "DELETE LIBRARY FOREVER") {
      target.textContent = "LAST CHANCE!";
    } else {
      finishDeleteLibrary();
    }
  }
});

// open delete menu over icons
function startDeleteLibrary() {
  iconDiv.replaceChildren();
  iconDiv.classList.add("delete-option");
  let deleteButtonDiv = document.createElement("div");
  deleteButtonDiv.classList.add("allDeleteButtons");
  let deleteCaption = document.createElement("h3");
  deleteCaption.classList.add("deleteCaption");
  deleteCaption.textContent =
    "Are you sure you want to delete your Library? This action cannot be undone!";
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "DELETE LIBRARY FOREVER";
  let backButton = document.createElement("button");
  backButton.classList.add("backButton");
  backButton.textContent = "Return to Library";
  iconDiv.appendChild(deleteCaption);
  iconDiv.appendChild(deleteButtonDiv);
  deleteButtonDiv.appendChild(deleteButton);
  deleteButtonDiv.appendChild(backButton);
}

// clear library array and fix icons
function finishDeleteLibrary() {
  myLibrary = [];
  iconDiv.replaceChildren();
  iconDiv.classList.remove("delete-option");
  iconDiv.appendChild(backupIconsTitle);
  iconDiv.appendChild(backupIcons);
  filterContent(fullLibrary, 0);
}

// exit delete menu and fix icons
function returnToLibrary() {
  iconDiv.replaceChildren();
  iconDiv.classList.remove("delete-option");
  iconDiv.appendChild(backupIconsTitle);
  iconDiv.appendChild(backupIcons);
}

// Pre Populated Library
grokkingAlgorithms = new Book(
  "grokking algorithms",
  "Aditya Y. Bhargave",
  238,
  false
);
oryxAndCrake = new Book("Oryx & Crake", "Margaret Atwood", 389, true);
thePragmaticProgrammer = new Book(
  "The Pragmatic Programmer",
  "David Thomas and Andrew Hunt",
  321,
  false
);
pythonCrashCourse = new Book("Python Crash Course", "Eric Matthes", 514, true);
thinkLikeAProgrammer = new Book(
  "Think Like A Programmer",
  "V. Anton Spraul",
  233,
  false
);
toKillAMockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 323, true);
oryxAndCrake.favorite = true;
thePragmaticProgrammer.queue = true;
thinkLikeAProgrammer.queue = true;
addBookToLibrary(grokkingAlgorithms);
addBookToLibrary(oryxAndCrake);
addBookToLibrary(thePragmaticProgrammer);
addBookToLibrary(pythonCrashCourse);
addBookToLibrary(thinkLikeAProgrammer);
addBookToLibrary(toKillAMockingbird);
filterContent(fullLibrary, 0);
