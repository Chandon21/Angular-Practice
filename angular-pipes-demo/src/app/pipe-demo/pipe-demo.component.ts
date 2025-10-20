import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-pipe-demo',
  templateUrl: './pipe-demo.component.html',
  styleUrls: ['./pipe-demo.component.css']
})
export class PipeDemoComponent {
  // Built-in pipes
  name = 'Angular';
  price = 1234.567;
  today = new Date();

  // For filter pipe
  searchText = '';
  users = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'David' }
  ];

  // For async pipe
  users$ = of([
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' }
  ]).pipe(delay(2000));
}
