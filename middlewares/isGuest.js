// мидълуер с който да си пазим раутовете,

module.exports = (req, res, next) => {
   

    // ако имаме req.user, означаваме че имаме токен, проверено е през Аут.js от jwt.verify и е аутентикиран. Няма нужда да го проверямаме пак.
    if (req.user) {
        // ако има юзер го редиректваме към продуктс
        return res.redirect('/products')
    };
    next();

};