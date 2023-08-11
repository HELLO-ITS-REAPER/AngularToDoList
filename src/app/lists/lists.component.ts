import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Task } from '../taskList';
import { TaskListService } from '../task-list.service';
import { TaskList } from '../taskList';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [TaskListService]
})
export class ListsComponent implements OnInit {
  taskFormGroups: FormGroup[] = [];
  taskLists: TaskList[] = [];
  filteredTaskLists: TaskList[] = [];
  searchInput: string = '';

  constructor(public taskListService: TaskListService, public apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.apiService.getToDoLists().subscribe(
      (data: TaskList[]) => {
        this.taskLists = data;
        this.filteredTaskLists = this.taskLists.slice();

        for (const taskList of this.taskLists) {
          const formGroup = this.formBuilder.group({
            description: '',
            dueDate: new Date(),
            completed: false
          });
          this.taskFormGroups.push(formGroup);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  createTask(listId: number) {
    const newTask: Task = {
      id: 0,
      description: this.taskFormGroups[listId - 1].value.description,
      dueDate: this.taskFormGroups[listId - 1].value.dueDate,
      completed: this.taskFormGroups[listId - 1].value.completed
    };

    this.apiService.createTask(listId, newTask).subscribe(
      () => {
        console.log('Task created successfully');
        // Find the task list
        const taskList = this.taskLists.find(list => list.id === listId);
        // Add the new task to the task list
        if (taskList) {
          taskList.tasks.push(newTask);
        }
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
    // Reset the fields
    this.taskFormGroups[listId - 1].reset({
      description: '',
      dueDate: new Date(),
      completed: false
    });
  }

  deleteTask(listId: number, taskId: number) {
    this.apiService.deleteTask(listId, taskId).subscribe(
      () => {
        console.log('Task deleted successfully');
        // Find the task list
        const taskList = this.taskLists.find(list => list.id === listId);
        if (taskList) {
          // Find the index of the deleted task within the taskList
          const deletedTaskIndex = taskList.tasks.findIndex(task => task.id === taskId);
          if (deletedTaskIndex !== -1) {
            // Remove the deleted task from the taskList's tasks array
            taskList.tasks.splice(deletedTaskIndex, 1);
          }
        }
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  searchFilter(): void {
    if (this.searchInput) {
      this.filteredTaskLists = this.taskLists.map(taskList => ({
        ...taskList,
        tasks: taskList.tasks.filter(task =>
          task.description.toLowerCase().includes(this.searchInput.toLowerCase())
        )
      }));
    } else {
      this.filteredTaskLists = this.taskLists.slice();
    }
  }

  title = 'My lists';
}
