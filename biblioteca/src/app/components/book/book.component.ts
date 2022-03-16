import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from "../../services/book.service";
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {  
  id: any;
  titulo: any;
  autor: any;
  isbn: any;
  numPag: any;
  editorial: any;
  fechaPub: any;
  fechaReg: any;
  fechaTab: any;
  year: any;
  month: any;
  day: any;
  hour: any;
  //books: Book[];
  //book: Book;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public bookService: BookService
  ) {
    //this.books = [];    
    this.route.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      console.log("Id por mostrar: " + this.id);      
      //this.book=this.bookService.getBook(this.id);
      this.titulo = this.bookService.getBook(this.id)?.titulo;
      this.autor = this.bookService.getBook(this.id)?.autor;
      this.isbn = this.bookService.getBook(this.id)?.isbn;
      this.numPag = this.bookService.getBook(this.id)?.numPag;
      this.editorial = this.bookService.getBook(this.id)?.editorial;
      this.fechaPub = this.bookService.getBook(this.id)?.fechaPub;
      this.fechaReg = this.bookService.getBook(this.id)?.fechaReg;      
      this.fechaTab = new Date(this.fechaReg);
      this.year = this.fechaTab.getFullYear();
      this.month = this.fechaTab.getMonth()+1;
      this.day = this.fechaTab.getDate();    
      this.hour = this.fechaTab.getHours().toString() + ":" + this.fechaTab.getMinutes().toString();
      console.log("Año:",this.year," mes: ",this.month," dia: ",this.day);
      console.log("Hora: ", this.hour);
      
      //console.log("getBook",this.bookService.getBook(this.id)?.titulo);      
    })
  }

  ngOnInit(): void {
    //this.books = this.bookService.getBooks();

  }

  cancel(){
    this.router.navigateByUrl('/book-list');
  }
  
}
