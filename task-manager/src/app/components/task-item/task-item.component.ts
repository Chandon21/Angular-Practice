import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  ngOnInit() {
    console.log('Task initialized:', this.task.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Task changed:', changes);
  }

  ngOnDestroy() {
    console.log('Task destroyed:', this.task.name);
  }
}
