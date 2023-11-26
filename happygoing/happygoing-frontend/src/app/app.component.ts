import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'etudiants';
  colorSvg: string[] = ['#4285f4', '#ea4335', '#fbbc05', '#34a853'];

  ngOnInit(): void {
    !localStorage.getItem('langDashbord')
      && localStorage.setItem('langDashbord', 'fr');
  }
}
