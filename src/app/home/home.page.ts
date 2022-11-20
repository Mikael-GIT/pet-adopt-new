import { Animal } from './../item-details/animal.model';
import { LocalStorageService } from './../services/local-storage.service';
import { Categoria } from './categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];


  dataDisatnce: any;
  id: string = "0";

  userCep = '';

  categoria: Categoria;

  categorias = [
    {
      id: '',
      nome: '',
      imagem: '',
      animais: [
        {
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
          categoria_id: ''
        }
      ]
    }
  ];

  animais = [
    {
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
      distancia: '',
      categoria_id: ''
    }
  ];

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
      distancia: '',
      categoria_id: ''
  }

  constructor(
    private router: Router,
    private data: DataService,
    private homeService: HomeService, 
    private activatedRoute: ActivatedRoute, 
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {

    this.animais = [];

    this.homeService.getDistance().subscribe(data =>{
      this.dataDisatnce = data.value
      console.log(this.data)
    }
    );

    this.homeService.readCategorias().subscribe(categorias => {
      this.categorias = categorias;
      console.log(this.categorias);
    });


    this.homeService.readCategoria("1", this.userCep).subscribe(categoria => {
      categoria.animais.forEach(animal => this.animais.push(animal));
      console.log(this.animais);
    });
;

    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
  }

  showPetInfo(animal: Animal){
    console.log(animal)
    this.localStorageService.set('distance', animal.distancia);
    this.router.navigate([`item-details/${animal.id}`]);
  }

  changeCategory(categoria: Categoria){
    this.animais = [];
    this.homeService.readCategoria(categoria.id, this.userCep).subscribe(categoria => {
      categoria.animais.forEach(animal => this.animais.push(animal));
    });;
  }
}
