// може така
// const {Router} = require('express');
// const router = Router();

//  а може и така на един ред
const router = require('express').Router();

const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');



// правим двата раута за логин и регистер за ГЕТ заявките
router.get('/login', isGuest, (req, res) => {
    // 'login' го взима от login.hbs в папка partials
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    // тук може да се валидира за невалидни керъктъри
    // пак ще изпозваме аутСервиз
    const { username, password } = req.body;

    try {
        // в аутСървиса при login се връща token, който тук идва като асинхронна ф-я
        let token = await authService.login({ username, password });
        // сетваме токена в кукито, това - COOKIE_NAME ние си го избираме как да се казва и го сетваме в конфига. Токена може да се праща по всякакъв начин. Удобно е да е в куки, защото браузера се грижи да си го праща насам-натам
        res.cookie(COOKIE_NAME, token)
        // при успешно логване, редиректваме към продуктс
        res.redirect('/products');

    } catch (error) {
        console.log(error);
        res.render('login', { error });
    };
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');

});

// правим си ПОСТ заявките
router.post('/register', isGuest, async (req, res) => {
    // console.log(req.body);

    // когато се праща от формата на клиента се взима req.body.нещо си от формата РЕГИСТЕР
    const { username, password, repeatPassword } = req.body;

    // трябва да се направи валидация на паролите
    if (password !== repeatPassword) {
        // ще тролнеме, защото е асинхронна ПОСТ-РЕГИСТЕР заявката. Грешката ще я хване в КЕЧА на аутКонтролера
        // от node.js грешките идват като обект {message: 'Някаква си грешка'}
        res.render('register', { message: 'Password missmatch!' });
        return;
    };

    try {
        // от аутСепвиса пристигат асинхронно регистер с данните от формата register(req.body)
        let user = await authService.register({ username, password });
        // console.log(result);
        // ако успешно сме се рагистрирали ни редиректва на логин 
        res.redirect('/auth/login')

    } catch (error) {

        // при грешка ренедерираме и подаваме грешката, 'register' е hbs файла на темплейта
        // от node.js грешките идват като обект {message: 'Някаква си грешка'}
        res.render('register', { error });
    };

});

// тук си правим логаутването
router.get('/logout', isAuthenticated, (req, res) => {
    // трием кукито и сървъра вече ни приема като логаутнат
    res.clearCookie(COOKIE_NAME);
    
    // редиректваме към хоумпейджа
    res.redirect('/products');
});

module.exports = router;