import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/seed', (req, res) => {
    
    res.send('Base - Test');
})

export default router;