const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('registration', {
      title: 'Registration',
      isRegistration: true
    });
});

module.exports = router;