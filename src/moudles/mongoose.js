const express = require('express');

class MyMongoose{

    constructor() {
        this.mongoose = require('mongoose');
        this.db = undefined;
        this.isConnected = false;
    }

    connectToDB(DATABASE_URL){
        if (this.isConnected){
            console.error(`you are already connected`);
            // TODO Disconnected (remove return)
            return;
        }
        this.mongoose.connect(DATABASE_URL);
        this.db = this.mongoose.connection;
        this.db.on('error', (error) => console.error(error));
        this.db.once('open', () => console.log(`Connected to DB`));
        this.isConnected = true;
    }
 
}

class Singleton {
    
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new MyMongoose();
        }
    }
  
    getInstance() {
        if (!Singleton.instance.isConnected){
            const dotenv = require('dotenv');
            dotenv.config();
            Singleton.instance.connectToDB(process.env.DATABASE_URL);
        }
        return Singleton.instance;
    }
  
}
  
module.exports = new Singleton().getInstance();
