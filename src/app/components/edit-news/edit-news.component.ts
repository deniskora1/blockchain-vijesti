import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class EditNewsComponent implements OnInit {
  news: any = {
    id: null,
    title: '',
    content: '',
    category: '',
    image_url: '',
    author: '',
  };

  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Provjera admin statusa
    this.isAdmin = this.authService.isAdmin();

    // Ako korisnik nije admin, preusmjerava na početnu stranicu i daje poruku da nema prava uređivanja.
    if (!this.isAdmin) {
      alert('Nemate prava za uređivanje vijesti.');
      this.router.navigate(['/']);
      return;
    }

    // Učitava vijest prema ID-u
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.newsService.getNewsById(id).subscribe(
        (data) => {
          this.news = data;
        },
        (error) => {
          console.error('Greška pri učitavanju vijesti:', error);
          alert('Došlo je do greške prilikom učitavanja vijesti.');
        }
      );
    }
  }

  onSubmit(): void {
    // provjera admin statusa
    if (!this.isAdmin) {
      alert('Nemate prava za uređivanje ove vijesti.');
      return;
    }

    // slanje updateovane vijesti
    this.newsService.updateNews(this.news).subscribe(
      (response) => {
        if (response.success) {
          alert('Vijest uspješno ažurirana!');
          this.router.navigate(['/']); // Preusmjerava na početnu stranicu
        } else {
          alert('Došlo je do greške: ' + response.message);
        }
      },
      (error) => {
        console.error('Greška pri ažuriranju vijesti:', error);
        alert('Došlo je do greške prilikom ažuriranja vijesti.');
      }
    );
  }
}
