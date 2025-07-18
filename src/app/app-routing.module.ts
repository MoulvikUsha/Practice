import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsComponent } from './rxjs/rxjs.component';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { HighChartsComponent } from './high-charts/high-charts.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'high-charts',
    pathMatch: 'full'
  },
  {
    path: 'rxjs',
    component: RxjsComponent
  },
  {
    path: 'high-charts',
    component: HighChartsComponent
  },
  {
    path: '**', 
    component: EmptyRouteComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
