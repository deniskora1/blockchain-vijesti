import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: any = null;
  public authStatusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  login(username: string, password: string): boolean {
    // mock user simulacija
    const mockUsers = [
      { username: 'Samir', password: 'admin', role: 'admin' },
      { username: 'User', password: 'user123', role: 'user' }
    ];

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.emitAuthStatus(true); // emituje promjenu statusa prijave kako bi se prikazale opcije za admina
      return true;
    }

    return false;
  }

  logout(): void {
    this.loggedInUser = null;
    localStorage.removeItem('user');
    this.emitAuthStatus(false); // emituje promjenu statusa prijave kako bi se uklonile opcije za admina
  }

  isAuthenticated(): boolean {
    this.loggedInUser = JSON.parse(localStorage.getItem('user') || 'null');
    return !!this.loggedInUser;
  }

  getCurrentUser(): any {
    if (!this.loggedInUser) {
      this.loggedInUser = JSON.parse(localStorage.getItem('user') || 'null');
    }
    return this.loggedInUser;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  emitAuthStatus(status: boolean): void {
    this.authStatusChanged.emit(status);
  }
}
