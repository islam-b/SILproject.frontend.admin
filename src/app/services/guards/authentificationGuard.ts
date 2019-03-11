import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthentificationService} from '../authentifaction.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authentificationService: AuthentificationService, private router: Router) {}


  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  | Promise<boolean> | boolean {
    if (this.authentificationService.isAuth) {
        return true;
    } else {
        this.router.navigate(['/connexion']);
    }
  }
}
