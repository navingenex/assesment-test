import { Injectable } from '@angular/core';
import { Seats, Row } from '../model/seats';

@Injectable()
export class BookSeats {
    totalVacantSeat = 0;
    vacantSeatRows = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
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
            return -1;
        }
        row[availableRowindex] = this.reserveSeats(row[availableRowindex], noofseat, availableRowindex);
        this.vacantSeatRows[availableRowindex] = row[availableRowindex].vacantSeat;
        console.log(this.vacantSeatRows);
        return availableRowindex;
    }

    // helper function to check available seats and return row index
    availabeSeats(row: Row[], noofseat: number) {
        let index = 0;
        let maxVacantRow = Math.max.apply(0, this.vacantSeatRows);
        console.log(maxVacantRow, +'' + this.totalVacantSeat);
        if (this.getTotalVacantSeat(row) < Number(noofseat)) {
            return -1;
        }
        for (let i = 0; i < row.length; i++) {
            if ((row[i].bookedSeat === 0 && Number(noofseat) === 7) || (row[i].vacantSeat >= Number(noofseat))) {
                index = i;
                break;
            } else {
                index = -1;
            }
        }

        return index;
    }

    // resrving seats
    reserveSeats(row: any, noofseats: number, index) {
        const pos = row.bookedSeat;
        // if full row is empty then reserve ticket
        if (Number(noofseats) === row.row.length) {
            for (let i = 0; i < Number(noofseats); i++) {
                if (row.row[i].status === false) {
                    row.row[i].status = true;
                    row.bookedSeat = Number(noofseats);
                }
            }
            // if (index === 11) {
            //     row.vacantSeat = 0;
            // }
            row.vacantSeat = 0;
        }
        // if input seat is less or equal to vacantseat in a row
        else if (Number(noofseats) <= row.vacantSeat) {
            for (let i = row.bookedSeat; i < row.bookedSeat + Number(noofseats); i++) {
                if (row.row[i].status === false) {
                    row.row[i].status = true;
                }
            }
            row.bookedSeat = row.bookedSeat + Number(noofseats);
            if (index === 11) {
                row.vacantSeat = 3 - row.bookedSeat;
            } else {
                row.vacantSeat = 7 - row.bookedSeat;
            }

        }
        row.pos = pos;

        return row;
    }



}
