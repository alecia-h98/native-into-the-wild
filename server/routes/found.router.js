const express = require('express');
const pool = require('../modules/pool');
//const axios = 
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();
// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multer = require('multer');
const storage = multer.memoryStorage();



//GET FOUND LIST
router.get('/', rejectUnauthenticated, (req,res) => {
    const query = `
SELECT "found"."id", "found"."found_date", "found"."description", "found"."item_id", "found"."location", "found"."photo", "found"."user_id", "item"."name"
From "item"
JOIN "found"
ON "item"."id" = "found"."item_id" 
WHERE "found"."user_id" = $1
ORDER BY "found"."found_date" DESC;
    `;
    pool.query(query, [req.user.id])
     .then(result => {
        res.send(result.rows);
     })
     .catch(err =>  {
        console.log(`Error grabbing found list`, err);
        res.sendStatus(500)
     })
});


//the route for the specific found item and it's details
router.get('/:foundId', rejectUnauthenticated, (req, res) => {
    const query = `
select "found"."id" as "foundId", "found"."found_date", "found"."description", "found"."item_id", "found"."location", "found"."photo", "found"."user_id", "found"."item_id", "item"."name"
from "item"
join "found"
on "item"."id" = "found"."item_id"
join "user"
on "found"."user_id" = "user"."id"
where "found"."id" = $1 AND "found"."user_id" = $2;
    `;
    pool.query(query, [req.params.foundId, req.user.id])
     .then(result => {
        res.send(result.rows);
     })
     .catch(err =>  {
        console.log(`Error grabbing specific found`, err);
        res.sendStatus(500);
     })
});

//DONE
//DELETE POST FROM FOUND LIST
router.delete('/del/:foundId', rejectUnauthenticated, (req, res) => {
    console.log('req.params', req.params);
    const queryText = `DELETE FROM "found" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.foundId]).then((result) => {
        res.sendStatus(204);
    }).catch(err=> {
        res.sendStatus(500);
        console.error(err);
    })
});

module.exports = router;