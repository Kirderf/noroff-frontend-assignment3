import { Component, Input } from '@angular/core';
import { UserService} from '../services/user.service';
import { User } from '../models/user.models';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer-page.component.html',
})
export class TrainerPageComponent {
  @Input() user: User | undefined;
  constructor(public userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }
}
