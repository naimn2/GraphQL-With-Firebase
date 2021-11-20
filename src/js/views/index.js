import bookInputAuthorInitiator from "../utils/book-input-author-initiator";

const bookInputAuthors = document.querySelector("#bookInputAuthor");
bookInputAuthorInitiator(bookInputAuthors);

const btnAddAuthor = document.querySelector("#btnAddAuthor");
btnAddAuthor.addEventListener("click", async () => {
    const DataSource = (await import("../data/data-source")).default;
    const name = document.querySelector("#authorInputName").value;
    const address = document.querySelector("#authorInputAddress").value;
    const email = document.querySelector("#authorInputEmail").value;

    if (!name || !address || !email) {
        alert("Failed to add author. There shouldn't be an empty field!");
        return;
    }

    await DataSource.addAuthor({name, address, email});
    alert("Author added!");
});

const btnAddBook = document.querySelector("#btnAddBook");
btnAddBook.addEventListener("click", async () => {
    const DataSource = (await import("../data/data-source")).default;
    const name = document.querySelector("#bookInputName").value;
    const bookInputAuthor = document.querySelector("#bookInputAuthor");
    const authorId = bookInputAuthor.options[bookInputAuthor.selectedIndex].value;
    const year = Number(document.querySelector("#bookInputYear").value);

    if (!name || !authorId || !year) {
        alert("Failed to add author. There shouldn't be an empty field!");
        return;
    }

    await DataSource.addBook({name, authorId, year});
    alert("Book added!");
});