import { Adocao } from './adocao.model';
import { AdoptionService } from './adoptions.service';
import { DataService } from './../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  
  constructor(
    private router: Router,
    private data: DataService,
    private adoptionService: AdoptionService, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

  

    this.adoptionService.getAdoptions("1").subscribe(adoptions => {
    });
  }

}
