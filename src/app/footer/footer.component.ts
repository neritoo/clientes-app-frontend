import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
    `
    p{
      color: white !important;
    }
    .footer{
      position: relative;
      bottom: 0px;
      height: 60px;
      width: 100%;
    }
    `
  ]
})
export class FooterComponent implements OnInit {
  autor: any = {
    nombre: 'Ezequiel',
    apellido: 'Gavilán'
  }
  constructor() { }

  ngOnInit() {
  }

}
