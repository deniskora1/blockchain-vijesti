import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'http://localhost/blockchain-vijesti-api'; 

  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/read.php`);
  }

  addNews(news: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/create.php`, news, { headers });
  }

  updateNews(news: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/update.php`, news, { headers });
  }

  deleteNews(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.request('delete', `${this.apiUrl}/delete.php`, {
      headers,
      body: { id },
    });
  }

  getLatestNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/latest-news.php`);
  }

  getRecommendedNews() {
    return this.http.get<any[]>('http://localhost/blockchain-vijesti-api/recommended-news.php');
  }

  getNewsById(id: string) {
    return this.http.get<any>(`http://localhost/blockchain-vijesti-api/read.php?id=${id}`);
  }

  getNewsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost/blockchain-vijesti-api/category-news.php?category=${category}`);
  }  

  getNewsByDate(date: string) {
    return this.http.get<any[]>(`http://localhost/blockchain-vijesti-api/news-by-date.php?date=${date}`);
  }
}



