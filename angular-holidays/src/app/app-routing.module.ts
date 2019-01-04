import { LoginComponent } from './login/login.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HolidayDetailComponent } from './holiday-detail/holiday-detail.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HolidayDetailComponent },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
