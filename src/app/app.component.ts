import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  baseUrl = 'http://127.0.0.1:8080/';

  ngOnInit(): void {
    localStorage.setItem('baseUrl', this.baseUrl);
  }
}
