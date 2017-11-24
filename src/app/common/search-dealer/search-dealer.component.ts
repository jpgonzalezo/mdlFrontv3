import { Component, OnInit } from '@angular/core';
import {Region} from './model/region.model';
import {RegionListService} from './service/region-list.service';
import {Dealer} from '../dealer-destacados-list/model/dealer.model';
import {DealerListService} from '../dealer-destacados-list/service/dealer-list.service';
import { Http, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-dealer',
  templateUrl: './search-dealer.component.html',
  styleUrls: ['./search-dealer.component.css']
})
export class SearchDealerComponent implements OnInit {
  router: Router;
  
  regiones: Array<Region>;
  dealers: Array<Dealer>;
  constructor(private _regionListService: RegionListService,private _dealerListService: DealerListService, private _http:Http, router: Router) { this.router=router;}

  ngOnInit() {
    this.getAllDealer();
    this._regionListService.getAll().subscribe(
      (data: Region[])=>{this.regiones=data;},
      err=>{console.error();},
      ()=>{console.log('regiones obtenidos exitosamente');}
    );
  }

  getAllDealer(){

    this._dealerListService.getAll().subscribe(
      (data: Dealer[])=>{this.dealers=data;},
      err=>{console.error();},
      ()=>{console.log('dealers obtenidos exitosamente');}
    );
  }

  searchRegion(region: Region){
    const url=`http://localhost:8000/dealers/region/${region.id}`;
    console.log("click region");
    const headers= new Headers({'Content-Type':'aplication/json'});
    const options= new RequestOptions({headers:headers});
    return this._http.get(url,options).map((response)=> {console.log(response); return response.json()}).subscribe(
    (data: Dealer[])=>{this.dealers=data;console.log(data);},
    err=>{console.error();},
    ()=>{console.log("filtro genero listo");}
    );
  }
  public goToBookDetail(id :number){
    this.router.navigate(['/detail',id]);
  }

}
