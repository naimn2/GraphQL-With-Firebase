const my_authors = [
    { id: 1, name: "Naim", address: "A4", email: "naim@gmail.com" },
    { id: 2, name: "Asad", address: "D3", email: "asad@yahoo.com" },
    { id: 3, name: "Dafa", address: "F2", email: "dafa@mail.com" },
];

const my_books = [
    { id: 1, name: "Valorant Tips", authorId: 2, year: 2099 },
    { id: 2, name: "My Game", authorId: 2, year: 2011 },
    { id: 3, name: "Tutorial GraphQL", authorId: 1, year: 2012 },
    { id: 4, name: "Build Web with Firebase", authorId: 1, year: 2011 },
    { id: 5, name: "Tips Jadi Youtuber", authorId: 1, year: 1944 },
    { id: 6, name: "Kisah Nabi", authorId: 3, year: 1900 },
];

const Resolver = {
    listBooks(parent, args) {
        // TODO Get all books
        if (args.year) {
            return my_books.filter(book => book.year === args.year);
        }
        return my_books;
    },
    listAuthors() {
        // TODO Get all authors
        return my_authors;
    },
    getBook(parent, args) {
        // TODO Get a book by book id (args.id)
        return my_books.find(book => book.id === args.id);
    },
    getAuthor(parent, args) {
        // TODO Get an author by author id (args.id)
        return my_authors.find(author => author.id === args.id);
    },
    bookTypeAuthor(parent) {
        // TODO Get an author by author id (parent.authorId)
        return my_authors.find(author => author.id === parent.authorId);
    },
    authorTypeBooks(parent) {
        // TODO Queries all books where book.authorId == parent.id
        return my_books.filter(book => book.authorId === parent.id);
    },
    addBook(parent, args) {
        // TODO Add book
        const { name, authorId, year } = args;
        const book = { id: my_books.length+1, name, authorId, year };
        my_books.push(book);
        return book;
    },
    addAuthor(parent, args) {
        // TODO Add author
        const { name, address, email } = args;
        const author = { id: my_authors.length+1, name, address, email };
        my_authors.push(author);
        return author;
    },
};

module.exports = Resolver;
