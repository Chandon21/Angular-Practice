import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());


constructor(private router: Router) {}


private hasToken(): boolean {
return !!localStorage.getItem('sm_token');
}


login(username: string, password: string): Observable<boolean> {
// Very simple mock auth: accept any username/password non-empty
const ok = username.trim().length > 0 && password.trim().length > 0;
if (ok) {
localStorage.setItem('sm_token', 'mock-token-' + new Date().getTime());
this._isLoggedIn$.next(true);
}
return this._isLoggedIn$.asObservable();
}


logout() {
localStorage.removeItem('sm_token');
this._isLoggedIn$.next(false);
this.router.navigate(['/login']);
}


isLoggedIn$(): Observable<boolean> {
return this._isLoggedIn$.asObservable();
}


isLoggedIn(): boolean {
return this._isLoggedIn$.value;
}
}