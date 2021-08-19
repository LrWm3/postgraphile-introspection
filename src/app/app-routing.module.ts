import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntrospectionViewComponent } from './introspection-view/introspection-view.component';

const routes: Routes = [
  {
    path: ':name',
    component: IntrospectionViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
