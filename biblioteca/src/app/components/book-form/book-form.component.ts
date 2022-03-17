import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Users } from '../../models/Users';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
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

  addBook(nuevoTitulo: HTMLInputElement, nuevoAutor: HTMLInputElement,
    nuevoIsbn: HTMLInputElement, nuevoNumPag: HTMLInputElement,
    nuevoEditorial: HTMLInputElement, nuevoFechaPub: HTMLInputElement
  ) {
    console.log("Agregando", nuevoTitulo.value, nuevoAutor.value);
    this.bookService.addBook({
      id: this.bookService.giveId(),
      titulo: nuevoTitulo.value,
      autor: nuevoAutor.value,
      isbn: nuevoIsbn.value,
      numPag: parseInt(nuevoNumPag.value),
      editorial: nuevoEditorial.value,
      fechaPub: parseInt(nuevoFechaPub.value),
      fechaReg: new Date()
    });
    nuevoTitulo.value = "";
    nuevoAutor.value = "";
    nuevoIsbn.value = "";
    nuevoNumPag.value = "";
    nuevoEditorial.value = "";
    nuevoFechaPub.value = "";
    alert("Libro registrado");
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
