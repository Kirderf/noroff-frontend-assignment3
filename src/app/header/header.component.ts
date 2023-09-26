import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user?: User;
  subscrition?: Subscription;
  showHeader: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.updateShowHeader();
    this.subscrition = this.userService.userChange.subscribe((user) => {
      console.log('User changed:', user);
      this.user = user;
      this.updateShowHeader();
    });
  }

  private updateShowHeader(): void {
    this.showHeader = !!localStorage.getItem('user') || !!this.user;
  }

  ngOnDestroy(): void {
    this.subscrition?.unsubscribe();
  }

  logOut() {
    this.userService.logOut();
  }
}
