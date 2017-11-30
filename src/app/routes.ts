import {Routes} from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './auth/home/home.component';
import {CatalogoComponent} from './common/catalogo/catalogo.component';
import {DetailBookComponent} from './common/detail-book/detail-book.component';
import {SearchDealerComponent} from './common/search-dealer/search-dealer.component';
import {PerfilComponent} from './auth/perfil/perfil.component';
import {NotFoundComponent} from './common/not-found/not-found.component'
import { CartComponent } from 'app/common/cart/cart.component';
import { ResultadoPagoComponent } from 'app/auth/resultado-pago/resultado-pago.component';
import { PagoFalloComponent } from 'app/auth/pago-fallo/pago-fallo.component';
import { PagoExitoComponent } from 'app/auth/pago-exito/pago-exito.component';

export const routes:Routes =[
{
    path:'', pathMatch: 'full', redirectTo:'home'
},
{
    path:'login' ,component:LoginComponent
},
{
    path:'home',component:HomeComponent
},
{
    path:'catalogo',component:CatalogoComponent
},
{
    path: 'detail/:id',component: DetailBookComponent
},
{
    path: 'dealers',component: SearchDealerComponent
},
{
    path: 'perfil/:tipo/:id',component: PerfilComponent
},
{
    path: 'cart',component: CartComponent
},
{
    path: 'exito',component: PagoExitoComponent
},
{
    path: 'fallo', component: PagoFalloComponent
},
{
    path:'**',component: NotFoundComponent
}
]