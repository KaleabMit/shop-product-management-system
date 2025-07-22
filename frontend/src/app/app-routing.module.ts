import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AboutComponent } from './about/about.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  { path: '', component: ProductFormComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'about', component: AboutComponent },
  { path: 'delivery', component: DeliveryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
