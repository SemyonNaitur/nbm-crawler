import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MaterialModule } from './material/material.module';

import { SiteSelectionComponent } from './components/site-selection/site-selection.component';
import { LinksTableComponent } from './components/links-table/links-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteSelectionComponent,
    LinksTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }