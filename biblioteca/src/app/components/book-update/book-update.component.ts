import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';

import { BookService } from '../../services/book.service';
import { Users } from '../../models/Users';

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
  users: Users[];
  login: boolean;
  email: string;  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public bookService: BookService
  ) {
    this.users = JSON.parse(localStorage.getItem('Users') || '{}');
    this.login = this.users[0]?.estado;
    this.email = this.users[0]?.login;
    this.validarUser();
    this.route.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      //console.log("Id por actualizar: " + this.id);
      this.validarLibro();
      this.titulo = this.bookService.getBook(this.id)?.titulo;
      this.autor = this.bookService.getBook(this.id)?.autor;
      this.isbn = this.bookService.getBook(this.id)?.isbn;
      this.numPag = this.bookService.getBook(this.id)?.numPag;
      this.editorial = this.bookService.getBook(this.id)?.editorial;
      this.fechaPub = this.bookService.getBook(this.id)?.fechaPub;
      this.fechaReg = this.bookService.getBook(this.id)?.fechaReg;
      //console.log("fechaReg", this.fechaReg);
    })
  }

  ngOnInit(): void {
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

  validarLibro(){
    if(this.bookService.getBook(this.id)==null){
      alert("El libro no existe");
      this.router.navigateByUrl('/book-list');
    }
  }

  updateBook(editTitulo: HTMLInputElement, editAutor: HTMLInputElement,
    editIsbn: HTMLInputElement, editNumPag: HTMLInputElement,
    editEditorial: HTMLInputElement, editFechaPub: HTMLInputElement) {
    //console.log("Actualizando", editTitulo.value, editAutor.value);
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
    alert("Información actualizada");
    this.router.navigateByUrl('/book-list');
    return false;
  }

  cancel() {
    this.router.navigateByUrl('/book-list');
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
