import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Task, TaskList } from './taskList';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7253/api';

  constructor(private http: HttpClient) { }

  getToDoLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.baseUrl}/ToDoList`);
  }

  deleteTask(listId: number, taskId: number): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/${listId}/task/${taskId}`;
    return this.http.delete(url, { observe: 'response' }).pipe(
      catchError((error: any) => {
        console.error('Error deleting task:', error);
        console.log('Status code:', error.status);
        throw error;
      })
    );
  }

  createTask(listId: number, newTask: Task): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/ToDoList/${listId}`;
    return this.http.post(url, newTask, { observe: 'response' }).pipe(
      catchError((error: any) => {
        console.error('Error creating task:', error);
        console.log('Status code:', error.status);
        throw error;
      })
    );
  }  
}
