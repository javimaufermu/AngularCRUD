import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from "../../services/book.service";
import { Book } from '../../models/Book';
import { Users } from '../../models/Users';

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
  min: any;
  users: Users[];
  login: boolean;  
  email: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public bookService: BookService
  ) {
    //this.books = [];    
    this.users = JSON.parse(localStorage.getItem('Users') || '{}');
    this.login = this.users[0]?.estado;
    this.email = this.users[0]?.login;
    this.validarUser();
    this.route.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      //console.log("Id por mostrar: " + this.id);      
      //this.book=this.bookService.getBook(this.id);
      this.validarLibro();
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
      this.min = this.fechaTab.getMinutes().toString();
      if(this.min<10){
        this.min = "0" + this.min;
      }
      this.hour = this.fechaTab.getHours().toString() + ":" + this.min;
      //console.log("Año:",this.year," mes: ",this.month," dia: ",this.day);
      //console.log("Hora: ", this.hour);
            
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

  cancel(){
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
