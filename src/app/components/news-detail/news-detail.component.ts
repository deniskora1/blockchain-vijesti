import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NewsDetailComponent implements OnInit {
  news: any; // GLAVNA VIJEST
  recommendedNews: any[] = []; // Preporučene vijesti
  isAdmin: boolean = false; // Provjera da li je korisnik admin

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Provjera da li je korisnik admin
    this.isAdmin = this.authService.isAdmin();

    // Prikaz vijesti prema ID-u iz URL-a
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.newsService.getNewsById(id).subscribe(
          (data: any) => {
            this.news = data;
          },
          (error) => {
            console.error('Greška prilikom dohvaćanja vijesti:', error);
          }
        );
      }
    });

    // Dohvaćanje preporučenih vijesti
    this.newsService.getRecommendedNews().subscribe(
      (data: any[]) => {
        this.recommendedNews = data.map((news) => ({
          ...news,
          image_url:
            news.image_url && news.image_url.startsWith('http')
              ? news.image_url
              : `http://localhost/blockchain-vijesti-api/slike/${news.image_url}`,
        }));
      },
      (error) => {
        console.error('Greška prilikom dohvaćanja preporučenih vijesti:', error);
      }
    );
  }

  // funkcija za brisanje vijesti
  deleteNews(): void {
    if (confirm('Jeste li sigurni da želite izbrisati ovu vijest?')) {
      this.newsService.deleteNews(this.news.id).subscribe(
        (response) => {
          alert('Vijest je uspješno izbrisana.');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Greška prilikom brisanja vijesti:', error);
          alert('Došlo je do greške prilikom brisanja vijesti.');
        }
      );
    }
  }

  // funkcija za uredjanje vijesti
  editNews(): void {
    this.router.navigate(['/edit-news', this.news.id]);
  }
}
