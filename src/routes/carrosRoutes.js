import express from "express";
import { getAllCarros, getCarrosById, createCarros, deleteCarro, updateCarro } from "../controllers/carrosControllers.js"


const router = express.Router();

router.get("/", getAllCarros);
router.get("/:id", getCarrosById);
router.post("/", createCarros);
router.delete("/:id", deleteCarro);
router.put("/:id", updateCarro);


export default router;