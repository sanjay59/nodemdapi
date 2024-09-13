const express = require("express");


const app = express();
app.use(express.json());
const Profile = require("./app/models/Profile.js");

require("./db.js");
require("./routes/api.js")(app)


 
app.get('/', (req, res) => { 
    res.send('Hello, Azure! This is a Node.js application.'); 
  });

app.get('*', (req, res) => {
    res.send("Something wrong!");
})

let PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`Server is running on port `+PORT);
})