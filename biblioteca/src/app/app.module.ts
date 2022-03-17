import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookComponent } from './components/book/book.component';

import { BookService } from './services/book.service';
import { BookUpdateComponent } from './components/book-update/book-update.component';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,    
    BookListComponent,
    BookFormComponent,
    BookComponent,
    BookUpdateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
