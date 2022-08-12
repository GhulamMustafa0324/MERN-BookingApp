import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

//CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }, //push mongodb ka h aur ye roomid hum hotel k db me set kr rhe hn
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      {
        "roomNumbers._id": req.params.id,
      },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json("Room status has been updated");
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params._id }, //pull b mongodb ka h aur ye delete krdega HOTEL k db mese b room ko
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Deleted");
  } catch (err) {
    next(err);
  }
};

//GET
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

//GET_ALL
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
