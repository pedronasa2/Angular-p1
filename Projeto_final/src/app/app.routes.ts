import { Routes } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { Agenda } from './pages/agenda/agenda';
import {Formulario} from './pages/formulario/formulario';
import { Perfil } from './pages/perfil/perfil';
import {CidadeComponent} from './pages/cidade/cidade.component';


export const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },


  {
    path: 'agenda',
    component: Agenda,

  },
  {
    path: 'agenda/perfil/:id',
    component: Perfil,

  },
  {
    path: 'agenda/formulario',
    component: Formulario,

  },
  {
    path: 'cidades',
    component: CidadeComponent,

  },
  {
    path: 'agenda/formulario/:id',
    component: Formulario,

  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
