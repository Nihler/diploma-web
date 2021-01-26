import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'helpers/auth.guard';
import { DetailsComponent } from './details.component';

const routes: Routes = [
  {path: ':id', component: DetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DetailsRoutingModule{}
