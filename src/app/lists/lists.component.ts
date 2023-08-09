import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LISTS, Task } from '../taskList';
import { TaskListService } from '../task-list.service';
import { TaskList } from '../taskList';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [TaskListService] // Maybe remove later
})
export class ListsComponent {
  taskLists: TaskList[] = [];
  taskFormGroups: FormGroup[] = [];

  constructor(public taskListService: TaskListService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.taskLists = this.taskListService.getAllTaskLists();

    // Initialize form groups for each task list
    for (const taskList of this.taskLists) {
      const formGroup = this.formBuilder.group({
        description: '',
        dueDate: new Date(),
        completed: false
      });
      this.taskFormGroups.push(formGroup);
    }
  }
  
  newTask: Task = { id: 0, description: '', dueDate: new Date(), completed: false };
  
  addTask(listId: number) {
    const latestTaskId = this.taskListService.getLatestTaskId(listId);

    const taskToAdd: Task = {
      id: latestTaskId + 1,
      description: this.taskFormGroups[listId - 1].value.description,
      dueDate: this.taskFormGroups[listId - 1].value.dueDate,
      completed: this.taskFormGroups[listId - 1].value.completed
    };

    this.taskListService.addTaskToList(listId, taskToAdd);

    // Reset the form after adding the task
    this.taskFormGroups[listId - 1].reset({
      description: '',
      dueDate: new Date(),
      completed: false
    });
  }

  title = 'My lists';
}
