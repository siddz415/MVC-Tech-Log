const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
router.use('/', homeRoutes)
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    console.log('working');
    res.send({message: 'its working'})
})

module.exports = router;
