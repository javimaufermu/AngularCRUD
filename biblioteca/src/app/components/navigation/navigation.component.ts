import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registrarLibro(){
    this.router.navigateByUrl('/book-form');
  }

  gestionarLibro(){
    this.router.navigateByUrl('/book-list');
  }



}
