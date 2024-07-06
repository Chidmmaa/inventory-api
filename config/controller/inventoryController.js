const pool = require('../config/db');

// Create new inventory
const createInventory = (req, res) => {
  const {product_name, product_number, product_type, product_cost } = req.body;
  const query = 'INSERT INTO inventory (product_name, product_number, product_type, product_cost) VALUES ($1, $2, $3, $4)';
  pool.query(query, [product_name, product_number, product_type, product_cost], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
   return res.status(201).json({product_name, product_number, product_type, product_cost });
  });
};

// Get all inventory
const getAllInventory = (req, res) => {
  const query = 'SELECT * FROM inventory';
  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results.rows);
  });
};


// Delete an inventory
const deleteInventory = (req, res) => {
  const { product_number } = req.params;
  const query = 'DELETE FROM inventory WHERE product_number = $1';
  pool.query(query, [product_number], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  });
};

module.exports = {
  createInventory,
  getAllInventory,
  deleteInventory
};