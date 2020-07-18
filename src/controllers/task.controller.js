const express = require('express');
const client = require('../database');
const cassandra = require('cassandra-driver');
const Mapper = cassandra.mapping.Mapper;

const mapper = new Mapper(client, {models:{ 'prueba': { tables: ['task']}} 
});
const taskMapper = mapper.forModel('prueba');

const taskController = {};


taskController.getTasks = async (req, res) => {

const query = 'SELECT * FROM task';
console.log(query);
const tasks = await client.execute(query, {prepare:true});
// const tasks = await taskMapper.get({id: 2});
console.log(tasks.rows);
res.json(tasks.rows)
};

taskController.getTaskByID = async (req, res) => {
    const id = req.params.id;
    const task = await taskMapper.get({id});
    res.json(task);
};


taskController.postTask = async (req, res) => {
    console.log(req.body);
    const { title, description } = req.body;
    const task = {title, description};
    // const query = `insert into Task (id, nombre) values (${Task.id}, '${Task.nombre}')`;
    const query = `insert into task(id, title, description) values (now(), '${task.title}', '${task.description}')`;
    console.log(query);
    await client.execute(query);
    res.json({status: 'task saved'});
};

taskController.putTask = async (req, res) => {
    const {title, description } = req.body;
    const newTask = { title, description };
    var id = req.params.id;
    await taskMapper.update({ id , title, description});

    console.log(req.params.id);
    res.json('Task updated!');
};

taskController.deleteTask = async (req, res) => {
    const id = req.params.id;
    await taskMapper.remove({id});
    res.json({status: 'Task deleted!'});
};


module.exports = taskController;