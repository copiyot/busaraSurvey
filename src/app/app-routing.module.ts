import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SurveyComponent } from './components/models/survey/survey.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './shared/route-guards/auth-guard.service';

const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'register', component: RegisterComponent
    },
     {
        path: 'login', component: LoginComponent
    },
    {
        path: 'home', component: HomeComponent,
        children: [
            {
                path: 'survey', component: SurveyComponent, canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: '**', redirectTo: 'home', pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
