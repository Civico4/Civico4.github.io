//fetch database

let db;

fetch('./assets/db.json')
  .then(response => response.json())
  .then(data => {
    db = data;
    console.log(data); // Work with the imported JSON data
    console.log(db); 
  })
  .catch(error => console.error('Error loading JSON:', error));
