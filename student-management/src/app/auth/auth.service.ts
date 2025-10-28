import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router) {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/students']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  // ✅ Make sure this method exists
  isAuthenticated(): boolean {
    return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
  }
}
