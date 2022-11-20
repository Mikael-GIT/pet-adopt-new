import { FormBuilder, Validators } from '@angular/forms';
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

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  pixGerado = false;

  presentingElement = null;

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

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService, private localStorageService: LocalStorageService) { }

  userData: User = null;

  paymentResponse: Payment = new Payment;


  get transactionAmount() {
    return this.registrationForm.get('transactionAmount');
  }

  get cpf() {
    return this.registrationForm.get('cpf');
  }

  get description() {
    return this.registrationForm.get('description');
  }

  public errorMessages = {
    transactionAmount: [
      {type: 'required', message: 'Digite o valor da doação'}
    ],
    cpf: [
      {type: 'required', message: 'Digite seu CPF'},
      {type: 'maxlength', message: 'CPF não pode passar de 11 Caracteres'}
    ],
    description: [
      {type: 'required', message: 'Digite a descrição da sua doação'}
    ]
  };

  ngOnInit() {
  this.presentingElement = document.querySelector('.ion-page');

  }
  

  registrationForm = this.formBuilder.group ({
    transactionAmount: ['',[Validators.required]],
    cpf: ['',[Validators.required, Validators.maxLength(11)]],
    description: ['',[Validators.required]]
  });

  doar(){
    this.payment.payer.identification.number = this.registrationForm.get('cpf').value;
    this.payment.description = this.registrationForm.get('description').value;
    this.payment.transactionAmount = this.registrationForm.get('transactionAmount').value;
    this.paymentService.pay(this.payment, this.localStorageService.get('user_id')).subscribe(payment => {
      this.pixGerado = true;
      this.paymentResponse = payment;
      this.paymentResponse.qrCodeBase64 = `data:image/png;base64,${payment.qrCodeBase64}`;
    });
  }

  voltar(){
    this.pixGerado = false;
  }
}
