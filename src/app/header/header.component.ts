import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent {
    title: string = 'Roziito App';
    usuario: Usuario;

    constructor(private authService: AuthService, private router: Router){

    }

    estaAuth(): boolean{
        return this.authService.isAuthenticated();
    }

    getUsuario(): Usuario{
        return this.authService.usuario;
    }

    logout(){
        Swal.fire({
            icon: 'success',
            title: "Log out",
            text: `Hola ${this.getUsuario().username}, has cerrado sesión con éxito`
        });
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}