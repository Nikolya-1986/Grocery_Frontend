import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: 'home', loadChildren: () => import('./modules/home/home.module').then(module => module.GroceryModule),
  },
  {
    path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(module => module.CartModule),
  },
  {
    path: 'error', component: ErrorComponent,
  },
  { 
    path: '**', redirectTo: '/error'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
