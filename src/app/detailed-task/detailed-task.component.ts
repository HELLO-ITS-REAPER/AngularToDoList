import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../taskList';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-detailed-task',
  templateUrl: './detailed-task.component.html',
  styleUrls: ['./detailed-task.component.css']
})
export class DetailedTaskComponent implements OnInit {
  task: Task | undefined;
  originalTask: Task | undefined;
  editing: boolean = false;

  constructor(private route: ActivatedRoute, private taskListService: TaskListService) {}

  ngOnInit(): void {
    const listIdParam = this.route.snapshot.paramMap.get('listId');
    const taskIdParam = this.route.snapshot.paramMap.get('taskId');

    if (listIdParam !== null && taskIdParam !== null) {
      const listId = +listIdParam;
      const taskId = +taskIdParam;

      const foundTask = this.taskListService.getTaskById(listId, taskId);
      if (foundTask) {
        this.task = foundTask;
        this.originalTask = { ...foundTask };
      }
    }
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    if (this.editing) {
      this.originalTask = { ...this.task! };
    }
  }

  saveChanges(): void {
    if (this.task) {
      const listId = this.taskListService.getListIdForTask(this.task.id!);
      if (listId !== undefined) {
        this.taskListService.updateTask(listId, this.task);
        this.toggleEdit();
      } else {
        // Handle the case where the task is not found in any list
      }
    }
  }

  cancelEdit(): void {
    if (this.originalTask) {
      this.task = { ...this.originalTask };
    }
    this.toggleEdit();
  }
}
