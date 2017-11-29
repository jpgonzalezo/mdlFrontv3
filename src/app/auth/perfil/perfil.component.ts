import { Component, OnInit , OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Dealer} from '../../common/dealer-destacados-list/model/dealer.model';
import {Editorial} from '../../common/editorial-list/model/editorial.model';
import {DealerListService} from '../../common/dealer-destacados-list/service/dealer-list.service';
import {EditorialListService} from '../../common/editorial-list/service/editorial-list.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  id:number;
  tipo: number;
  dealer: Dealer;
  editorial: Editorial;
  editoriales: Array<Editorial>;
  dealers: Array<Dealer>;
  private sub:any;
  constructor(private route: ActivatedRoute,
              private _editorialListService: EditorialListService,
              private _dealerListService: DealerListService) { }

  public buscarEditorial(elemento:Editorial[]){
    if(this.tipo==1){
      elemento.forEach(element => {
        if(element.id==this.id){
          this.editorial=element;
        }   
      });
    }
  }

  public buscarDealer(elemento:Dealer[]){
    if(this.tipo==0){
      elemento.forEach(element => {
        if(element.id==this.id){
          this.dealer=element;
        }   
      });
    }
  }

  ngOnInit() {
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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }




}
