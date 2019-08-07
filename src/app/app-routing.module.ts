import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';


const routes: Routes = [
  {
    path: 'p',
    component: PostsComponent,
  },
  {
    path: 'p/:id',
    component: PostsComponent,
  },
  {
    path: '',
    redirectTo: '/p',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
