import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})

export class CheckoutPage {

  get nome() {
    return this.registrationForm.get('nome');
  }

  public errorMessages = {
    nome: [
        {type: 'required', message: 'Digite seu nome'},
        {type: 'maxlength', message: 'Nome não pode passar de 50 Caracteres'}
    ]
  };

  registrationForm = this.formBuilder.group ({
    nome: ['',[Validators.required, Validators.maxLength(5)]],

  });


  constructor(private formBuilder: FormBuilder) {}
  public submit() {
    console.log(this.registrationForm.value);
}
}
