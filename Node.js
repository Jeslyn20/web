const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/checkout', (req, res) => {
    const { name, phone, address, payment } = req.body;
    console.log(`Name: ${name}, Phone: ${phone}, Address: ${address}, Payment: ${payment}`);
    res.send('Checkout successful!');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
