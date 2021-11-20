const db = {
    init(adminSDK) {
        this._admin = require("firebase-admin");
        this._admin.initializeApp({
            credential: admin.credential.cert(adminSDK),
        });
    },
};

module.exports = db;