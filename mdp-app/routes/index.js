var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const berita =[
    {
        judul : "Berita 1",
        isi : "Isi Berita 1"
    },
    {
        judul : "Berita 2",
        isi : "Isi Berita 2"
    },
   ];
   res.render('index', {title: 'Halaman Home', berita,  layout:'main'});
});


module.exports = router;
