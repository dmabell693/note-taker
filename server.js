// dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// route paths
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// start the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});