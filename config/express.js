
const express = require('express');
const handlebars = require('express-handlebars');


function setupExpress(app) {

    // настройване на ползването на хендълбарс с експрес
app.engine('hbs', handlebars({
    extname: 'hbs',
    
}));

// настройване на вюенджина
app.set('view engine', 'hbs');



// setup midleware, using public folder for static things
app.use(express.static('public'));

// middleware / експреса трябва да парсване от бодито на заявката от Formdata на браузера, стринга трябва да се парсне към обект
app.use(express.urlencoded({
    extended: true,
}))

}

module.exports = setupExpress;