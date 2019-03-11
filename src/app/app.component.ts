import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  baseUrl = 'https://sayaradz.herokuapp.com/';

  ngOnInit(): void {
    localStorage.setItem('baseUrl', this.baseUrl);
  }
}
