const fs = require('fs/promises');

// path библиотека за пътищата на файловете по директориите
const path = require('path');

// викане на записаните вече кубчета от products.json
const productsDb = require('../config/products.json')

class Model {

    save() {
        // product е this
        productsDb.push(this);

        return fs.writeFile(
            path.join(__dirname, '../config/products.json'),
            JSON.stringify(productsDb),
        );
    }

    // статичен метод
    static getAll() {
        return productsDb;
    }

    static getOne(id) {

        // проверяваме в productsDb дали има дадения продукт по id и го връщаме
        return productsDb.find(x => x.id == id);
    }

}

module.exports = Model;