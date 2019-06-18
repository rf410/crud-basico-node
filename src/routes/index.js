const express = require('express');
const router = express.Router();
const task = require('../models/task');

router.get('/', async (req, res) => {
    const tareas = await task.find();
    res.render('index',{
        tareas
    });
});

router.post('/add', async (req, res) => {
    const tarea = new task(req.body);
    await tarea.save();
    res.redirect('/');
});

router.get('/hecho/:id', async (req, res) => {
    const { id } = req.params;
    const tarea = await task.findById(id);
    tarea.status = !tarea.status;
    await tarea.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const tarea = await task.findById(id);
    res.render('edit', {
        tarea
    });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await task.updateOne({_id: id}, req.body);
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await task.deleteOne({_id: id});
    res.redirect('/');
});

module.exports = router;