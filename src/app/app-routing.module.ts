import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';
import {POST_PREFIX} from './shared/const';

/**
 * Legacy routes:
 *
 * /content/:type > ignore
 *
 * /about > post 427
 * /about/comments > post 427
 *
 * /post/:id
 * /post/:id/[next|prev]
 * /post/:id/comments
 *
 * /id/:id > /post/:id
 * /cid/:cid > ignore
 *
 * /tags
 * /tags/:tag
 * /tags/:tag/page/:page
 *
 * /page/:page
 *
 * /post/:id/gallery
 *
 *
 * legacy query strings:
 * id
 * cid
 * tags
 * page
 * raw
 * srch
 * search
 * com
 */

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
  },
  {
    path: 'posts/:id',
    component: PostListComponent,
  },
  {
    // For functionality including next / prev or comments, and book, or gallery
    // modes.
    path: 'posts/:id/:command',
    component: PostListComponent,
  },
  {
    path: 'about',
    redirectTo: POST_PREFIX + '/about-denyconformitycom',
  },
  {
    // Legacy URLs from the 2012 version of the site.
    path: 'post/:id',
    redirectTo: POST_PREFIX + '/:id',
    pathMatch: 'full',
  },
  {
    path: 'post/:id/:command',
    redirectTo: POST_PREFIX + '/:id/:command',
    pathMatch: 'full',
  },
  {
    path: 'id/:id',
    redirectTo: POST_PREFIX + '/:id',
    pathMatch: 'full',
  },
  {
    // For a hot minute I considered p instead of posts.
    path: 'p/:id',
    redirectTo: POST_PREFIX + '/:id',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: POST_PREFIX,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
