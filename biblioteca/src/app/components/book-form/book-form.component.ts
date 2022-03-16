import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public bookService: BookService
  ) { }

  ngOnInit(): void {
  }

  addBook(nuevoTitulo: HTMLInputElement, nuevoAutor:HTMLInputElement,
    nuevoIsbn: HTMLInputElement, nuevoNumPag:HTMLInputElement,
    nuevoEditorial: HTMLInputElement, nuevoFechaPub:HTMLInputElement
    ){
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
    nuevoTitulo.value="";
    nuevoAutor.value="";
    nuevoIsbn.value="";
    nuevoNumPag.value="";
    nuevoEditorial.value="";
    nuevoFechaPub.value="";
    this.router.navigateByUrl('/book-list');
    return false;
  }
  
  cancel(){
    this.router.navigateByUrl('/book-list');
  }
}
