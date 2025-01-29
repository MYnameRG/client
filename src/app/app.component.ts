import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isConnected: boolean = false;
  checkUrl: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkUrl = this.router.url;
  }

  onClickLogoutBtn() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
