const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
      currentUserName: req.currentUserName,
      title: 'Home page',
      isHome: true
    });
})


module.exports = router;