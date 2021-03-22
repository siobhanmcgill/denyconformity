import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostSeriesComponent} from './post-series/post-series.component';
import {PostComponent} from './post/post.component';
import {CsrfInterceptor} from './services/csrf.interceptor';
import {SharedModule} from './shared/shared.module';
import { ReadPostComponent } from './read-post/read-post.component';
import { PostSurveyComponent } from './post-survey/post-survey.component';



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    PostSeriesComponent,
    ReadPostComponent,
    PostSurveyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions(
        {cookieName: 'csrftoken', headerName: 'X-CSRFToken'}),
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
