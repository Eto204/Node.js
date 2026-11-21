const express = require('express');
const app = express();
const morgan = require('morgan');

// Routes
const user = require('./routes/user');
const empleados = require('./routes/empleados');

// Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

// Front: http://localhost:3000
app.use(express.static('front'));

app.get('/api', index);

app.use("/user", user);
app.use(auth);
app.use("/empleados", empleados);
app.use(notFound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
