import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntrospectionViewComponent } from './introspection-view/introspection-view.component';
import { HttpClientModule } from '@angular/common/http';
import { SchemaTypeComponent } from './schema-type/schema-type.component';
@NgModule({
  declarations: [AppComponent, IntrospectionViewComponent, SchemaTypeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
