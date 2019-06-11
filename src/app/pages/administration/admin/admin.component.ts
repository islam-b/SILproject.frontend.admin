import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }
  change() {
    this.router.navigate(['/admin//admin-marques']);
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    console.log(event);
    console.log('scrolling');
  }

}
