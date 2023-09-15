'use strict';


const mongoose = require('mongoose');
const Task = mongoose.model('Tasks'); // Define the model name as 'Task' (singular) assuming you have a 'tasks' collection in your MongoDB


exports.list_all_tasks = async function (req, res) {
  try {
    const tasks = await Task.find().exec();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.create_a_task = async function (req, res) {
  const new_task = new Task(req.body);

  try {
    const task = await new_task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.read_a_task = async function (req, res) {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.update_a_task = async function (req, res) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true }).exec();
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.delete_a_task = async function (req, res) {
  try {
    await Task.findByIdAndRemove(req.params.taskId).exec();
    res.json({ message: 'Task successfully deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};