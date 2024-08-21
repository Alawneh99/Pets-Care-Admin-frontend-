import { Component, HostListener, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../../backend/main-service.service';
import { AppComponent } from 'src/app/basecomponent/app.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() appComponent!: AppComponent;
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

  toggleSidenav() {
    this.appComponent.toggleSidenav();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  signOut() {
    const userId = this.getUserIdFromStorage();
    if (userId !== null) {
      this.mainService.SignOut(userId).subscribe(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // The authStatus BehaviorSubject will automatically update isLoggedIn
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
