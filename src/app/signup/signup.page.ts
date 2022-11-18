import { Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from './../services/local-storage.service';
import { Router } from '@angular/router';
import { Cadastro } from './cadastro.model';
import { CadastroService } from './cadastro.service';
import { LoginService } from './../login/login.service';
import { NavController, ToastController } from '@ionic/angular';
import { UtilService } from './../util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  zipCodePresent = false;

  cadastroDados: Cadastro = {
    login: '',
    senha: '',
    email: '',
    telefone: '',
    nome: ''

  };

  endereco = {
    cep: '',
	  state: '',
	  city: '',
	  neighborhood: '',
	  street: '',
    service: '',
    location: {
      type: '',
      coordinates: {
        longitude: '',
        latitude: ''
      }
    }
  }


  public errorMessages = {
    nome: [
      {type: 'required', message: 'Digite seu nome'},
      {type: 'maxlength', message: 'Nome não pode passar de 50 Caracteres'}
    ],
    telefone: [
      {type: 'required', message: 'Digite seu telefone'},
      {type: 'minlength', message: 'Telefone inválido'}
    ],
    email: [
      {type: 'required', message: 'Digite seu email'}
    ],
    senha: [
      {type: 'required', message: 'Digite sua senha'},
      {type: 'maxlength', message: 'Senha não pode ser maior que 30 digitos'}
    ],
    cep: [
      {type: 'required', message: 'Digite seu cep'},
      {type: 'maxlength', message: 'Senha não pode ser maior que 80 digitos'}
    ],
    rua: [
      {type: 'required', message: 'Digite sua rua'},
      {type: 'maxlength', message: 'Senha não pode ser maior que 80 digitos'}
    ],
    numero: [
      {type: 'required', message: 'Digite o numero'},
      {type: 'maxlength', message: 'Senha não pode ser maior que 80 digitos'}
    ],
    bairro: [
      {type: 'required', message: 'Digite seu bairro'},
      {type: 'maxlength', message: 'Senha não pode ser maior que 80 digitos'}
    ],
    cidade: [
      {type: 'required', message: 'Digite a cidade'},
      {type: 'maxlength', message: 'Senha não pode ser maior que 80 digitos'}
    ],
    complemento: [
      {type: 'required', message: 'Digite o complemento'},
      {type: 'maxlength', message: 'Senha não pode ser maior que 80 digitos'}
    ],
  };

  
  get nome() {
    return this.registrationForm.get('nome');
  }

  get telefone() {
    return this.registrationForm.get('telefone');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get senha() {
    return this.registrationForm.get('senha');
  }

  get cep() {
    return this.registrationForm.get('cep');
  }

  get rua() {
    return this.registrationForm.get('rua');
  }
  get numero() {
    return this.registrationForm.get('numero');
  }
  get bairro() {
    return this.registrationForm.get('bairro');
  }
  get cidade() {
    return this.registrationForm.get('cidade');
  }
  get complemento() {
    return this.registrationForm.get('complemento');
  }



  
  registrationForm = this.formBuilder.group ({
    nome: ['',[Validators.required, Validators.maxLength(50)]],
    telefone: ['',[Validators.required, Validators.minLength(11)]],
    email: ['',[Validators.required]],
    senha: ['',[Validators.required]],
    cep: ['',[Validators.required, Validators.maxLength(80)]],
    rua: ['',[Validators.required, Validators.maxLength(80)]],
    numero: ['',[Validators.required, Validators.maxLength(80)]],
    bairro: ['',[Validators.required, Validators.maxLength(80)]],
    cidade: ['',[Validators.required, Validators.maxLength(80)]],
    complemento: ['',[Validators.required, Validators.maxLength(80)]],
    
  });

  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private cadastroService: CadastroService,
    private toastController: ToastController,
    private router: Router,
    private serviceLS: LocalStorageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }


  cadastrar(){
    console.log(this.registrationForm.value);
    this.cadastroService.create(this.registrationForm.value).subscribe(
      (result) => {
        if (result.id != null) {
          this.serviceLS.set("user_id", result.id);
          this.presentToast('top', "Cadastro realizado com sucesso!");
          this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
        }
      },
      (error) => {
        this.presentToast('bottom',error.error.message);
      }
    );
  }



  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      cssClass: 'toast-custom-class',
    });

    await toast.present();
  }

  findCep(cep: string){
    cep.replace("-", "");
    if(cep.length == 8){
      this.cadastroService.findCep(cep).subscribe((result) => {
        if (result.neighborhood != null) {
          this.zipCodePresent = true;
          this.registrationForm.get('rua').setValue(result.street);
          this.registrationForm.get('bairro').setValue(result.neighborhood);
          this.registrationForm.get('cidade').setValue(result.city);
        }
      },
      (error) => {
        this.presentToast('middle', "CEP Inválido");
      });
      
      console.log(this.endereco)
    }
  }

}
