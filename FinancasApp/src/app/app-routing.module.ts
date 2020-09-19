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
import { UserPhotoUploadComponent } from './pages/users/user-photo-upload/user-photo-upload.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { CategoryCreateComponent } from './pages/category/category-create/category-create.component';
import { CategoryDeleteComponent } from './pages/category/category-delete/category-delete.component';
import { CategoryDetailComponent } from './pages/category/category-detail/category-detail.component';
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component';

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
      { path: 'photo', component: UserPhotoUploadComponent },
    ],
  },
  {
    path: 'category',
    canActivate: [AuthService],
    children: [
      { path: '', component: CategoryListComponent },
      { path: 'create', component: CategoryCreateComponent },
      { path: 'edit', component: CategoryEditComponent },
      { path: 'delete', component: CategoryDeleteComponent },
      { path: 'details', component: CategoryDetailComponent },
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
