
const mongoose = require('mongoose');
// искаме да си създадем схемата, тя описва структурата на данните, които ще бъдат записани в базата даннни. През този модел моделираме данните, които ще влязат БД. Указва каква ще е структурата и типа данни на модела. Ако данните не отговарят на схемата, няма да ги запише в Монгото
// може да направим и валидация на входните данни като обекти
const cubeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
        }
    ],
    // по този начин всеки куб си има собствен криейтър
    creator: {
        type: mongoose.Types.ObjectId,
            ref: 'User',
    },
})

// експортва се Cube като се подава и неговата схема
module.exports = mongoose.model('Cube', cubeSchema);