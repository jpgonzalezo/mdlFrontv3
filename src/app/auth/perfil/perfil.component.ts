import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  id:number;
  private sub:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub=this.route.params.subscribe(
      params=>{
        this.id=+params['id'];
        console.log(this.id);
      });
  }

}
