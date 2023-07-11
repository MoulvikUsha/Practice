import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { HighChartsComponent } from './high-charts/high-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsComponent,
    FilterPipe,
    EmptyRouteComponent,
    HighChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
