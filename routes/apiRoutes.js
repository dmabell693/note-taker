const path = require("path");
const fs = require("fs");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function (req, res) {
        let newNote = req.body;

        newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
        console.log(newNote.id);

        fs.readFile(path.join(__dirname, "../db/db.json"), function (error, data) {
            if (error) {
                return console.log(error);
            }
            let notes = JSON.parse(data);

            console.log(notes);

            notes.push(newNote);

            console.log(notes);

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), function (err) {
                if (err) {
                    console.log(err);
                }
                res.json(notes);
            });

        });

    });

    app.delete("/api/notes/:id", function(req, res) {
        let chosen = req.params.id;
        console.log(chosen);

        fs.readFile(path.join(__dirname, "../db/db.json"), function (error, data) {
            if (error) {
                return console.log(error);
            }
            let notes = JSON.parse(data);

            console.log(notes.length);

            let newNotes = notes.filter(note => note.id !== chosen);

            console.log(newNotes);

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes), function (err) {
                if (err) {
                    console.log(err);
                }
                res.json(newNotes);
            });

        });
    })

}