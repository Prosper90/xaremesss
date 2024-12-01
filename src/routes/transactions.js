import { Router } from "express";
import TransactionController from "../../src/controllers/TransactionController.js";

const router = Router();

// Destructure the controller
const { getUserTransactions } = TransactionController;

// Define user-related routes
router.get("/user-transactions", getUserTransactions);


export default router;
