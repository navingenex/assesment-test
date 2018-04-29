import { Injectable } from '@angular/core';
import { Seats, Row } from '../model/seats';

@Injectable()
export class BookSeats {
    totalVacantSeat = 0;
    constructor() { }

    public initCoach() {
        let rows: Row[] = [];
        let seats: Seats[] = [];
        let seatno = 1;
        for (let i = 0; i < 12; i++) {
            if (i === 11) {
                for (let j = 0; j < 3; j++) {
                    const seat = new Seats(seatno++, false);
                    seats.push(seat);
                }
            } else {
                for (let j = 0; j < 7; j++) {
                    const seat = new Seats(seatno++, false);
                    seats.push(seat);
                }
            }
            const row = new Row(seats, 0);
            rows.push(row);
            seats = [];
        }
        rows[11].vacantSeat = 3;
        return rows;
    }
    // Total vacant seat
    getTotalVacantSeat(row: Row[]): number {
        this.totalVacantSeat = 0;
        for (let i = 0; i < row.length; i++) {
            this.totalVacantSeat = this.totalVacantSeat + row[i].vacantSeat;
        }
        return this.totalVacantSeat;
    }

    // booking seats
    bookSeats(row: Row[], noofseat: number) {
        let availableRowindex = 0;
        availableRowindex = this.availabeSeats(row, noofseat);
        if (availableRowindex < 0) {
            console.log('no seats are available');
            return false;
        }
        row[availableRowindex] = this.reserveSeats(row[availableRowindex], noofseat);
    }

    // helper function to check available seats and return row index
    availabeSeats(row: Row[], noofseat: number) {
        let index = 0;
        if (this.getTotalVacantSeat(row) < Number(noofseat)) {
            return -1;
        }
        for (let i = 0; i < row.length; i++) {
            if ((row[i].bookedSeat === 0 && Number(noofseat) === 7) || (row[i].vacantSeat >= Number(noofseat))) {
                index = i;
                break;
            }
            // else if (row[i].bookedSeat === noofseat) {
            //     index = i;
            // }
        }
        return index;
    }

    // resrving seats
    reserveSeats(row: any, noofseats: number) {
        // if full row is empty then reserve ticket
        if (Number(noofseats) <= 7) {
            for (let i = 0; i < Number(noofseats); i++) {
                if (row.row[i].status === false) {
                    row.row[i].status = true;
                    row.bookedSeat = Number(noofseats);
                    row.vacantSeat = 7 - Number(noofseats);
                }
            }
        }
        // if input seat is less or equal to vacantseat in a row
        if (Number(noofseats) <= row.vacantSeat) {
            for (let i = row.bookedSeat; i < row.bookedSeat + Number(noofseats); i++) {
                if (row.row[i].status === false) {
                    row.row[i].status = true;
                }
            }
            row.bookedSeat = row.bookedSeat + Number(noofseats);
            row.vacantSeat = 7 - row.bookedSeat;
        }


        return row;
    }



}
