import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StockOrdersComponent } from './components/stock-orders/stock-orders.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'stock-orders',
    component: StockOrdersComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
