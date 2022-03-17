import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from "../../services/book.service";
import { Book } from '../../models/Book';
import { Users } from '../../models/Users';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];
  users: Users[];
  login: boolean;
  email: string;
  constructor(
    private router: Router,
    public bookService: BookService) {
    this.books = [];
    this.users = JSON.parse(localStorage.getItem('Users') || '{}');
    this.login = this.users[0]?.estado;
    this.email = this.users[0]?.login;
    this.validarUser();
  }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  validarUser() {
    if (localStorage.getItem('Users') === null) {
      this.router.navigateByUrl('/login');
    } else {
      if (this.users.length == 0) {
        this.router.navigateByUrl('/login');
      }
      else {
        if (this.login == false) {
          this.router.navigateByUrl('/login');
        }
      }
    }
  }

  updateBook(id: number) {
    this.router.navigateByUrl('/book-update/' + id);
  }

  getBook(id: number) {
    this.router.navigateByUrl('/book/' + id);
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book);
  }

  cerrarSesion() {
    this.users = JSON.parse(localStorage.getItem('Users') || '{}');
    this.users = [
      { login: this.users[0].login, password: this.users[0].password, estado: false }
    ];
    localStorage.setItem('Users', JSON.stringify(this.users));
    this.login = false;
    this.router.navigateByUrl('/login');
  }

  registrarLibro() {
    this.router.navigateByUrl('/book-form');
  }

  gestionarLibro() {
    this.router.navigateByUrl('/book-list');
  }

}
