import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styles: []
})
export class NgForComponent implements OnInit {
  cursos: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'PHP'];
  ocultado: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
