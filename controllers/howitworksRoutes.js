const express = require('express');
const router = express.Router();


//hello route
// router.get('/sections', (req, res) => {
//   res.render('sections.pug');
// });

// landing page route
router.get('/howitworks', (req, res) => {
  res.render('howitworks.pug');
});

module.exports = router;