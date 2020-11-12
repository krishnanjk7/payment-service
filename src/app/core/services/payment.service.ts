import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePayment } from '../dto/create-payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

constructor(
  private httpClient: HttpClient
) { }

public createPayment(data: CreatePayment){
  return this.httpClient.post('http://localhost:3001/add', data);
}

public listPayment(){
  return this.httpClient.get('http://localhost:3001/list');
}

}
