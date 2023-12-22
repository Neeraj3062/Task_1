const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

const fetchData = async () => {
  try {
    const response = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

app.get('/', async (req, res) => {
  try {
    const jsonData = await fetchData();
    const sortedProducts = Object.values(jsonData.products).sort((a, b) => b.popularity - a.popularity)
    res.render('index', { products: { products: sortedProducts } });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
