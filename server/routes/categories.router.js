const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

//DONE
//getting all categories - main category page
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT * FROM "category";
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

//DONE
//getting all of the items in selected category
router.get('/:categoryId', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT category.id, category.name AS category_name, item.category_id, item.photo, item.id, item.name, item.id AS "itemId"
    FROM category
    join item
    on category.id = item.category_id
    WHERE category.id = $1;
    `;
    pool.query(query,[req.params.categoryId])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('Error:', err);
        res.sendStatus(500);
      })
  });

  // router.get('')
module.exports = router;