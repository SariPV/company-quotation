var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Quotation = require("../db/models/quotation");

/* GET products listing. */
router.get("/api/*", (req, res, next) => {
  Quotation.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});

// Create new product
router.post("/api/*", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const dateObj = new Date()
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const quotation1 = new Quotation({
    item: data.item,
    date: day + "/" + month + "/" + year,
    qty: data.qty,
    price: data.price
 
  });
  quotation1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});


router.delete("/api/:id", (req, res, next) => {
  const id = req.params['id'] // use ID from the route parameter
  // const id = req.body._id;
  console.log("Delete this id ",id)
  console.debug('Product ID to delete',id);
  Quotation.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

//Update whole object or partially (PATCH)
router.put("/api/*", async (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const id = data._id;
  delete data._id;
  console.debug(data);

  Quotation.findByIdAndUpdate(id,data, (err,doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }

  });


});
module.exports = router;
