import { Component, OnInit } from '@angular/core';
import {Libro} from './model/slider.model';
import {LibroListService} from '../book-list/services/newBook-list.service';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliderList: Array<Libro>;
  public carouselTile: NgxCarousel;
  constructor(private _sliderService: LibroListService) { }

  ngOnInit() {
    this._sliderService.getAll().subscribe(
      (data: Libro[])=>{this.sliderList=data;},
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
    const len = this.sliderList.length;
    console.log(len);
    for (let i = 0; i < len ; i++) {
    }
  }
}
