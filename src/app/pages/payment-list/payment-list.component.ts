import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  paymentList = [];
  constructor(private paymentService: PaymentService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.paymentService.listPayment().subscribe(
      (s: []) => {
        this.spinner.hide();
        this.paymentList = s;
      },
      (e) => {
        this.spinner.hide();
      });
  }

}
