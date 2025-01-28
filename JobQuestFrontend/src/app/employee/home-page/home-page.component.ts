import { Component } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { Company } from '../../models/companyModel/company';
import { Event } from '../../models/eventModel/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  isUserLoggedIn: boolean = false;
  isDropdownOpen: boolean = false;
  loading: boolean = true;
  companiesList: Company[] = [];
  eventsList: Event[] = [];
  constructor(private userService: UserProfileService, private router: Router) {}
  ngOnInit() {
    
    this.userService.getAllCompaniesData().subscribe(
      (companies: Company[]) => {
        // Process companies data
        this.companiesList = companies;
        // Call next API
        this.userService.getAllEvents().subscribe(
          (events: Event[]) => {
            // Process events data
            this.eventsList = events;
            // Check if user is logged in and hide loading indicator
            this.isUserLoggedIn = this.getUserLoggedInStatusData();
            
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching events:', error);
            // Handle error
            this.loading = false;
          }
        );
      },
      (error) => {
        console.error('Error fetching companies:', error);
        // Handle error
        this.loading = false;
      }
    );
  }

  onSearchedClicked = (query: string) => {
    this.router.navigate(['/employee/jobSearch'], { queryParams: { searchText: query } });
  }

  getUserLoggedInStatusData = (): boolean => {
    return this.userService.getLoginStatus();
  };

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
