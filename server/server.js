const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/auth'));
app.use('/protected', require('./routes/protected'));

app.listen(PORT, () => console.log(`Auth server running on port ${ PORT }`));
