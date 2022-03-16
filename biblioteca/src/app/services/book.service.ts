import { Injectable } from '@angular/core';

import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[];
  constructor() {
    this.books = this.getBooks();
  }

  getBooks() {
    if(localStorage.getItem('Books') === null) {
      this.books = [];
    } else {
      this.books = JSON.parse(localStorage.getItem('Books') || '{}');
    }    
    return this.books;
  }

  getBook(id: number){        
    for (let i = 0; i < this.books.length; i++) {            
      if (id == this.books[i].id) {        
        return this.books[i];
        //this.books[i]=book;        
        //localStorage.setItem('Books', JSON.stringify(this.books));
        //break;
      }
    }
    return null;
  }

  giveId(){
    if(localStorage.getItem('Books') === null) {
      return 0;
    } else {
    this.books = JSON.parse(localStorage.getItem('Books') || '{}');
    let latest = this.books.length;
    if(latest==0){
      return 0;
    }
    let idAnt = this.books[latest-1].id;
    var idAsig: number = +idAnt;
    idAsig=idAsig+1;
    //idAsig=parseInt(idAsig);
    console.log(idAsig);
    console.log(idAnt);
    
    return idAsig;
    }
  }

  addBook(book: Book) {
    this.books.push(book);
    let books = [];

    if (localStorage.getItem('Books') === null) {
      books = [];
      books.push(book);
      localStorage.setItem('Books', JSON.stringify(books));
    }
    else {
      books = JSON.parse(localStorage.getItem('Books') || '{}');
      books.push(book);
      localStorage.setItem('Books', JSON.stringify(books));
    }
  }

  updateBook(book: Book){    
    for (let i = 0; i < this.books.length; i++) {
      if (book.id == this.books[i].id) {
        this.books[i]=book;        
        localStorage.setItem('Books', JSON.stringify(this.books));
        break;
      }
    }
  }

  deleteBook(book: Book) {
    for (let i = 0; i < this.books.length; i++) {
      if (book == this.books[i]) {
        this.books.splice(i, 1);
        localStorage.setItem('Books', JSON.stringify(this.books));
        break;
      }
    }
  }
}
