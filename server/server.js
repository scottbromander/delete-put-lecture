const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const PORT = 5000;

const restaurantRouter = require('./routes/restaurants.router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('server/public'));

// '/restaurants/delete/6'
app.use('/restaurants', restaurantRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});