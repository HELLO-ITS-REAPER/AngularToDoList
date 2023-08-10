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
  
  

  addTask(listId: number) {
    const latestTaskId = this.taskListService.getLatestTaskId(listId);

    const taskToAdd: Task = {
      id: latestTaskId + 1,
      description: this.taskFormGroups[listId - 1].value.description,
      dueDate: this.taskFormGroups[listId - 1].value.dueDate,
      completed: this.taskFormGroups[listId - 1].value.completed
    };

    this.taskListService.addTaskToList(listId, taskToAdd);

    this.taskFormGroups[listId - 1].reset({
      description: '',
      dueDate: new Date(),
      completed: false
    });
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
