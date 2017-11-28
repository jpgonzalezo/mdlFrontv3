import { Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LibroListService} from '../book-list/services/newBook-list.service';
import {Libro} from '../book-list/models/book.model';
import { CartService } from 'app/common/cart/services/cart.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
/*
import { CartService } from '../cart/service/cart.service';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";*/

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})

export class DetailBookComponent implements OnInit,OnDestroy {
  id:number;
  private sub:any;
  libros: Libro[];
  libroID: Libro;
  logueado: boolean;
  cont:number;
  

  constructor(private route: ActivatedRoute,private _libroListService: LibroListService, private _cartService: CartService){}

  public buscarLibro(elemento:Libro[]){
    elemento.forEach(element => {
      if(element.id==this.id){
        this.libroID=element;
      }   
    });
  }
  ngOnInit() {
    this.sub=this.route.params.subscribe(
      params=>{
        this.id=+params['id'];
        console.log(this.id);
      }
    );
    this._libroListService.getAll().subscribe(
      (data: Libro[])=>{this.libros=data;this.buscarLibro(this.libros);console.log(this.libroID);},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );
    this.logueado=this.ocultar();  
  }

  public addProductToCart(product: Libro): void {
    console.log(product);
    this._cartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Libro): void {
    this._cartService.addItem(product, -1);
  }

  public productInCart(product: Libro): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this._cartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.productId === product.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
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

  public recargar(){
    
    if(this.cont==1){
      location.reload(true);
      this.cont=0;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
