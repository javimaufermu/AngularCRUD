import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from './models/Users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'biblioteca';  
  constructor() {
  }
  ngOnInit(): void {
  }

}
