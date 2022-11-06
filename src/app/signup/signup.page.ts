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
  
  cadastroDados: Cadastro = {
    login: '',
    senha: '',
    email: '',
    telefone: '',
    nome: ''

  };

  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private cadastroService: CadastroService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }


  cadastrar(){
    this.cadastroService.create(this.cadastroDados).subscribe(
      (result) => {
        if (result.id != null) {
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
      position: position
    });

    await toast.present();
  }

}
