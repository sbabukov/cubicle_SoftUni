const config = {
development: {
    PORT: 5000,
    DB_CONNECTION: 'mongodb://localhost/cubicle'
},
production: {
    PORT: 80,
    DB_CONNECTION: 'mongodb+srv://Stefan:StefanObichaPetya@cluster0.zfeps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}
}

// така се сетва автоматично кой порт да ползва
module.exports = config[process.env.NODE_ENV]

