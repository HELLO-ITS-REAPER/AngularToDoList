import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LISTS, Task } from '../taskList';
import { TaskListService } from '../task-list.service';
import { TaskList } from '../taskList';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [TaskListService] // Maybe remove later
})
export class ListsComponent {
  taskLists: TaskList[] = [];

  constructor(public taskListService: TaskListService) { }

  ngOnInit(): void {
    this.taskLists = this.taskListService.getAllTaskLists();
  }

  title = 'My lists';
}
