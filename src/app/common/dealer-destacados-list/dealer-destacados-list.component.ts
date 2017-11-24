import { Component, OnInit } from '@angular/core';
import {Dealer} from './model/dealer.model';
import {DealerListService} from './service/dealer-list.service';
import { NgxCarousel } from 'ngx-carousel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dealer-destacados-list',
  templateUrl: './dealer-destacados-list.component.html',
  styleUrls: ['./dealer-destacados-list.component.css']
})
export class DealerDestacadosListComponent implements OnInit {
  dealers: Array<Dealer>;
  router: Router;
  public carouselTile: NgxCarousel;
  constructor(private _dealerListService: DealerListService, router: Router) { 
    this.router=router;
  }
  ngOnInit() {
    this._dealerListService.getAll().subscribe(
      (data: Dealer[])=>{this.dealers=data;},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );
    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      interval: 4000,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }

  public carouselTileLoad(evt: any) {
    const len = this.dealers.length;
    console.log(len);
    for (let i = 0; i < len ; i++) {
    }
  }
  public goToBookDetail(id :number){
    this.router.navigate(['/detailDealer',id]);
  }

}
