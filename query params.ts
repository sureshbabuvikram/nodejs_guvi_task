const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  // Access query parameters
  const { name, age } = req.query;

  // Use query parameters in API logic
  // For example, filter users based on name and age
  let users = getUsers();

  if (name) {
    users = users.filter(user => user.name.includes(name));
  }

  if (age) {
    users = users.filter(user => user.age === parseInt(age));
  }

  // Send the filtered users as the API response
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


//React code
const axios = require('axios');

axios.get('http://localhost:3000/api/users', {
  params: {
    name: 'John',
    age: 30
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
