import { Component, OnInit } from '@angular/core';
import {GeneroListService} from '../catalogo/service/generos-list.service';
import {Genero} from '../catalogo/model/genero.model';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-genero-list',
  templateUrl: './genero-list.component.html',
  styleUrls: ['./genero-list.component.css']
})
export class GeneroListComponent implements OnInit {
  generos: Array<Genero>;
  constructor(private _generoListService: GeneroListService) { }

  ngOnInit() {
    this._generoListService.getAll().subscribe(
      (data: Genero[])=>{this.generos=data;},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );
  }

}
