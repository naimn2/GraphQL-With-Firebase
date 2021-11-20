import tableBooksInitiator from "../utils/table-books-initiator";
import tableAuthorsInitiator from "../utils/table-authors-initiator";

tableBooksInitiator(document.querySelector("#table-books"));
tableAuthorsInitiator(document.querySelector("#table-authors"));