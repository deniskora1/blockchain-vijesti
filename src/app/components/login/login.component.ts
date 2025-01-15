import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  registerUsername: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';
  showRegister: boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  // prijava korisnika
  login() {
    const credentials = { username: this.username, password: this.password };
    this.http.post('http://localhost/blockchain-vijesti-api/login.php', credentials).subscribe(
      (response: any) => {
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.authService.emitAuthStatus(true); // Emitovanje statusa prijave
          alert('Prijava uspješna!');
          this.router.navigate(['/']);
        } else {
          alert(response.error || 'Pogrešno korisničko ime ili šifra.');
        }
      },
      (error) => {
        console.error('Greška prilikom prijave:', error);
        alert('Došlo je do greške prilikom prijave.');
      }
    );
  }

  // forma za registraciju u slucaju ako korisnik nema racun
  toggleRegister(): void {
    this.showRegister = !this.showRegister;
  }

  // registracija korisnika
  register(): void {
    if (this.registerPassword !== this.registerConfirmPassword) {
      alert('Šifre se ne podudaraju!');
      return;
    }

    const newUser = { username: this.registerUsername, password: this.registerPassword };

    this.http.post('http://localhost/blockchain-vijesti-api/register.php', newUser).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Registracija uspješna! Sada se možete prijaviti.');
          this.showRegister = false;
        } else {
          alert(response.message || 'Došlo je do greške prilikom registracije.');
        }
      },
      (error) => {
        console.error('Greška prilikom registracije:', error);
        alert('Došlo je do greške prilikom registracije.');
      }
    );
  }

  // preusmjeravanje na stranicu za registraciju
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
