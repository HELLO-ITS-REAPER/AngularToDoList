import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskList } from '../taskList';
import { TaskListService } from '../task-list.service'; // Import the service

@Component({
  selector: 'app-detailed-task',
  templateUrl: './detailed-task.component.html',
  styleUrls: ['./detailed-task.component.css']
})
export class DetailedTaskComponent implements OnInit {
  task: Task = {
    id: 0,
    description: '',
    dueDate: new Date(),
    completed: false
  }; // Initialize with an empty object

  constructor(
    private route: ActivatedRoute,
    private taskListService: TaskListService // Inject the service
  ) {}

  ngOnInit(): void {
    const listIdParam = this.route.snapshot.paramMap.get('listId');
    const taskIdParam = this.route.snapshot.paramMap.get('taskId');

    if (listIdParam !== null && taskIdParam !== null) {
      const listId = +listIdParam;
      const taskId = +taskIdParam;

      const foundTask = this.taskListService.getTaskById(listId, taskId);
      if (foundTask) {
        this.task = foundTask;
      } else {
        // Handle the case where the task is not found
      }
    } else {
      // Handle the case where the parameters are null
    }
  }
}
