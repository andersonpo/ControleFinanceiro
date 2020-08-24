import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { UserDeleteComponent } from './pages/users/user-delete/user-delete.component';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthService] },
  {
    path: 'components',
    component: TestPageComponent,
    canActivate: [AuthService],
  },
  {
    path: 'user',
    canActivate: [AuthService],
    children: [
      { path: '', component: UserListComponent },
      { path: 'create', component: UserCreateComponent },
      { path: 'edit', component: UserEditComponent },
      { path: 'delete', component: UserDeleteComponent },
      { path: 'details', component: UserDetailComponent },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
