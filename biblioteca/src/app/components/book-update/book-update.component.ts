import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';

import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {
  id: any;
  titulo: any;
  autor: any;
  isbn: any;
  numPag: any;
  editorial: any;
  fechaPub: any;
  fechaReg: any;
  //book: Book;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public bookService: BookService
  ) {
    this.route.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      console.log("Id por actualizar: " + this.id);
      this.titulo = this.bookService.getBook(this.id)?.titulo;
      this.autor = this.bookService.getBook(this.id)?.autor;
      this.isbn = this.bookService.getBook(this.id)?.isbn;
      this.numPag = this.bookService.getBook(this.id)?.numPag;
      this.editorial = this.bookService.getBook(this.id)?.editorial;
      this.fechaPub = this.bookService.getBook(this.id)?.fechaPub;
      this.fechaReg = this.bookService.getBook(this.id)?.fechaReg;
      console.log("fechaReg",this.fechaReg);      
    })
  }

  ngOnInit(): void {   
  }

  updateBook(editTitulo: HTMLInputElement, editAutor: HTMLInputElement, 
    editIsbn: HTMLInputElement, editNumPag: HTMLInputElement, 
    editEditorial: HTMLInputElement, editFechaPub: HTMLInputElement) {
    console.log("Actualizando", editTitulo.value, editAutor.value);
    this.bookService.updateBook({
      id: this.id,
      titulo: editTitulo.value,
      autor: editAutor.value,
      isbn: editIsbn.value,
      numPag: parseInt(editNumPag.value),
      editorial: editEditorial.value,
      fechaPub: parseInt(editFechaPub.value),
      fechaReg: this.fechaReg
    });
    editTitulo.value = "";
    editAutor.value = "";
    editIsbn.value = "";
    editNumPag.value = "";
    editEditorial.value = "";
    editFechaPub.value = "";
    this.router.navigateByUrl('/book-list');
    return false;
  }

  cancel(){
    this.router.navigateByUrl('/book-list');
  }
}
