const admin = require("firebase-admin");
const adminSDK = require("./adminsdk.json");
admin.initializeApp({
    credential: admin.credential.cert(adminSDK),
    databaseURL: "http://localhost:9000/?ns=form-test-c78f7",
});

const { map } = require("lodash");

const mapSnapshotToEntity = snapshot => ({ id: snapshot.key, ...snapshot.val() });
const mapSnapshotToEntities = snapshot => map(snapshot.val(), (value, id) => ({ id, ...value }));

const ref = path => admin.database().ref(path);
const getValue = path => ref(path).once("value");
const filterValue = (path, field, value) => ref(path).orderByChild(field).equalTo(value).once("value");
const getEntity = path => getValue(path).then(mapSnapshotToEntity);
const getEntities = path => getValue(path).then(mapSnapshotToEntities);
const filterEntities = (path, field, value) => filterValue(path, field, value).then(mapSnapshotToEntities);

const dbHelper = {
    authors() { 
        return getEntities("authors");
    },
    author(id) { 
        return getEntity(`authors/${id}`);
    },
    books(filter) {
        if (filter) {
            const { field, value } = filter;
            return filterEntities("books", field, value);
        }
        return getEntities("books");
    },
    book(id) { 
        return getEntity(`books/${id}`) ;
    },
    async addBook(book) {
        const bookRef = ref("books").push();
        const id = bookRef.key;
        await bookRef.set(book);
        book["id"] = id;
        return book;
    },
    async addAuthor(author) {
        const authorRef = ref("authors").push();
        const id = authorRef.key;
        await authorRef.set(author);
        author["id"] = id;
        return author;
    },
};

module.exports = dbHelper;