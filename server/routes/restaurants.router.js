const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {
    const queryString = `SELECT * FROM "restaurants-test" ORDER BY "name" ASC;`;

    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
});

router.post('/', (req,res) => {
    const restaurantObject = req.body;

    const queryString = `INSERT INTO "restaurants-test" (name, address, bestfood, visited)
                    VALUES ($1,$2,$3,false);`;

    pool.query(queryString, [restaurantObject.name, restaurantObject.address, restaurantObject.bestfood])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error saving to DB: ', err);
            res.sendStatus(500);
        });
});

// example -> url: '/restaurants/visited/6, type: 'PUT'
router.put('/visited/:id', (req,res) => {
    const queryString = `UPDATE "restaurants-test" SET "visited"=true WHERE id=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error updating :', err);
            res.sendStatus(500);
        });
});

router.delete('/delete/:id', (req,res) => {
    const queryString = `DELETE FROM "restaurants-test" WHERE id=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error deleting: ', err);
        });
});

module.exports = router;