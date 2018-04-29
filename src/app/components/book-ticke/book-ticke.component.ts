import { Component, OnInit } from '@angular/core';
import { Seats, Row } from '../../model/seats';
import { BookSeats } from '../../services/book-seats';


@Component({
  selector: 'app-book-ticke',
  templateUrl: './book-ticke.component.html',
  styleUrls: ['./book-ticke.component.css']
})
export class BookTickeComponent implements OnInit {
  seat: Seats[] = [];
  row: Row[] = [];
  noOfSeats: number;
  constructor(private bookSeatsService: BookSeats) {
    this.row = this.bookSeatsService.initCoach();
    console.log(this.row);
  }
  ngOnInit() {
  }

  bookSeat() {
    this.bookSeatsService.bookSeats(this.row, this.noOfSeats);
    this.noOfSeats = null;
    console.log(this.row);
  }

}
