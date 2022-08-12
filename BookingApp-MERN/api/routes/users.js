import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("you logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("you user logged in");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("you admin logged in");
// });

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET_ALL
router.get("/", verifyAdmin, getUsers);

export default router;
