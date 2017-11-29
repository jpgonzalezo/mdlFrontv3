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
    path:'**',component: NotFoundComponent
}
]