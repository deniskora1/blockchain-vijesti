import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.css'],
  imports: [CommonModule, RouterModule],
})
export class CategoryNewsComponent implements OnInit {
  categoryNews: any[] = [];
  category: string = '';

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.category = category;
        this.newsService.getNewsByCategory(category).subscribe((data: any[]) => {
          this.categoryNews = data;
        });
      }
    });
  }
}
