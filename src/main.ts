import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AdminGuard } from './app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/components/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import('./app/components/news-detail/news-detail.component').then(
        (m) => m.NewsDetailComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./app/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./app/components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'add-news',
    loadComponent: () =>
      import('./app/components/add-news/add-news.component').then(
        (m) => m.AddNewsComponent
      ),
    canActivate: [AdminGuard], // Zaštićena ruta samo za admina
  },
  {
    path: 'edit-news/:id',
    loadComponent: () =>
      import('./app/components/edit-news/edit-news.component').then(
        (m) => m.EditNewsComponent
      ),
    canActivate: [AdminGuard], // Zaštićena ruta samo za admina
  },
  {
    path: 'category/:category',
    loadComponent: () =>
      import('./app/components/category-news/category-news.component').then(
        (m) => m.CategoryNewsComponent
      ),
  },

];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      FormsModule,
      ReactiveFormsModule,
    ),
    provideHttpClient(),
    AdminGuard,
  ],
});
