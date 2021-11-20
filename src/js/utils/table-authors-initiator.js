const tableAuthorsInitiator = (element) => {
    import("../data/data-source")
        .then(module => module.default)
        .then(async DataSource => {
            const authors = (await DataSource.authors()).authors;
            authors.forEach(author => {
                const tdName = document.createElement("td");
                const tdAuthor = document.createElement("td");
                const tdYear = document.createElement("td");
                tdName.innerText = author.name;
                tdAuthor.innerText = author.address;
                tdYear.innerText = author.email;

                const tr = document.createElement("tr");
                tr.appendChild(tdName);
                tr.appendChild(tdAuthor);
                tr.appendChild(tdYear);

                element.appendChild(tr);
            });
        });
}

export default tableAuthorsInitiator;