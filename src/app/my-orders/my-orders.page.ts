import { Payment } from './payment.model';
import { AdoptionService } from './../favorite/adoptions.service';
import { User } from './../checkout/user.model';
import { Profile } from './../profile/profile.model';
import { LocalStorageService } from './../services/local-storage.service';
import { ProfileService } from './../profile/profile.service';
import { PaymentService } from './payment.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  payment = {
    transactionAmount: 0,
    description: '',
    payer: {
      firstName: '',
      lastName: '',
      email: '',
      identification: {
        type: '',
        number: ''
      }
    }
  };

  constructor(private paymentService: PaymentService, private adoptionService: AdoptionService, private localStorageService: LocalStorageService, private domSanitizer: DomSanitizer) { }

  userData: User = null;

  paymentResponse: Payment = new Payment;

  ngOnInit() {
  }

  doar(){
    this.paymentService.pay(this.payment, this.localStorageService.get('user_id')).subscribe(payment => {
      this.paymentResponse = payment;
      this.paymentResponse.qrCodeBase64 = `data:image/png;base64,${payment.qrCodeBase64}`;
    });
  }

}
