import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Users } from '../../models/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: Users[];
  constructor(
    private router: Router
  ) {
    this.users = JSON.parse(localStorage.getItem('Users') || '{}');
    //this.login = this.users[0].estado;
  }

  ngOnInit(): void {
  }

  iniciarSesion(login: HTMLInputElement, password: HTMLInputElement) {
    this.crearUser();    
    if (login.value == this.users[0].login) {
      if (password.value == this.users[0].password) {
        this.users = [
          { login: login.value, password: password.value, estado: true }
        ];
        localStorage.setItem('Users', JSON.stringify(this.users));
        this.router.navigateByUrl('/book-list');
      }
      else {
        alert("Contraseña incorrecta");
      }
    }
    else {
      alert("Email incorrecto");
    }

  }
  crearUser() {
    if (localStorage.getItem('Users') === null) {
      this.users = [
        { login: "admin@email.com", password: "1234", estado: false }
      ];
      localStorage.setItem('Users', JSON.stringify(this.users));
      //console.log("NullUser");

    } else {
      if (this.users.length == 0) {
        this.users = [
          { login: "admin@email.com", password: "1234", estado: false }
        ];
        localStorage.setItem('Users', JSON.stringify(this.users));
        //console.log("0User");
      }
      else {
        this.users = JSON.parse(localStorage.getItem('Users') || '{}');
      }
    }

  }
}

