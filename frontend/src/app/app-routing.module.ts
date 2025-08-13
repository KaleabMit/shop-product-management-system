import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AboutComponent } from './about/about.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: DeliveryComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'payment-status/', component: PaymentStatusComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  
  {path:'main',component:MainComponent,
    children:[
      {path:'',redirectTo:'posts',pathMatch:'full'},
      {path:'dashboard',component:DashboardComponent},
      {path:'posts',
        children:[
          // {path:'',component:PostComponent},
          {path:'category',component:CategoryComponent},
          // {path:'categories',component:CategoryComponent},
          // {path:'create',component:NewPostComponent},
          // {path:'edit/:id',component:EditPostComponent},
          {path:'**',redirectTo:'',pathMatch:'full'}
        ]
      }
    ]
  },
  
  // {path:'**',pathMatch:'full',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
