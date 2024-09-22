import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent {
  seats: { number: number; booked: boolean }[] = [];
  bookedSeats: number[] = [];
  requiredSeats: number = 0;

  constructor() {
    this.initializeSeats();
  }
 // Initialize seats with some pre-booked ones
  initializeSeats() {
    for (let i = 1; i <= 80; i++) {
      this.seats.push({ number: i, booked: false });
    }
// Some pre-booked seats
    this.seats[10].booked = true; // Seat 11 booked
    this.seats[15].booked = true; // Seat 16 booked
    this.seats[20].booked = true; // Seat 21 booked
  }
  // Function to book seats based on user input
  bookSeats(requiredSeats: number) {
    if (requiredSeats < 1 || requiredSeats > 7) {
      alert('Please enter a number between 1 and 7.');
      return;
    }
    const availableSeats = this.findAvailableSeats(requiredSeats);
    if (availableSeats.length === 0) {
      alert('Not enough seats available!');
      return;
    }
    availableSeats.forEach(seat => seat.booked = true);
    this.bookedSeats = availableSeats.map(seat => seat.number);
  }
 // Find seats to book based on user requirement
  findAvailableSeats(requiredSeats: number): { number: number; booked: boolean }[] {
    const availableSeats: { number: number; booked: boolean }[] = [];
    for (let i = 0; i < this.seats.length; i++) {
      if (!this.seats[i].booked) {
        availableSeats.push(this.seats[i]);
        if (availableSeats.length === requiredSeats) {
          return availableSeats;
        }
      } else {
        availableSeats.length = 0; // Reset if we hit a booked seat
      }
    }
    return [];
  }
}
