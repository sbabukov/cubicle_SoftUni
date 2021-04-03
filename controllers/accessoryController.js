
const { Router } = require('express');

const router = Router();
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    // тук трябва да върнем криейтаксесори хендълбарс вюто
    // зареди криейтаксесори hbs 
    res.render('createAccessory');



});

// контролера приема ПОСТ заявката
// todo: create validation middleware or validate incoming data, това са инпутите от формата, ако няма валидация може да ни хакнат
router.post('/create', (req, res) => {
    // console.log(req.body);

    // тук идва промиса от сървиса върнатия accessory.save()
    // подаваме req.body което всъщност са данните от формата криейт
    accessoryService.create(req.body)
    // като приключи ще ни редиректне
    .then(() => res.redirect('/products'))
    .catch(() => res.status(500).end());

});

module.exports = router;