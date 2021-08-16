const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('users', {
      title: 'Users',
      isUsers: true
    });
})

module.exports = router;