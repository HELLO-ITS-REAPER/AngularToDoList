import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from './taskList';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7253/api';

  constructor(private http: HttpClient) { }

  getToDoLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.baseUrl}/ToDoList`);
  }
}
