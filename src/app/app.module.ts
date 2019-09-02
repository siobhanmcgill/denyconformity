import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostsComponent} from './posts/posts.component';
import {ReadPostComponent} from './read-post/read-post.component';
import { PostSummaryComponent } from './post-summary/post-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { PostBookComponent } from './post-book/post-book.component';


@NgModule({
  declarations: [AppComponent, PostsComponent, ReadPostComponent, PostSummaryComponent, PostBookComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
