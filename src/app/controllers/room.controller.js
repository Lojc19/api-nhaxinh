const Room = require("../models/room.model");
const roomService = require("../services/room.service")
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");

const jwt = require("jsonwebtoken");

// register User 
const createRoom = asyncHandler(async (req, res) => {
  const data = await roomService.createRoom(req.body)
  res.json({
    status:"success",
    data
  })
});

const getaRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await roomService.getaRoom(id);
  res.json({
    status: "success",
    data
  })
});

const getallRoom = asyncHandler(async (req, res) => {
  const data = await roomService.getallRoom();
  res.json({
    status: "success",
    data
  })
});

const updateRoom = asyncHandler(async (req, res) => {
  const data = await roomService.updateRoom(req);
  res.json({
    status: "success",
    data,
    message: "Update thành công"
  })
});

const deleteRoom = asyncHandler(async (req, res) => {
  const data = await roomService.deleteRoom(req);
  res.json({
    status: "success",
    message: "Xóa thành công"
  })
});

module.exports = {createRoom, getaRoom, getallRoom, updateRoom, deleteRoom};