const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { contact_id, group_id } = req.body;
    const sql = 'INSERT INTO contacts_groups (contact_id, group_id) VALUES (?, ?)';
    db.query(sql, [contact_id, group_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ message: 'Contact added to group successfully.' });
    });
});

router.get('/:group_id', (req, res) => {
    const { group_id } = req.params;
    const sql = `
        SELECT c.id AS contact_id, c.name, c.phone
        FROM contacts c
        JOIN contacts_groups cg ON c.id = cg.contact_id
        WHERE cg.group_id = ?
    `;
    db.query(sql, [group_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(200).json(results);
    });
});

router.delete('/', (req, res) => {
    const { contact_id, group_id } = req.body;
    const sql = 'DELETE FROM contacts_groups WHERE contact_id = ? AND group_id = ?';
    db.query(sql, [contact_id, group_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contact or group not found.' });
        }
        res.status(204).send();
    });
});

module.exports = router;
