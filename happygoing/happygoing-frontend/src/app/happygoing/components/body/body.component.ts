import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements OnInit {
  statusSidebar!: boolean;
  constructor() { }

  ngOnInit(): void {
    this.statusSidebar = localStorage.getItem('statusSidebarDashbord') === 'true';
  }
  
  onChangeStatusSidebar(event: {statusSidebar: boolean }): void {
    this.statusSidebar = event.statusSidebar;
  }
}
