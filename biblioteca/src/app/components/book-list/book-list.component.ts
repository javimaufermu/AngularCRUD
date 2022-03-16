import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from "../../services/book.service";
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(
    private router: Router,
    public bookService: BookService) {
    this.books = [];
  }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  updateBook(id: number){
    this.router.navigateByUrl('/book-update/'+id);
  }

  getBook(id: number) {    
    this.router.navigateByUrl('/book/'+id);
  }

  deleteBook(book: Book){
    this.bookService.deleteBook(book);
  }

}
