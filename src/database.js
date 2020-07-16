const cassandra = require('cassandra-driver');
// var async = require('async');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'prueba'});

client.connect()
.then(db => console.log('DB Cassandra is connected'))
.catch(err => console.log(err));

module.exports = client;

// cliente.connect(function (err) {
//     assert.ifError(err);
// });



// const mongoose = require('mongoose');

// const URI = 'mongodb://localhost/mern-tasks';

// mongoose.connect(URI)
// .then(db => console.log('DB is connected'))
// .catch(err => console.error(err));

// module.exports = mongoose;











// const cassandra = require('cassandra-driver');
// var async = require('async');

// var cliente = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'prueba'});

// cliente.connect(function (err) {
//     assert.ifError(err);
// });

// const query = 'SELECT * FROM persona WHERE id = 2';
// cliente.execute(query).then(result => console.log('Persona con nombre %s', result.rows[0].nombre));