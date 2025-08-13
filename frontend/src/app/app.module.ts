import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductEditComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    DeliveryComponent,
    DashboardComponent,
    CategoryComponent,
    CheckoutComponent,
    PaymentStatusComponent,
    ReceiptComponent,
    SignupComponent,
    LoginComponent,
    MainComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule ,
    ToastModule,
     MatDialogModule,
    MatButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
