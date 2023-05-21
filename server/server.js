const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/protected', require('./routes/protected'));

app.listen(PORT, () => console.log(`Auth server running on port ${ PORT }`));
