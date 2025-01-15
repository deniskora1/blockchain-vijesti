import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Šifre se ne poklapaju!');
      return;
    }

    const newUser = { username: this.username, password: this.password };
    this.http.post('http://localhost/blockchain-vijesti-api/register.php', newUser).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Registracija uspješna! Prijavite se sada.');
          this.router.navigate(['/login']);
        } else {
          alert(response.error || 'Došlo je do greške prilikom registracije.');
        }
      },
      (error) => {
        console.error('Greška prilikom registracije:', error);
        alert('Došlo je do greške prilikom registracije.');
      }
    );
  }
}
