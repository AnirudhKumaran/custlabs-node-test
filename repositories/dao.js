const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const bcrypt = require('bcrypt');
const saltRounds = 10;



export default class {

    static setupDbForDev() {
        //  This sets up a DB in memory to be used by creating tables, inserting values, etc.
        db.serialize(function () {
            const createAccountsTable = "CREATE TABLE IF NOT EXISTS accounts (emailId TEXT PRIMARY KEY ,accountId TEXT, accountName text,appsecrettoken text)";
            db.run(createAccountsTable);
            const createDestinationTable = "CREATE TABLE IF NOT EXISTS destination (emailId TEXT, destinationUrl TEXT,destinationMtd TEXT, destinationHeaders TEXT)";
            db.run(createDestinationTable);

            // bcrypt.hash(password, saltRounds, function (err, hash) {
            //     const insertUsers = `INSERT INTO users (username, password) VALUES ('foo', '${hash}'), ('bar', '${hash}');`
            //     db.run(insertUsers);
            // });
            // const insertItems = `INSERT INTO items (name, price) VALUES ('book', 12.99), ('t-shirt', 15.99), ('milk', 3.99);`
            // db.run(insertItems);
        });
        //  db.close();
    }

    static all(stmt, params) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }
    static get(stmt, params) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    static run(stmt, params) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }


}
