import { Component, OnInit } from '@angular/core';
import { Seats, Row } from '../../model/seats';
import { BookSeats } from '../../services/book-seats';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-book-ticke',
  templateUrl: './book-ticke.component.html',
  styleUrls: ['./book-ticke.component.css']
})
export class BookTickeComponent implements OnInit {
  seat: Seats[] = [];
  row: Row[] = [];
  bookedRow = 0;
  message = '';
  seatStartPos: number;
  noOfSeats: number;
  constructor(
    private bookSeatsService: BookSeats,
    private flashMessage: FlashMessagesService
  ) {
    this.row = this.bookSeatsService.initCoach();
  }
  ngOnInit() {
  }

  bookSeat() {

    if (this.bookSeatsService.validateInput(this.noOfSeats) === false) {
      this.flashMessage.show('Please input valid no of seats', { cssClass: 'alert-danger lead', timeout: 3000 });
      this.noOfSeats = null;
    } else {
      this.message = '';
      this.bookedRow = this.bookSeatsService.bookSeats(this.row, this.noOfSeats);
      if (this.bookedRow === -1) {
        this.flashMessage.show('Required seats exceeds available seats!', { cssClass: 'alert-danger lead', timeout: 3000 });
      }
      this.noOfSeats = null;
      this.seat = [];
      // this.seat = this.row[this.bookedRow].row;
      this.flashMessage.show('Seats booked successfully', { cssClass: 'alert-success lead', timeout: 3000 });
      for (let i = this.row[this.bookedRow].pos; i < this.row[this.bookedRow].row.length; i++) {
        this.seat.push(this.row[this.bookedRow].row[i]);
      }
    }

  }

}
