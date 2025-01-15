import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private authSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    // promjena statusa prijave prije prikaza headera
    this.authSubscription = this.authService.authStatusChanged.subscribe(() => {
      this.checkAuthStatus();
    });
  }

  // provjera statusa prijave i admin statusa pri kreiranju headera
  checkAuthStatus(): void {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user;
    this.isAdmin = user?.role === 'admin';
  }

  // logout metoda za brisanje tokena i resetiranje statusa prijave
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  // preusmjerava na login stranicu ako korisnik nije prijavljen
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
