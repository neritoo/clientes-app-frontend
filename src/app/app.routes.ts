import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './home/home/home.component';
import { FormComponent } from './components/cliente/form.component';
import { LoginComponent } from './components/usuarios/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura/detalle-factura.component';
import { FacturasComponent } from './components/facturas/facturas.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'clientes', component: ClienteComponent },
    { path: 'clientes/page/:page', component: ClienteComponent },
    { path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
    { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
    { path: 'login', component: LoginComponent },
    { path: 'facturas/:id', component: DetalleFacturaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'} },
    { path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class APP_ROUTES {}