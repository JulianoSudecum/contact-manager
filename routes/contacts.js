const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { name, phone } = req.body;
    const sql = 'INSERT INTO contacts (name, phone) VALUES (?, ?)';
    db.query(sql, [name, phone], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ id: result.insertId, name, phone });
    });
});

router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const sql = 'SELECT * FROM contacts ORDER BY name ASC LIMIT ? OFFSET ?';
    db.query(sql, [parseInt(limit), parseInt(offset)], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(200).json(results);
    });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body;
    const sql = 'UPDATE contacts SET name = ?, phone = ? WHERE id = ?';
    db.query(sql, [name, phone, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.status(200).json({ id, name, phone });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.status(204).send(); 
    });
});

module.exports = router;
