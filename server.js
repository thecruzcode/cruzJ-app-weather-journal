require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8000;
const app = express();

const projectData = {};

// MIDDLE-WARE
// Configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initalize the main project folder
app.use(express.static('website'));

app.get('/api/v1/entry', (req, res) => {
  res.json(projectData);
});

app.post('/api/v1/entry', (req, res) => {
  const { temperature, date, feeling } = req.body;
  Object.assign(projectData, {
    temperature: `${temperature}°C`,
    date,
    feeling
  });

  res.status(201).json(projectData);
});

//SETUP SERVER
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
