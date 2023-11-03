const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5500;
const cors = require('cors');


app.use(express.json());
app.use(cors());

//This will be the path to your json file containing user info
const jsonFilePath = path.join(".\\", 'user_data.json');

//Register backend code
app.post('/backend/api/register', (req, res) => {
    const formData = req.body;
  
    // Load existing data from the JSON file
    let jsonData = [];
    try {
      const data = fs.readFileSync(jsonFilePath, 'utf8');
      jsonData = JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  
      // Check if the username already exists
      const existingUser = jsonData.find((user) => user.username === formData.username);
      if (existingUser) {
          return res.status(400).json({ error: 'Username already exists...' });
      }
  
    // Add the new registration data
    jsonData.push(formData);
  
    // Save the updated data back to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData), 'utf8');
  
  res.sendStatus(200);
  });


  //LOGIN API
app.post('/backend/api/login', (req, res) => {
    const { username, password } = req.body;
  
    // Load existing data from the JSON file
    let jsonData = [];
    try {
      const data = fs.readFileSync(jsonFilePath, 'utf8');
      jsonData = JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  
    // Find the user with the provided username
    const user = jsonData.find((user) => user.username === username);
  
    if (!user || user.password !== password) {
      // User not found or password doesn't match
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // Login successful
    res.sendStatus(200);
});

//READ JSON DATA
app.get('/backend/api/data', (req, res) => {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading data.json');
      }
  
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });
  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
  });
