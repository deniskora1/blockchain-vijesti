import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AddNewsComponent {
  news = {
    title: '',
    content: '',
    category: '',
    image_url: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  addNews(): void {
    console.log('Podaci za slanje:', this.news);

    this.http.post('http://localhost/blockchain-vijesti-api/create.php', this.news)
      .pipe(
        tap((response: any) => {
          console.log('Odgovor servera:', response);
          if (response.message === 'Vijest uspješno dodana.') {
            alert(response.message);
            this.router.navigate(['/']);
          } else {
            alert(response.message || 'Došlo je do greške prilikom dodavanja vijesti.');
          }
        }),
        catchError((error) => {
          console.error('Greška u zahtjevu:', error);
          alert('Došlo je do greške prilikom dodavanja vijesti.');
          return of(null);
        })
      )
      .subscribe();
  }
}
