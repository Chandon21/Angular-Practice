import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnDestroy {

  @Output() numberEmitted = new EventEmitter<number>();
  intervalRef: any;
  currentNumber = 0;

  startGame() {
    this.intervalRef = setInterval(() => {
      this.currentNumber++;
      this.numberEmitted.emit(this.currentNumber);
    }, 1000); // emits every second
  }

  stopGame() {
    clearInterval(this.intervalRef);
  }

  ngOnDestroy() {
    clearInterval(this.intervalRef);
  }
}
