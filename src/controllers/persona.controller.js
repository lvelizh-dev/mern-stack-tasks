const express = require('express');
const client = require('../database');
const cassandra = require('cassandra-driver');
const Mapper = cassandra.mapping.Mapper;

const mapper = new Mapper(client, {models:{ 'prueba': { tables: ['persona']}} 
});
const personaMapper = mapper.forModel('prueba');

const personaController = {};


personaController.getPersonas = async (req, res) => {

// const query = 'SELECT * FROM persona WHERE id = ?';
const query = 'SELECT * FROM persona';
const tasks = await client.execute(query, {prepare:true});
// const tasks = await personaMapper.get({id: 2});
console.log(tasks.rows);
res.json(tasks.rows)
};

personaController.getPersonaByID = async (req, res) => {
    const id = req.params.id;
    const persona = await personaMapper.get({id});
    res.json(persona);
};


personaController.postPersona = async (req, res) => {
    console.log(req.body);
    const { id, nombre } = req.body;
    const persona = {id, nombre};
    const query = `insert into persona (id, nombre) values (${persona.id}, '${persona.nombre}')`;
    await client.execute(query);
    res.json({status: 'Persona saved'});
};

personaController.putPersona = async (req, res) => {
    const {nombre } = req.body;
    const newPersona = { nombre };
    var id = req.params.id;
    await personaMapper.update({ id , nombre});

    console.log(req.params.id);
    res.json('Persona updated!');
};

personaController.deletePersona = async (req, res) => {
    const id = req.params.id;
    await personaMapper.remove({id});
    res.json({status: 'Persona deleted!'});
};


module.exports = personaController;