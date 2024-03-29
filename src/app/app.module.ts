
//MODULOS DE ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

//COMPONENTES CREADOS
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { BookListComponent } from './common/book-list/book-list.component';
import { BestSellerComponent } from './common/best-seller/best-seller.component';
import { SliderComponent } from './common/slider/slider.component';
import { HomeComponent } from './auth/home/home.component';
import { CatalogoComponent } from './common/catalogo/catalogo.component';
import { GeneroListComponent } from './common/genero-list/genero-list.component';
import { EditorialListComponent } from './common/editorial-list/editorial-list.component';
import { AutorListComponent } from './common/autor-list/autor-list.component';
import { DealerDestacadosListComponent } from './common/dealer-destacados-list/dealer-destacados-list.component';
import { DetalleLibroComponent } from './common/detalle-libro/detalle-libro.component';
import { DetailBookComponent } from './common/detail-book/detail-book.component';
import { FooterComponent } from './common/footer/footer.component';
import { SearchDealerComponent } from './common/search-dealer/search-dealer.component';
import { CartComponent } from './common/cart/cart.component';
import { NotFoundComponent } from './common/not-found/not-found.component';


//MODULOS EXTERNOS
import { OwlModule } from 'ngx-owl-carousel';
import {Ng2Webstorage} from 'ngx-webstorage';
import {routes} from './routes';


//SERVICIOS CREADOS
import {LibroListService} from './common/book-list/services/newBook-list.service';
import {BestSellerListService} from './common/best-seller/service/bestSeller-list.service';
import { LoginComponent } from './public/login/login.component';
import {AuthenticationService} from './public/login/service/authentication.service';
import {HttpService} from './http.service';
import {GeneroListService} from './common/catalogo/service/generos-list.service';
import {DealerListService} from './common/dealer-destacados-list/service/dealer-list.service';
import {RegionListService} from './common/search-dealer/service/region-list.service';
import { CartService } from './common/cart/services/cart.service';
import { PerfilComponent } from './auth/perfil/perfil.component';
import {EditorialListService} from './common/editorial-list/service/editorial-list.service';

//GUARD CREADOS
import {LoginGuard} from './guard/login/login.guard';


import {Pedido} from './common/cart/models/pedido.model';
import {UrlPago} from './common/cart/models/urlPago.model';
import { PagoExitoComponent } from './auth/pago-exito/pago-exito.component';
import { PagoFalloComponent } from './auth/pago-fallo/pago-fallo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookListComponent,
    BestSellerComponent,
    SliderComponent,
    LoginComponent,
    HomeComponent,
    CatalogoComponent,
    GeneroListComponent,
    EditorialListComponent,
    AutorListComponent,
    DealerDestacadosListComponent,
    DetalleLibroComponent,
    DetailBookComponent,
    FooterComponent,
    SearchDealerComponent,
    CartComponent,
    PerfilComponent,
    NotFoundComponent,
    PagoExitoComponent,
    PagoFalloComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    OwlModule,
    Ng2Webstorage,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxCarouselModule
  ],
  providers: [LibroListService,
              BestSellerListService,
              AuthenticationService,
              HttpService,
              GeneroListService,
              DealerListService,
              RegionListService, 
              CartService,
              EditorialListService,
              LoginGuard,
              Pedido,
              UrlPago
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
