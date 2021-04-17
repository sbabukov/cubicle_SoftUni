const mongoose = require('mongoose');
const config = require('./index');

module.exports = (app) => {
    // кънектване на монгуса, идва от документацията
    mongoose.connect(config.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    
    //  db.on означа, че при грешка се байндва грешката и се изписва
    db.on('error', console.error.bind(console, 'connection error:'));
    // db.once означава, че само веднъж при опен ми изпълни това нещо
    // така е с bind
    db.once('open', console.log.bind(console, 'DB connected'));
    
    // или може и => функция еквивалентно е
    // db.once('open', () => console.log('DB connected'));

};