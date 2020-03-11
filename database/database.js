const db = require("mysql");


class Database {

    constructor(){
        this.version = process.env.VERSION;
        this.user = process.env.USER;
        this.key =  process.env.KEY;
        this.namedatabase = process.env.NAMEDATABASE;
        this.localhost = process.env.HOST;
        this.connection = null;
    }
    
    async createConnection(){
        this.connection = db.createConnection({
            host: this.host,
            user: this.user,
            password: this.key
        });
        console.log("established connection");

    }

    async query(commandSQL){
        let copyconnection = this.connection;
        return new Promise(function(resolve, reject){
            copyconnection.query(commandSQL, function(err, result){
                resolve(result);
            });    
        });
    }

    async createDatabase(){
        let result = await this.query(`CREATE DATABASE IF NOT EXISTS ${this.namedatabase}`);
        console.log("database create" , result);
        console.log("version database", this.version);
    }

    closeConnection(conection){
        this.connection.close();
    }

}

module.exports = {
    Database: Database
};