import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isActive: boolean;

  constructor() {
    this.isActive = true;
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  ngOnInit(): void {}
}
