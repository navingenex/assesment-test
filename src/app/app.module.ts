import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookTickeComponent } from './components/book-ticke/book-ticke.component';
import { BookSeats } from './services/book-seats';


@NgModule({
  declarations: [
    AppComponent,
    BookTickeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [BookSeats],
  bootstrap: [AppComponent]
})
export class AppModule { }
