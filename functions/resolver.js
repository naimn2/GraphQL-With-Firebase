const dbHelper = require("./db-helper");

const Resolver = {
    async listBooks(parent, args) {
        return await dbHelper.books();
    },
    async listAuthors() {
        return await dbHelper.authors();
    },
    async getBook(parent, args) {
        return await dbHelper.book(args.id);
    },
    async getAuthor(parent, args) {
        return await dbHelper.author(args.id);
    },
    async bookTypeAuthor(parent) {
        return await dbHelper.author(parent.authorId);
    },
    async authorTypeBooks(parent) {
        return await dbHelper.books({
            field: "authorId", 
            value: parent.id
        });
    },
    async addBook(parent, args) {
        return await dbHelper.addBook(args);
    },
    async addAuthor(parent, args) {
        return await dbHelper.addAuthor(args);
    },
};

module.exports = Resolver;
