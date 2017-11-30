import { Component, OnInit , OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Dealer} from '../../common/dealer-destacados-list/model/dealer.model';
import {Editorial} from '../../common/editorial-list/model/editorial.model';
import {DealerListService} from '../../common/dealer-destacados-list/service/dealer-list.service';
import {EditorialListService} from '../../common/editorial-list/service/editorial-list.service';
import {Libro} from '../../common/book-list/models/book.model';
import {Router} from '@angular/router';


import{Injectable} from '@angular/core';
import{Http,RequestOptions,Headers} from '@angular/http';
import {Config} from '../../config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { CartService } from 'app/common/cart/services/cart.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  url:string;
  router: Router;
  id:number;
  idCatalogo:number;
  tipo: number;
  dealer: Dealer;
  editorial: Editorial;
  editoriales: Array<Editorial>;
  dealers: Array<Dealer>;
  private sub:any;
  libros: Array<Libro>;
  aux:Array<any>;
  isDealer: boolean;
  isEditorial: boolean;
  logueado: boolean;
  constructor(private route: ActivatedRoute,
              private _editorialListService: EditorialListService,
              private _dealerListService: DealerListService,
              private _http: Http,
              router: Router,
              private _cartService: CartService) { this.router=router; }

  public buscarEditorial(elemento:Editorial[]){
    if(this.tipo==1){
      this.isEditorial=true;
      this.isDealer=false;
      elemento.forEach(element => {
        if(element.id==this.id){
          this.idCatalogo=this.id;
          this.editorial=element;
          this.getCatalogo();
        }   
      });
      console.log("editorial perfil");
      console.log(this.editorial)
    }
  }

  public buscarDealer(elemento:Dealer[]){
    if(this.tipo==0){
      this.isEditorial=false;
      this.isDealer=true;
      console.log(this.isDealer);
      elemento.forEach(element => {
        if(element.id==this.id){
          this.idCatalogo=this.id;
          this.dealer=element;
          this.getCatalogo();
        }   
      });
      console.log("dealer perfil");
      console.log(this.dealer);
    }
  }

  public getCatalogo(){
    if(this.isDealer){
      this.url=`http://localhost:8000/dealers/${this.idCatalogo}/catalogo`;
    }
    if(this.isEditorial){
      console.log("url editorial");
      this.url=`http://localhost:8000/libros?editorial_id=${this.idCatalogo}&format=json`;
    }
    console.log(this.url);
    const headers= new Headers({'Content-Type':'aplication/json'});
    const options= new RequestOptions({headers:headers});
    return this._http.get(this.url,options).map((response)=> {console.log("sdaasdasdasdadas"); return response.json()}).subscribe(
    (data: Libro[])=>{this.libros=data;console.log("servicio asigna libro");console.log(this.libros);},
    err=>{console.error();},
    ()=>{console.log("catalogo exitoso");console.log(this.libros);}
    );}

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

  ngOnInit() {
    this.logueado=this.ocultar();
    this.sub=this.route.params.subscribe(
      params=>{
        this.id=+params['id'];
        this.tipo=+params['tipo'];
      }
    );

    this._editorialListService.getAll().subscribe(
      (data: Editorial[])=>{this.editoriales=data;this.buscarEditorial(this.editoriales)},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );

    this._dealerListService.getAll().subscribe(
      (data: Dealer[])=>{this.dealers=data;this.buscarDealer(this.dealers)},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public addProductToCart(product: Libro): void {
    this._cartService.addItem(product, 1);
  }




}
