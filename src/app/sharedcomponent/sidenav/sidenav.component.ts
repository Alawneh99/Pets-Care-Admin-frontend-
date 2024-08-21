import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MainServiceService } from '../../backend/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private mainService: MainServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Subscribe to authStatus to get real-time updates
    this.mainService.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
      this.cdr.detectChanges(); // Trigger change detection
    });

    // Initial check if the user is logged in
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  signOut() {
    const userId = this.getUserIdFromStorage();
    if (userId !== null) {
      this.mainService.SignOut(userId).subscribe(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.router.navigate(['/signin']);
      }, error => {
        console.error('Error during sign out:', error);
      });
    }
  }

  private getUserIdFromStorage(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}
