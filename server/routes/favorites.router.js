const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

const router = express.Router();



router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT "user_item"."is_favorited", "user_item"."user_id", "user_item"."item_id", "item"."name", "item"."photo", "user_item"."id"
    FROM "user_item"
    JOIN "item"
    ON "user_item"."item_id" = "item"."id"
    JOIN "user"
    ON "user_item"."user_id" = "user"."id"
    WHERE "user_item"."is_favorited"=true AND "user_item"."user_id" = $1;
    `;
    pool.query(query, [req.user.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: cannot render item list', err);
        res.sendStatus(500);
    })
});

//DONE
//POST FUNCTION TO MAKE A FAVORITE
router.post('/:itemId', rejectUnauthenticated, (req, res) => {
    const query = `
    INSERT INTO "user_item"
	("user_id", "item_id")
	VALUES
	($1, $2);
    `;
    pool.query(query, [req.user.id, req.params.itemId])
    .then(result => {
        console.log(`retrieved results:`, result.rows);
       res.sendStatus(201);
     })
   .catch((err) => {
     console.error(`error adding koalas `, err);
     res.sendStatus(500);
   });
});


//Done??
// PUT ROUTE TO SWITCH AN ITEM'S FAVORITE KEY
// MAKE SURE TO INCLUDE THE REQ.USER WHEN WRITING THIS
router.put('/fav', rejectUnauthenticated, (req, res) => {
    //Below is making a request to grab the id from the req.body
    const { id } = req.body;
    
    if(!id){
        return res.status(400).json({ error: "Missing favorite ID"});
    }
    const sqlText = `
        UPDATE "user_item" 
        SET "is_favorited" = FALSE 
        WHERE "is_favorited" = TRUE 
        AND "user_item"."id" = $1;
    `;
    pool.query(sqlText, [id])
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
    })
});

//toggling
// router.put('/fav/:id', (req, res) => {

//     const sqlText = `
//         UPDATE "user_item" 
//         SET "is_favorited" = NOT "is_favorited" 
//         WHERE "is_favorited" = TRUE 
//         AND "user_item"."id" = $1;
//     `;
//     pool.query(sqlText, [req.user])
//         .then(() => res.sendStatus(200))
//         .catch(err => {
//             console.error(err);
//             res.sendStatus(500);
//     })
// });

module.exports = router;