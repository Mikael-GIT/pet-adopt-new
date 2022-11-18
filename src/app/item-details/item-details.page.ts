import { LocalStorageService } from './../services/local-storage.service';
import { PetInfoService } from './pet-info.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;

  public id: any;

  distancia = '1 km';

  animal = {
    id: '',
    nome: '',
    sexo: '',
    idade: '',
    vacinado: false,
    porte: '',
    cor: '',
    descricao: '',
    imagem: '',
    raca: '',
    vermifugado: false,
    categoria_id: ''
};

  constructor(
    private animatioCntrl: AnimationController,
    private activatedRoute: ActivatedRoute, 
    private navCtrl: NavController, 
    private petInfoService: PetInfoService,
    private localStorageService: LocalStorageService
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit() {
    this.activeVariation = 'size';
    this.distancia = this.localStorageService.get('distance');
    this.petInfoService.read(this.id).subscribe(animal => {
      console.log(animal)
      this.animal = animal;
    });
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();
    } else {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0.2')
      .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }

}
