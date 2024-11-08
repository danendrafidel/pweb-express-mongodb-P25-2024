import type { NextFunction, Request, Response } from "express";
import BookService from "../services/book.service";

export class BookController {
  async addBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await BookService.addBook(req.body);
      res.status(201).json(book);
      return;
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
    }
  }

  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await BookService.getAllBooks();
      res.json(books);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const book = await BookService.getBookById(req.params.id);
      if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
      }
      res.json(book);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async modifyBook(req: Request, res: Response) {
    try {
      const book = await BookService.modifyBook(req.params.id, req.body);
      res.json(book);
    } catch (error: any) {
      if (error.message.includes("Invalid book ID format")) {
        res.status(400).json({ message: error.message });
      } else if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async removeBook(req: Request, res: Response) {
    try {
      const book = await BookService.removeBook(req.params.id);
      res.json({ message: "Book deleted successfully", book });
    } catch (error: any) {
      if (error.message.includes("Invalid book ID format")) {
        res.status(400).json({ message: error.message });
      } else if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
