const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

const router = express.Router();

//DONE
//getting all items
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT * FROM "item";
    `;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: cannot render item list', err);
        res.sendStatus(500);
    })
});

router.post('/:itemId/found', rejectUnauthenticated, (req, res) => {
  console.log('server params', req.params);
  let newItem = {...req.body};

  //should I put this after my pool.query code on line 72?
  // if (!req.body.item_id || !req.body.found_date|| !req.body.location || !req.body.description || !req.body.photo || !req.user.id) {
  //     console.error('Missing required fields');
  //     res.sendStatus(400);
  //     return;
  // }


  let queryText = `INSERT INTO "found" ("item_id", "found_date", "location", "description", "photo", "user_id") VALUES
    ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  
  pool.query(queryText, [newItem.item_id, newItem.found_date, newItem.location, newItem.description, newItem.photo, req.user.id]) 
  .then(result => {
    console.log(`retrieved results:`, result.rows);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error(`error adding form items `, err);
    res.sendStatus(500);
});
});

//DONE
//getting a specific item from the specified category list
router.get('/:itemId', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT "item"."id", "item"."name", "item"."description", "item"."found", "item"."season", "item"."uses", "item"."photo", "item"."nutrition", "item"."shelf_life", "item"."harvesting", "item"."imposters", "item"."category_id"
    FROM "item"
    WHERE "id" = $1;
    `;
    pool.query(query,[req.params.itemId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error:', err);
      res.sendStatus(500);
    })
});






module.exports = router;