import { Component, OnInit } from '@angular/core';
import {Libro} from './model/bestSeller.model';
import {BestSellerListService} from './service/bestSeller-list.service';
import { NgxCarousel } from 'ngx-carousel';
import {Router} from '@angular/router';
import { CartService } from 'app/common/cart/services/cart.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})

export class BestSellerComponent implements OnInit {
  libros: Array<Libro>;
  router: Router;
  public carouselTile: NgxCarousel;
  public carouselTileItems: Array<Libro>;
  logueado: boolean;
  constructor(private _libroListService: BestSellerListService, router: Router, private _cartService: CartService) { 
    this.router=router;}

  ngOnInit() {
    this._libroListService.getAll().subscribe(
      (data: Libro[])=>{this.libros=data;},
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
    };
    this.logueado=this.ocultar();
  }
  public carouselTileLoad(evt: any) {
    const len = this.libros.length;
    console.log(len);
    for (let i = 0; i < len ; i++) {
    }
  }
  public goToBookDetail(id :number){
    this.router.navigate(['/detail',id]);
  }
  public ocultar(){
    if(sessionStorage.getItem('email')===null){
      console.log("hay un logueado");
      return false;
    }
    else{
      console.log("no hay logueado");
      return true;
    }
  }

  public addProductToCart(product: Libro): void {
    this._cartService.addItem(product, 1);
  }
}
