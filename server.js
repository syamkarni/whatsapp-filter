const express = require('express');
const path = require('path');
const app = express();

const filterRoute = require('./api/filter');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', filterRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
