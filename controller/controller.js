const Note = require('../model/note')


async function createNewNote(req, res) {
    const { title, description } = req.body;
    try {
        if (!title || !description) {
            if (!title) {
                return res.status(400).json({ message: "title is required" });
            }
            else if (!description) return res.status(400).json({ message: "description is required" })

            else if (!title && !description) return res.status(400).json({ message: "Both fileds are required" });
        }
        
        const newNote = await Note.create({
            title: title,
            description: description,
            createdBy: req.user._id,
        });
        newNote.save();
        return res.redirect('/users');

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function updateTheNote(req, res) {
    try {
        const { id } = req.params;
        const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
        if (!id) {
            return res.status(400).json("Note Does Not exist");
        }
        return res.redirect('/users');
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ createdBy: req.user._id});
        if (!notes) {
            return res.status(400).json("Please Do add the notes");
        }
        return res.render("allNotes", {
            notes
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function deleteANote(req,res)
{
    const {id} = req.params;
    try {
        if(!id) return res.status(400).json("Note Does Not Exist");
        const note = await Note.findByIdAndDelete(id)
        if (!note) return res.status(404).json("Note Not Found");
        return res.redirect('/users');
    } catch (error) {
        return res.send({message : error.message})
    }
}

async function getANote(req, res) {
    const {id} = req.params;
    try {
        if(!id) return res.status(400).json("Note does not exist");
        const note = await Note.findById(id);
        return res.render("editNote", {note});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


module.exports = {
    createNewNote,
    updateTheNote,
    getAllNotes,
    deleteANote,
    getANote
}