import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LISTS, Task, TaskList } from './taskList';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private taskLists: TaskList[] = [];
  private taskListSubject: BehaviorSubject<TaskList[]> = new BehaviorSubject<TaskList[]>([]);
  constructor() {
    this.taskLists = LISTS;
    this.taskListSubject.next(this.taskLists);
  }

  getTaskById(listId: number, taskId: number): Task | undefined {
    const taskList = this.taskLists.find(list => list.id === listId);
    if (taskList) {
      return taskList.tasks.find(task => task.id === taskId);
    }
    return undefined; // List or task not found
  }

  getAllTaskLists(): TaskList[] {
    return LISTS;
  }

  // task-list.service.ts
  getListIdForTask(taskId: number): number | undefined {
    for (const taskList of this.taskLists) {
      const task = taskList.tasks.find(task => task.id === taskId);
      if (task) {
        return taskList.id;
      }
    }
    return undefined; // Task not found
  }

  addTaskList(newTaskList: TaskList): void {
    this.taskLists.push(newTaskList);
  }

  updateTaskList(updatedTaskList: TaskList): void {
    const taskListIndex = this.taskLists.findIndex((taskList) => taskList.id === updatedTaskList.id);
    if (taskListIndex !== -1) {
      this.taskLists[taskListIndex] = updatedTaskList;
    }
  }

  updateTask(taskListId: number, updatedTask: Task): void {
    const taskList = this.taskLists.find((taskList) => taskList.id === taskListId);
    if (taskList) {
      const taskIndex = taskList.tasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        taskList.tasks[taskIndex] = updatedTask;
      }
      else {
        taskList.tasks[taskIndex].completed = updatedTask.completed = false;
      }
    }
    this.taskListSubject.next(this.taskLists); // Notify subscribers about the change
  }

  deleteTaskList(taskListId: number): void {
    this.taskLists = this.taskLists.filter((taskList) => taskList.id !== taskListId);
  }

  deleteTask(taskListId: number, taskId: number): void {
    const taskListIndex = this.taskLists.findIndex((taskList) => taskList.id === taskListId);
    if (taskListIndex !== -1) {
      const taskIndex = this.taskLists[taskListIndex].tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        this.taskLists[taskListIndex].tasks.splice(taskIndex, 1);
        this.taskListSubject.next(this.taskLists); // Notify subscribers about the change
      }
    }
    console.log('Delete task with ID:', taskId, 'from list with ID:', taskListId);
  }

  addTaskToList(taskListId: number, newTask: Task): void {
    const taskList = this.taskLists.find((taskList) => taskList.id === taskListId);
    if (taskList) {
      taskList.tasks.push(newTask);
    }
  }
}
