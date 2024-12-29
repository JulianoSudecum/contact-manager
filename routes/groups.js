const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO `groups` (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error creating the group.' });
        }
        res.status(201).json({ id: result.insertId, name });
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM `groups`';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error retrieving groups.' });
        }
        res.status(200).json(results);
    });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = 'UPDATE `groups` SET name = ? WHERE id = ?';
    db.query(sql, [name, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error updating the group.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Group not found.' });
        }
        res.status(200).json({ id, name });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM `groups` WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error deleting the group.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Group not found.' });
        }
        res.status(204).send(); // No content
    });
});

router.get('/:id/contacts', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT c.id AS contact_id, c.name, c.phone
        FROM contacts c
        JOIN contacts_groups cg ON c.id = cg.contact_id
        WHERE cg.group_id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error retrieving contacts for the group.' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
