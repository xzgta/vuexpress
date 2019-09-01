const express = require('express');
const router = express.Router();
const conn = require('../database/db.js');


// get all
router.get('/', (req, res, next) => {
	// res.send("product")
	let sql = "SELECT * FROM users";
	let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "Users": results}));
  });
})

//get all params
router.get('/:id', (req, res, next) => {
	let sql = "SELECT * FROM users WHERE id="+req.params.id;
	let query = conn.query(sql, (err, results) => {
		if(err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "Users": results}));
	})
})

//Tambahkan data user baru
router.post('/',(req, res) => {
  let data = {name: req.body.name};
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "users": results}));
  });
});
 
//Edit data user berdasarkan id
router.put('/:id',(req, res) => {
  let sql = "UPDATE users SET name='"+req.body.name+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "users": results}));
  });
});
 
//Delete data user berdasarkan id
router.delete('/:id',(req, res) => {
  let sql = "DELETE FROM users WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
module.exports = router;
