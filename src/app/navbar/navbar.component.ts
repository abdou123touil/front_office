import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('navList') navList!: ElementRef; // Reference to the ul element
  activeLink: string = '';
  loggedInUsername: string | null = null;
  showDropdown: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.authService.loggedInUsername.subscribe(username => {
      this.loggedInUsername = username;
    });
    this.activeLink = this.router.url.split('/')[1];
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }

  navigateTo(page: string): void {
    this.router.navigate([page]);
    this.setActiveLink(page);
  }

  setActiveLink(page: string) {
    this.activeLink = page;
    const navItems = this.navList.nativeElement.querySelectorAll('li');
    navItems.forEach((item: HTMLElement) => item.classList.remove('active'));
    const activeItem = this.navList.nativeElement.querySelector(`li[click*="${page}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }
}
