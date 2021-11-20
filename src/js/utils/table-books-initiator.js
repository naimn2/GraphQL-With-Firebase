const tableBooksInitiator = (element) => {
    import("../data/data-source")
        .then(module => module.default)
        .then(async DataSource => {
            const books = (await DataSource.books()).books;
            books.forEach(book => {
                const tdName = document.createElement("td");
                const tdAuthor = document.createElement("td");
                const tdYear = document.createElement("td");
                tdName.innerText = book.name;
                tdAuthor.innerText = book.author.name;
                tdYear.innerText = book.year;

                const tr = document.createElement("tr");
                tr.appendChild(tdName);
                tr.appendChild(tdAuthor);
                tr.appendChild(tdYear);

                element.appendChild(tr);
            });
        });
}

export default tableBooksInitiator;