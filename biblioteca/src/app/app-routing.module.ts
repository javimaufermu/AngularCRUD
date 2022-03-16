import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookComponent } from './components/book/book.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';

const routes: Routes = [
  { path: 'book-list', component: BookListComponent},
  { path: '',  redirectTo: 'book-list',  pathMatch: 'full'},
  { path: 'book-form', component: BookFormComponent},
  { path: 'book/:id', component: BookComponent},
  { path: 'book-update/:id', component: BookUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
