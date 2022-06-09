const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authorRoutes = require('./routes/author_routes');
const clientRoutes = require('./routes/client_routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/author', authorRoutes);
app.use('/client', clientRoutes);

app.listen(port, () => {
    console.log(`Starting Library app - port ${port}`);
});