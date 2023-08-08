import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ListsComponent } from './lists/lists.component';
import { FormsModule } from '@angular/forms';
import { DetailedTaskComponent } from './detailed-task/detailed-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListsComponent,
    DetailedTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
