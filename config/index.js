const config = {
development: {
    PORT: 5000,
    DB_CONNECTION: 'mongodb://localhost/cubicle',
    SALT_ROUNDS: 10, 
    SECRET: 'navuhodonosor',
    COOKIE_NAME: 'USER_SESSION', 
},
production: {
    PORT: 80,
    DB_CONNECTION: 'mongodb+srv://Stefan:StefanObichaPetya@cluster0.zfeps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    SALT_ROUNDS: 10, 
    SECRET: 'navuhodonosor',
    COOKIE_NAME: 'USER_SESSION',
}
}

// така се сетва автоматично кой порт да ползва
module.exports = config[process.env.NODE_ENV]

