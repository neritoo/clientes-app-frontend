import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  recordarme: boolean;

  constructor( private router: Router ) { }

  ngOnInit() {
    this.usuario = new Usuario();
    if ( localStorage.getItem('email') ){
      this.usuario.username = localStorage.getItem('username');
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
    
    this.router.navigateByUrl("/home");

    Swal.close();
  }

}
