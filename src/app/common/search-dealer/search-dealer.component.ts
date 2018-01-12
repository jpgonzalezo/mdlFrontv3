import { Component, OnInit } from '@angular/core';
import {Region} from './model/region.model';
import {Ciudad} from '../dealer-destacados-list/model/ciudad.model';
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
  regionActual: number;
  ciudades: Array<Ciudad>;
  dealers: Array<Dealer>;
  constructor(private _regionListService: RegionListService,
              private _dealerListService: DealerListService,
              private _http: Http, router: Router) { this.router = router; }

  ngOnInit() {
    this.getAllDealer();
    this._regionListService.getAll().subscribe(
      (data: Region[]) => {this.regiones = data; },
      err => {console.error(); },
      () => {console.log('regiones obtenidos exitosamente'); }
    );
  }

  getAllDealer() {
    this.ciudades = [];
    this._dealerListService.getAll().subscribe(
      (data: Dealer[]) => {this.dealers = data; },
      err => {console.error(); },
      () => {}
    );
  }

  getAllCiudades(region: Region) {
    const url = `http://localhost:8000/ciudades/region/${region.id}`;
    const headers = new Headers({'Content-Type': 'aplication/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.get(url, options).map((response) => {console.log(response); return response.json(); }).subscribe(
    (data: Ciudad[]) => {this.ciudades = data; console.log(data); },
    err => {console.error(); },
    () => {console.log('filtro ciudad genero listo'); }
    );
  }

  searchRegion(region: Region) {
    this.regionActual = region.id;
    const url = `http://localhost:8000/dealers/region/${region.id}`;
    console.log('click region');
    const headers = new Headers({'Content-Type': 'aplication/json'});
    const options = new RequestOptions({headers: headers});
    this.getAllCiudades(region);
    return this._http.get(url, options).map((response) => {console.log(response); return response.json(); }).subscribe(
    (data: Dealer[]) => {this.dealers = data; console.log(data); },
    err => {console.error(); },
    () => {console.log('filtro region genero listo'); }
    );
  }


  public goToBookDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  onChange(deviceValue) {
    if (deviceValue === 'Ciudad') {
      const url = `http://localhost:8000/dealers/region/${this.regionActual}`;
      const headers = new Headers({'Content-Type': 'aplication/json'});
      const options = new RequestOptions({headers: headers});
      return this._http.get(url, options).map((response) => {console.log(response); return response.json(); }).subscribe(
      (data: Dealer[]) => {this.dealers = data; console.log(data); },
      err => {console.error(); },
      () => {console.log('filtro region genero listo'); }
      );
    } else {
      const url = `http://localhost:8000/dealers/ciudad/${deviceValue}`;
      const headers = new Headers({'Content-Type': 'aplication/json'});
      const options = new RequestOptions({headers: headers});
      return this._http.get(url, options).map((response) => {console.log(response); return response.json(); }).subscribe(
      (data: Dealer[]) => {this.dealers = data; console.log(data); },
      err => {console.error(); },
      () => {console.log('filtro region genero listo'); }
      );
    }


}

}
