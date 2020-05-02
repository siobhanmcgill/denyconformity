import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';



const routes: Routes = [
  {
    path: 'p',
    component: PostListComponent,
  },
  {
    path: 'p/:id',
    component: PostListComponent,
  },
  {
    path: '',
    redirectTo: '/p',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
