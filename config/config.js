const config = {
development: {
    PORT: 5000
},
production: {
    PORT: 80,
}
}

// така се сетва автоматично кой порт да ползва
module.exports = config[process.env.NODE_ENV]

