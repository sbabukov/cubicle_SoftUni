const jwt = require('jsonwebtoken');
const { COOKIE_NAME, SECRET } = require('../config');

module.exports = function() {
    return (req, res, next) => {
        // мидълуера трябва да прочете кукито, да провери дали има в рекуеста нашето куки
        let token = req.cookies[COOKIE_NAME];
        if(token) {
            //  verify token
            jwt.verify(token, SECRET, function(err, decoded){
                if(err) {
                    // тук е мястото ако има грешка да изтрием кукито - COOKIE_NAME
                    // резпонс стрийма няма да се прекрати с изтриването на кукито, заявката ще си продължи
                    res.clearCookie(COOKIE_NAME);
                    // когато е изтрито кукито
                    
                } else {

                    // всичко което ни идва от токена го закачаме на req.user, в случая имаме достъп само до id-то. От аутСървиза можем да закачим още неща към токена, примерно юзернейм, може и роли - дали е админ или прост юзер 
                    // вече сме си го закачили на  req.user = decoded
                    req.user = decoded;
                    // console.log(decoded);

                    res.locals.user = decoded;
                    // юзера е аутентикиран - true
                    // от тук е сетнато isAuthenticated = true за иф логиката в main.hbs
                    res.locals.isAuthenticated = true;
                }
                
            });
        };
       
        next();
    };
};