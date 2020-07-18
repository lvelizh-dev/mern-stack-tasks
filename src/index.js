const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { cassandra } = require('./database');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/personas', require('./routes/persona.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
//Static files
// console.log(__dirname + '/public');
//el path.join hace que no tengamos problemas con / o \ para la ruta sea 
//en el SO Windows o Linux o el que sea

 app.use(express.static(path.join(__dirname, 'public')));
//Start server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})