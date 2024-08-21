import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../backend/main-service.service';
import { User } from '../../dto\'s/user.dto'; 
@Component({
  selector: 'app-getall-users',
  templateUrl: './getall-users.component.html',
  styleUrls: ['./getall-users.component.css']
})
export class GetallUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private mainService: MainServiceService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.mainService.GetAllUsers().subscribe((users) => {
      this.users = users;
    }, (error) => {
      console.error('Error fetching users:', error);
    });
  }
}
