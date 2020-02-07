import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './home/home/home.component';
import { FormComponent } from './components/cliente/form.component';
import { DetalleComponent } from './components/cliente/detalle/detalle.component';
import { LoginComponent } from './components/usuarios/login.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'clientes', component: ClienteComponent },
    { path: 'clientes/page/:page', component: ClienteComponent },
    { path: 'clientes/form', component: FormComponent },
    { path: 'clientes/form/:id', component: FormComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class APP_ROUTES {}