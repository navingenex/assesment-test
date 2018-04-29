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
  bookedRow = 0;
  seatStartPos: number;
  noOfSeats: number;
  constructor(private bookSeatsService: BookSeats) {
    this.row = this.bookSeatsService.initCoach();
    console.log(this.row);
  }
  ngOnInit() {
  }

  bookSeat() {
    this.bookedRow = this.bookSeatsService.bookSeats(this.row, this.noOfSeats);
    this.noOfSeats = null;
    this.seat = [];
    // this.seat = this.row[this.bookedRow].row;
    for (let i = this.row[this.bookedRow].pos; i < this.row[this.bookedRow].row.length; i++) {
      this.seat.push(this.row[this.bookedRow].row[i]);
      console.log(i);
    }
    console.log(this.row);
  }

}
