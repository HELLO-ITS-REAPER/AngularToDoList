import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: 'Lists', component: ListsComponent },
  { path: '', redirectTo: '/Lists', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
