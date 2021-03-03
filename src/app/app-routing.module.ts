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
 * /post/:slug
 * /post/:slug/[next|prev]
 * /post/:slug/comments
 *
 * /id/:slug > /post/:slug
 * /cid/:cid > ignore
 *
 * /tags
 * /tags/:tag
 * /tags/:tag/page/:page
 *
 * /page/:page
 *
 * /post/:slug/gallery
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
    path: 'posts/:slug',
    component: PostListComponent,
  },
  {
    // For functionality including next / prev or comments, and book, or gallery
    // modes.
    path: 'posts/:slug/:command',
    component: PostListComponent,
  },
  {
    // Show a list of the posts for a series.
    path: 'series/:seriesSlug',
    component: PostListComponent,
  },
  {
    path: 'about',
    redirectTo: POST_PREFIX + '/about-denyconformitycom',
  },
  {
    // Legacy URLs from the 2012 version of the site.
    path: 'post/:slug',
    redirectTo: POST_PREFIX + '/:slug',
    pathMatch: 'full',
  },
  {
    path: 'post/:slug/:command',
    redirectTo: POST_PREFIX + '/:slug/:command',
    pathMatch: 'full',
  },
  {
    path: 'id/:slug',
    redirectTo: POST_PREFIX + '/:slug',
    pathMatch: 'full',
  },
  {
    // For a hot minute I considered p instead of posts.
    path: 'p/:slug',
    redirectTo: POST_PREFIX + '/:slug',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: POST_PREFIX,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
