export class Seats {
    seatno: number;
    status: boolean;

    constructor(a, b) {
        this.seatno = a;
        this.status = b;
    }
}

export class Row {
    row: Seats[];
    bookedSeat: number;
    vacantSeat: number;
    pos: number;
    constructor(row, bookedseat) {
        this.row = row;
        this.bookedSeat = bookedseat;
        this.vacantSeat = 7;
        this.pos = 0;
    }
}
