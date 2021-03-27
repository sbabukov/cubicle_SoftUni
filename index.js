const express = require('express');
// console.log(process.env.NODE_ENV);
const config = require('./config/config')

// import routers
const routes = require('./routes')

const app = express();

// викане на настройката на експрес за работа с хендълбарс
const expressConfig = require('./config/express');
expressConfig(app);

//  добавяне на мидълуер за раутването, middleware using routes - делегира раутването на аппа
app.use(routes);






app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));