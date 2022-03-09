import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year!: string;
  originator!: string;
  url!: string;

  constructor() {}

  ngOnInit(): void {
    this.year = new Date().getFullYear().toString();
    this.originator = 'Celia Montes Schumann';
    this.url = 'https://www.linkedin.com/in/celia-montes-schumann';
  }
}
