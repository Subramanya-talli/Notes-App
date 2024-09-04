const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    },
    {
        timestamps: true
    },
);


const Note = mongoose.model("Notes", NotesSchema);

module.exports = Note;