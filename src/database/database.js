const { config } = require("../setup/DBConfig");

export default class Database {
    constructor(){
        const request  = indexedDB.open(config.databaseName, config.databaseVersion);

        request.onupgradeneeded = (event) => {
            console.log("Database onupgradeneeded!")

            //  Get db instance
            this.instance = event.target.result;

            // Create Store
            this.instance.createObjectStore(config.stores.BOARDS, { keyPath: "id" });
            this.instance.createObjectStore(config.stores.COLUMNS, { keyPath: "id" });
            this.instance.createObjectStore(config.stores.CARDS, { keyPath: "id" });
        }

        request.onsuccess =  (event) => {
            console.log("Database onsuccess!")

            //get db instance
            this.instance = event.target.result;
        }

        request.onerror = (event) => {
            console.log("Database onerror: " + JSON.stringify(event));
        }
    }

}
