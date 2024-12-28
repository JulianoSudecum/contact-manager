const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.post('/', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO `groups` (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ id: result.insertId, name });
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM `groups`';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(200).json(results);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM `groups` WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Group not found.' });
        }
        res.status(204).send(); 
    });
});

module.exports = router;