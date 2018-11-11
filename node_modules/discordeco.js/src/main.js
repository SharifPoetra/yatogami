const { Database } = require('sqlite3');
var lodash = require('lodash'); //eslint-disable-line no-unused-vars
const makeError = require('makeerror'); //eslint-disable-line
const InputError = makeError('InputError'); //eslint-disable-line no-unused-vars

/**
 * Create new DiscordEconomy Client
 */
module.exports = class DiscordEconomy {
    /**
     * Client Option
     * @param {String} opt Default Balance (Default : 0);
     */
    constructor(opt) {
        if (opt) {
            var defaultBalance = lodash.toNumber(opt); //eslint-disable-line
        } else {
            var defaultBalance = 0; //eslint-disable-line
        }
        var db = new Database('economy.sqlite');
        db.run("CREATE TABLE IF NOT EXISTS economy (userID TEXT, money INTEGER)");

        //begin of functions

        /**
         * Fetches a balance from userID
         * @param {String} ID UserID from Discord User
         * @returns {Promise} A promise that contains user balance / money
         */
        this.fetchBalance = (ID) => { //eslint-disable-line no-unused-vars
            if (!ID) return new InputError('Please input user ID to fetch the balance');
            if (isNaN(ID)) return new InputError('Invalid ID');
            const fetchBalance = new Promise((resolve) => {
                function getBalance(ID) {
                    db.get(`SELECT * FROM economy WHERE userID = '${ID}'`, (err, row) => { //eslint-disable-line
                        if (!row) {
                            insertFirstMoney(ID); //eslint-disable-line
                        } else {
                            resolveDB(row);
                        }
                    });
                }
                getBalance(ID);

                function resolveDB(data) {
                    return resolve(lodash.toNumber(data.money)) //eslint-disable-line
                }

                function insertFirstMoney(userID) {
                    var stmt = db.prepare(`INSERT INTO economy (userID, money) VALUES (?,?)`);
                    stmt.run(userID, defaultBalance);
                    return getBalance(ID);
                }
            });
            return fetchBalance;
        };

        /**
         * Add balance to user balance
         * @param {String} ID userID from an user in Discord
         * @param {Number} money How much money to add to this ID
         * @returns {Promise} A promise that contains user balance / money
         */
        this.addBalance = (ID, money) => { //eslint-disable-line no-unused-vars
            if (!ID) return new InputError('Please input user ID to fetch the balance');
            if (isNaN(ID)) return new InputError('Invalid ID');
            if (!money) return new InputError('Please input a valid money');
            if (isNaN(money)) return new InputError('Money should be a number');
            const updateBalance = new Promise((resolve, error) => { //eslint-disable-line
                function checkIfCreated(ID, money) {
                    db.get(`SELECT * FROM economy WHERE userID = '${ID}'`, (err, row) => {
                        if (!row) {
                            insertFirstMoney(ID);
                        } else {
                            var moneyBefore = lodash.toNumber(row.money);
                            var moneyAfter = lodash.toNumber(money);
                            var moneyUpdate = moneyBefore + moneyAfter;
                            //console.log(moneyUpdate);
                            db.run(`UPDATE economy SET money = '${moneyUpdate}' WHERE userID = '${ID}'`);
                            db.get(`SELECT * FROM economy WHERE userID = '${ID}'`, (err, row) => {
                                resolveDB(row);
                            });
                        }
                    });
                }

                function insertFirstMoney(ID) {
                    var stmt = db.prepare('INSERT INTO economy (userID, money) VALUES (?,?)');

                    stmt.run(ID, defaultBalance);
                }

                function resolveDB(data) {
                    return resolve(lodash.toNumber(data.money)) //eslint-disable-line
                }

                checkIfCreated(ID, money);

            });
            return updateBalance;
        };

        /**
         * Update user balance
         * @param {String} ID userID from an user in Discord
         * @param {Number} money How much money to add to this ID
         * @returns {Promise} A promise that contains user balance / money
         */
        this.updateBalance = (ID, money) => { //eslint-disable-line no-unused-vars
            process.emitWarning('updateBalance : use addBalance instead', 'DeprecationWarning');
            if (!ID) return new InputError('Please input user ID to fetch the balance');
            if (isNaN(ID)) return new InputError('Invalid ID');
            if (!money) return new InputError('Please input a valid money');
            if (isNaN(money)) return new InputError('Money should be a number');
            const updateBalance = new Promise((resolve, error) => { //eslint-disable-line
                function checkIfCreated(ID, money) {
                    db.get(`SELECT * FROM economy WHERE userID = '${ID}'`, (err, row) => {
                        if (!row) {
                            insertFirstMoney(ID);
                        } else {
                            var moneyBefore = lodash.toNumber(row.money);
                            var moneyAfter = lodash.toNumber(money);
                            var moneyUpdate = moneyBefore + moneyAfter;
                            //console.log(moneyUpdate);
                            db.run(`UPDATE economy SET money = '${moneyUpdate}' WHERE userID = '${ID}'`);
                            db.get(`SELECT * FROM economy WHERE userID = '${ID}'`, (err, row) => {
                                resolveDB(row);
                            });
                        }
                    });
                }

                function insertFirstMoney(ID) {
                    var stmt = db.prepare('INSERT INTO economy (userID, money) VALUES (?,?)');

                    stmt.run(ID, defaultBalance);
                }

                function resolveDB(data) {
                    return resolve(lodash.toNumber(data.money)) //eslint-disable-line
                }

                checkIfCreated(ID, money);

            });
            return updateBalance;
        };

        /** Set user balance (NOTE: THIS WILL OVERWRITE LAST USER BALANCE)
         * @param {String} ID userID from an user in Discord
         * @param {String} money How much money to set to this ID
         * @returns {Promise} A promise that contains user balance / money
         */
        this.setBalance = (ID, money) => { //eslint-disable-line
            if (!ID) return new InputError('Please input user ID to fetch the balance');
            if (isNaN(ID)) return new InputError('Invalid ID');
            if (!money) return new InputError('Please input a valid money');
            if (isNaN(money)) return new InputError('Money should be a number');
            const setBalance = new Promise((resolve, error) => { //eslint-disable-line
                function checkIfCreated(ID, money) {
                    db.get(`SELECT * FROM economy WHERE userID = '${ID}'`, (err, row) => {
                        if (!row) {
                            insertFirstMoney(ID);
                        } else {
                            db.run(`UPDATE economy SET money = '${money}' WHERE userID = '${ID}'`);
                            db.get(`SELECT * FROM economy WHERE userID = '${ID}'`, (err, row) => {
                                resolveDB(row);
                            });
                        }
                    });
                }

                function insertFirstMoney(ID) {
                    var stmt = db.prepare('INSERT INTO economy (userID, money) VALUES (?,?)');

                    stmt.run(ID, defaultBalance);
                }

                function resolveDB(data) {
                    return resolve(lodash.toNumber(data.money)) //eslint-disable-line
                }

                checkIfCreated(ID, money);

            });
            return setBalance;
        };

        this.getDaily = (ID, dailyMoney) => { //eslint-disable-line
            //TODO:
            return 'InDevelopment';
        };
        
        //end of functions
    }
};
