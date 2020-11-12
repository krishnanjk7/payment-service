import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePaymentComponent } from './pages/create-payment/create-payment.component';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';


const routes: Routes = [
  // {
  //   path:'', redirectTo:'create-payment', pathMatch:'full'
  // },
  {
    path:'create-payment', component: CreatePaymentComponent
  },
  {
    path:'list-payment', component: PaymentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
