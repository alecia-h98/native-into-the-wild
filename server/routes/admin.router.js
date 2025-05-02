const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated, rejectIfNotAdmin} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/users', rejectIfNotAdmin, async (req, res) => {
    try {
        const query = `
        SELECT "id", "name", "username", "password", "is_admin"
        FROM "user";
        `;
        const result = await pool.query(query);
        res.send(result.rows);
    } catch (error) {
        console.log('GET /admin/users failed', error);
        res.sendStatus(500);
    }
})

module.exports = router;