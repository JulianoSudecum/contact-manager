const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/contacts-groups', (req, res) => {
    const sql = `
        SELECT g.name AS group_name, COUNT(cg.contact_id) AS contact_count
        FROM \`groups\` g
        LEFT JOIN contacts_groups cg ON g.id = cg.group_id
        GROUP BY g.id
        ORDER BY contact_count DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
