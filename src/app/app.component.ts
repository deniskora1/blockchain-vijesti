import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
    }

    main.container {
      padding: 2rem 0;
      min-height: 70vh;
    }

    footer {
      background-color: #222;
      color: #fff;
      text-align: center;
      padding: 1rem 0;
      font-size: 0.9rem;
    }
  `]
})
export class AppComponent {}
