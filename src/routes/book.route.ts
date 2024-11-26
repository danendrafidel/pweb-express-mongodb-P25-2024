import { BookController } from "../controllers/book.controller";
import { authMiddleware } from "../middleware/auth";
import { Router } from "express";

const router = Router();
const bookController = new BookController();

router.post("/", bookController.addBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.patch("/:id", bookController.modifyBook);
router.delete("/:id", bookController.removeBook);

export default router;
