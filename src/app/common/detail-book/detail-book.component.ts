import { Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LibroListService} from '../book-list/services/newBook-list.service';
import {Libro} from '../book-list/models/book.model';
import { CartService } from 'app/common/cart/services/cart.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

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
  }

  public addProductToCart(product: Libro): void {
    this._cartService.addItem(product, 1);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
