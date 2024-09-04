const express = require('express')
const router = express.Router();
const { createNewNote, updateTheNote, getAllNotes, deleteANote, getANote} = require("../controller/controller")


router.post('/create/note', createNewNote);
router.put('/update/:id', updateTheNote);
router.get('/', getAllNotes);
router.delete('/remove/:id', deleteANote);
router.get('/note/:id', getANote);
router.get('/new-note', async(req, res)=>{
    return res.render("newnote");
});

module.exports = router;

