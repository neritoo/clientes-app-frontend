import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  recordarme: boolean;

  constructor( private authService: AuthService, private router: Router ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      Swal.fire({
        icon: 'info',
        title: 'Login',
        text: `Hola ${this.authService.usuario.username} ya estas autenticado!`
      });
      this.router.navigate(['/clientes']);
    }

    if ( sessionStorage.getItem('user_name') ){
      this.usuario.username = sessionStorage.getItem('user_name');
      this.recordarme = true;
    }

  }

  logIn( form: NgForm ){
    if ( form.invalid ){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere porfavor',
    });
    Swal.showLoading();
    
    this.authService.login(this.usuario).subscribe(res => {
   
      Swal.close();

      this.authService.guardarUsuario(res.access_token);
      this.authService.guardarToken(res.access_token);

      let usuario = this.authService.usuario;

      if(this.recordarme){
        sessionStorage.setItem('user_name', this.usuario.username);
      } else {
        sessionStorage.removeItem('user_name');
      }
      
      this.router.navigateByUrl("/clientes");
      Swal.fire({
        icon: 'success',
        title: 'Login',
        text: `Bienvenido ${usuario.username}, has iniciado sesión!`
      });
    }, err => {
       if(err.status == 400){
         Swal.fire({
           icon: 'error',
           title: 'Error al autenticarse',
           text: 'Usuario o clave incorrectas'
         });
       }
    });    
  }



}
