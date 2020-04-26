//dependencies
const path = require("path");
const fs = require("fs");

//export
module.exports = function (app) {

    //get request, send db.json file
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    //post request
    app.post("/api/notes", function (req, res) {
        let newNote = req.body;

        //set note id so it can be searched for and deleted according to its id
        newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();

        //read file
        fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
            if (err) {
                console.log(err);
            }
            //store data in array
            let notes = JSON.parse(data);

            //push new note into array
            notes.push(newNote);

            //write file using updated array
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), function (err) {
                if (err) {
                    console.log(err);
                }
                //return updated array
                res.json(notes);
            });

        });

    });

    //delete request
    app.delete("/api/notes/:id", function (req, res) {
        
        //grab id created on line 18
        let chosen = req.params.id;

        //read file and store in array
        fs.readFile(path.join(__dirname, "../db/db.json"), function (error, data) {
            if (error) {
                return console.log(error);
            }
            let notes = JSON.parse(data);

            //filter through array to keep everything except the note with the selected id
            let newNotes = notes.filter(note => note.id !== chosen);

            //write file with filtered array
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes), function (err) {
                if (err) {
                    console.log(err);
                }
                res.json(newNotes);
            });

        });
    });

}