import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  apropos$!: Observable<UserModel>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.apropos$ = this.userService.apropos$;
    this.userService.getUser();
  }

}
