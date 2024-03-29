// мидълуер с който даа си пазим раутовете

module.exports = (req, res, next) => {
    // ще проверява дали е аутентикиран, и ако е така, ще го пусне. Ако не е аутентикиран ще го спре и ще го редиректне (изгони)
    // валидираме, дали потребителят е аутентикиран

    // ако имаме req.user, означаваме че имаме токен, проверено е през Аут.js от jwt.verify и е аутентикиран. Няма нужда да го проверямаме пак.
    if (!req.user) {
        return res.redirect('/auth/login')
    };
    // ако има юзер прескача направо на next()
    next();

};