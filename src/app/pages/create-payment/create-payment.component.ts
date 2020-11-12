import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/core/services/payment.service';
@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {

  createPaymentForm = new FormGroup({
    creditCardNumber: new FormControl('', [Validators.required, Validators.pattern(/^(([0-9]{4})\-([0-9]{4})\-([0-9]{4})\-([0-9]{4}))$/)]),
    cardholder: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{4,20}$/)]),
    expirationDate: new FormControl('', [Validators.required, this.expDateValidator]),
    securityCode: new FormControl('', [Validators.pattern(/^[0-9]{3}$/)]),
    amount: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(
    private paymentService: PaymentService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }


  canShowError(control: string) {
    let field = this.createPaymentForm.controls[control];
    return !field.valid && field.touched && field.dirty;
  }

  hasError(control: string, error: string) {
    return this.createPaymentForm.controls[control].hasError(error);
  }

  getValue(control: string) {
    return this.createPaymentForm.controls[control].value;
  }

  getFormData() {
    return {
      creditCardNumber: this.getValue("creditCardNumber").replace('-',''),
      cardholder: this.getValue("cardholder"),
      expirationDate: this.getValue("expirationDate"),
      securityCode: this.getValue("securityCode"),
      amount: this.getValue("amount")
    };
  }

  expDateValidator(control: FormControl) {
    if (control.value) {
      let date = moment(control.value);

      if (!moment(date).isAfter(moment())) {
        return {
          expDate: {
            futureDate: false
          }
        }
      }
    }

    return null;
  }

  onSubmit() {
    const data = this.getFormData();
    this.spinner.show();

    this.paymentService.createPayment(data).subscribe(
      (s) => {
        this.toastr.success('Payment is created');
        this.spinner.hide();
        this.createPaymentForm.reset();
      },
      (e) => {
        this.toastr.success('Payment creation failed ');
        this.spinner.hide();
      }
    );
  }
}
