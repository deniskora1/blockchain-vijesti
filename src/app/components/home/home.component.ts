import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestNews: any[] = [];
  recommendedNews: any[] = [];
  filteredNews: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadLatestNews();
    this.loadRecommendedNews();
  }

  loadLatestNews() {
    this.newsService.getLatestNews().subscribe((data: any[]) => {
      console.log('Latest News:', data);

      // Provjera i ispravljanje url-a za slike
      this.filteredNews = data.slice(0, 5);
      this.latestNews = data.map(news => ({
        ...news,
        image_url: news.image_url.startsWith('http')
          ? news.image_url
          : `http://localhost/blockchain-vijesti-api/slike/${news.image_url}`
      }));
    });
  }

  loadRecommendedNews() {
    this.newsService.getRecommendedNews().subscribe((data: any[]) => {
      // Provjera i ispravljanje url-a za slike u preporučenim vijestima
      this.recommendedNews = data.map(news => ({
        ...news,
        image_url: news.image_url.startsWith('http')
          ? news.image_url
          : `http://localhost/blockchain-vijesti-api/slike/${news.image_url}`
      }));
    });
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    if (selectedDate) {
      this.newsService.getNewsByDate(selectedDate).subscribe((data: any[]) => {
        this.filteredNews = data;
      });
    } else {
      this.loadLatestNews();
    }
  
}
}