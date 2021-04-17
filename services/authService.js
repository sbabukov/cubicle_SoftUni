const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config');
// const { SECRET } = require('../config');

const register = async ({ username, password }) => {
    // щом се ползва async/await, задължително се слага и трай/кеч, сега не слагаме трай/кеч защото го ползваме от аутКонтролера. Може да се ползва и промис синтаксиса 

    //TODO: да проверим дали има такъв username с user.find(), ако няма такъв - създай, ако го има върни грешка

    // ще регистрира юзера в ДБ, от userData си създаваме нашия юзермодел
    // hash password защото ще се пази на сървъра
    // генериране на солта, солта ще я изнесем в конфига.js
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt)


    // вече паролата ще е хеширана - password: hash
    const user = new User({ username, password: hash });

    
    // така ще се запази в ДБ Това save() идва от документацията на Монгуз
    // ще върнем нерезолвнат промис, който ще се резолвне от контролера
    return await user.save();

};

const login = async ({username, password}) => {
    // да вземем юзера от ДБ, find() е от Монгуза
    // where е от Query от Монгуз документа, където ('username') е равно на (username)
    // User.find({}).where('username').eq(username);

    // findOne връща само един документ от ДБ, докато find ще върне всичките документи
    let user = await User.findOne({username});

    if (!user) throw { message: 'User not Found'};
    
    // да сравним хеширана парола, сравнява password и кодирания стринг user.password
    // ако не са еднакви ще тролне грешка, която ще хванем в аутКонтролера, bcrypt.compare връща true/false
    let isMatch = await bcrypt.compare(password, user.password);

    // ако паролата не съвпада
    if (!isMatch) throw { message: 'Password does not match'};
    
    // да генерираме токен чрез библиотеката jsonwebtoken, който ще си го носи напред-назад и с него ще се идентифицира
    // подаваме обекта, който искаме да сайнем - айдито (можем да закачаме каквото си поискаме, примерно също и username - базови неща, което може да ползваме, юзернейм който да се вижда при логване в сайта. Идват от ДБ-то). Става синхронно
    // SECRET думата ще я сетнем в пак в конфига
    let token = jwt.sign({ _id: user._id, username: user.username, roles: ['admin'] }, SECRET);
    // връщаме токена
    return token;
};


module.exports = {
    register,
    login,
};