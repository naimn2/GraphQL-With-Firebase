const bookInputAuthorInitiator = async (element) => {
    import("../data/data-source")
        .then(module => module.default)
        .then(async DataSource => {
            const authors = (await DataSource.authorsOnlyName()).authors;
            authors.forEach(author => {
                const opt = document.createElement("option");
                opt.setAttribute("value", author.id);
                opt.innerText = author.name;
                element.appendChild(opt);
            });
        });
}

export default bookInputAuthorInitiator;