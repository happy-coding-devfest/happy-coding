import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { lightDark_liste, menu_liste } from './liste_elements';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {
  menu!: { pathSvg_1: string, pathSvg_2?: string, pathSvg_3?: string,label: string, route: string }[];
  lightDark!: { pathSvg: string, label: string }[];
  buttonSidenav!: HTMLElement;
  statusSidebar!: boolean;
  colorSidebar!: 'dark' | 'light';
  bodyApp!: HTMLBodyElement;
  headerApp!: HTMLElement;
  sidebarApp!: HTMLElement;
  preloaderApp!: HTMLElement;
  recherheApp!: HTMLElement;
  darkLightApp!: HTMLElement;
  
  @Output() statusSidebarToEmit = new EventEmitter<{statusSidebar: boolean}>();

  current$!: Observable<boolean>;

  constructor(
    private sessionService: SessionService
  ) { }

  private setColor(color: string, background: string): void {
    (this.bodyApp).style.color = color;
    (this.bodyApp).style.background = background;
    (this.sidebarApp).style.background = background;
    (this.preloaderApp).style.background = background;
  }

  private setHeaderColor(color: string, background: string, shadow: string): void {
    (this.headerApp).style.color = color;
    (this.headerApp).style.background = background;
    (this.headerApp).style.boxShadow = `0px 2px 3px 1px ${shadow}`;
  }

  private setOtherColor(background: string): void {
    (this.recherheApp).style.background = background;
    (this.darkLightApp).style.background = background;
  }

  private setColorListActive(): void {
    if(this.colorSidebar === 'dark') {
      let activeList = <HTMLElement>document.querySelector('.active_light');      
      activeList.classList.add('active_dark');
      activeList = <HTMLElement>document.querySelector('.active_dark');
      activeList.classList.remove('active_light');      
    }
    else {
      let activeList = <HTMLElement>document.querySelector('.active_dark');
      activeList.classList.add('active_light');
      activeList = <HTMLElement>document.querySelector('.active_light');
      activeList.classList.remove('active_dark');
    }
  }

  ngOnInit(): void {
    this.bodyApp = <HTMLBodyElement>document.querySelector('body');
    this.headerApp = <HTMLElement>document.querySelector('header');
    this.sidebarApp = <HTMLElement>document.querySelector('.sidebar');
    this.preloaderApp = <HTMLElement>document.querySelector('#preloader');
    this.recherheApp = <HTMLElement>document.querySelector('.recherche li');
    this.darkLightApp = <HTMLElement>document.querySelector('.dark_light');

    this.menu = menu_liste;
    this.lightDark = lightDark_liste;
    this.buttonSidenav = <HTMLElement>document.querySelector('#toggle_sidebar svg');

    !localStorage.getItem('statusSidebarDashbord')
      && localStorage.setItem('statusSidebarDashbord', `${true}`);
    this.statusSidebar = localStorage.getItem('statusSidebarDashbord') === 'true';

    !localStorage.getItem('colorDashbord') 
      && localStorage.setItem('colorDashbord', 'light');
    this.colorSidebar = <'dark' | 'light'>localStorage.getItem('colorDashbord');

    if(this.colorSidebar === 'light') {
      this.setColor('#0b4756e6', '#ffffff');
      this.setOtherColor('#f7f7f7');
      this.setHeaderColor('#0093b7', '#ffffff', '#e3dcdc6b');
    }
    else {
      this.setColor('#daf8ffe6', '#3a454b');
      this.setOtherColor('#626973');
      this.setHeaderColor('#00b9e7', '#3a454b', '#48414185');
    }
  }
  
  onToggleSidebar() {
    if(this.statusSidebar) {
      (this.buttonSidenav).style.transform = 'rotate(180deg)';
    }
    else {
      (this.buttonSidenav).style.transform = 'rotate(0deg)';
    }

    this.statusSidebar = !this.statusSidebar;
    localStorage.setItem('statusSidebarDashbord', `${this.statusSidebar}`);
    this.statusSidebarToEmit.emit({statusSidebar: this.statusSidebar});
  }

  onSearch(statusSidebar: boolean) {
    if(!statusSidebar) {
      this.statusSidebar = !this.statusSidebar;
      this.statusSidebarToEmit.emit({statusSidebar: this.statusSidebar});
    }
  }

  onSetColor(color: 'dark' | 'light') {
    if(!this.statusSidebar) {
        if(color === 'light') {
          localStorage.setItem('colorDashbord', 'dark');
          this.colorSidebar = 'dark';
          this.setColor('#daf8ffe6', '#3a454b');
          this.setOtherColor('#626973');
          this.setHeaderColor('#00b9e7', '#3a454b', '#48414185');
        }
        else {
          localStorage.setItem('colorDashbord', 'light');
          this.colorSidebar = 'light';
          this.setColor('#0b4756e6', '#ffffff');
          this.setOtherColor('#f7f7f7');
          this.setHeaderColor('#0093b7', '#ffffff', '#e3dcdc6b');
        }
    }
    else {
      localStorage.setItem('colorDashbord', color);
      this.colorSidebar = color;
      if(this.colorSidebar === 'dark') {
        this.setColor('#daf8ffe6', '#3a454b');
        this.setOtherColor('#626973');
        this.setHeaderColor('#00b9e7', '#3a454b', '#48414185');
      }
        
      else {
        this.setColor('#0b4756e6', '#ffffff');
        this.setOtherColor('#f7f7f7');
        this.setHeaderColor('#0093b7', '#ffffff', '#e3dcdc6b');
      }
    }
    this.setColorListActive();
  }

  onLogout(): void {
    this.sessionService.logOut();
  }
}
