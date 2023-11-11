"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const PORT = process.env.PORT || 3001;
const objects = require('./routes/objects');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(objects);
const uri = "mongodb+srv://admin:admin@cluster0.spcdnnn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function runMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.db("admin").command({ ping: 1 });
            console.log("You successfully connected to MongoDB!");
        }
        finally {
            yield client.close();
        }
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            runMongoDB().catch(console.dir);
            yield mongoose.connect(uri, { useNewUrlParser: true });
            app.listen(PORT, () => {
                console.log(`Server starting on port ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
start();
