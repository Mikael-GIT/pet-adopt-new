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



  id: string;

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
      categoria_id: ''
    }
  ];

  constructor(
    private router: Router,
    private data: DataService,
    private homeService: HomeService, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categorias = [];
    this.animais = [];

    this.homeService.readCategoria().subscribe(categorias => {
      this.categorias = categorias;
      console.log(this.categorias);
    });

    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
  }

  showPetInfo(id: string){
    this.router.navigate([`item-details/2`]);
  }
}
