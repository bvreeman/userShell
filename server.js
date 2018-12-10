const express = require("express");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactForm");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

// Define middleware here
app.use('/upload', express.static('upload'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(methodOverride('_method'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
  }
  // Add routes, both API and view
  app.use("/", contactRoutes)

// app.post('/', (req, res) => {

//   res.send();
// })

// app.get('/contactForm/send', (req, res) => {

// })

app.post('/contactForm/send', (req, res) => {
    console.log('does this happen?', req.body)
    res.send();
  })
  
//   app.post('/applicationRoute/send', (req, res) => {
//     // console.log('does this happen application route?', req.body)
//     res.send();
//   })
   
  // If no API routes are hit, send the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build"));
  });
  
  // Start the API server
  app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });