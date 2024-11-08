import { BookController } from "../controllers/book.controller";
import { authMiddleware } from "../middleware/auth";
import { Router } from "express";

const router = Router();
const bookController = new BookController();

router.post("/", authMiddleware, bookController.addBook);
router.get("/", authMiddleware, bookController.getAllBooks);
router.get("/:id", authMiddleware, bookController.getBookById);
router.patch("/:id", authMiddleware, bookController.modifyBook);
router.delete("/:id", authMiddleware, bookController.removeBook);

export default router;
