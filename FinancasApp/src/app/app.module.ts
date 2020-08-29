import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { EntityModule } from './pages/entity/entity.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { ResizeService } from './services/resize.service';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { UserDeleteComponent } from './pages/users/user-delete/user-delete.component';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TestPageComponent,
    NotFoundComponent,
    UserListComponent,
    UserEditComponent,
    UserDeleteComponent,
    UserDetailComponent,
    UserCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    EntityModule,
  ],
  providers: [
    AuthService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    ResizeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
