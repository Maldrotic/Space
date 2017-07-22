import express from 'express';

import Universe from '../controllers/universe.js';

let router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/seed', (req, res) => {
    
    res.send('Base - Test');
})

export default router;