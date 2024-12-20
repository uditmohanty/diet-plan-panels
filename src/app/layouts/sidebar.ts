import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../shared/animations';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
})
export class SidebarComponent {
    active = false;
    store: any;
    activeDropdown: string[] = [];
    parentDropdown: string = '';
    userRole: any = '';
    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
    ) {
        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    ngOnInit() {
        this.setActiveDropdown();
        this.userRole = this.getCurrentUserRole();
        if (this.userRole) {
            console.log('Current User Role:', this.userRole);
        }
    }

    setActiveDropdown() {
        const selector = document.querySelector('.sidebar ul a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }
    }

    getCurrentUserRole() {
        // Retrieve the user data from localStorage
        const currentUserData = localStorage.getItem('currentUser');

        // Check if user data exists
        if (!currentUserData) {
            console.error('No user data found in localStorage.');
            return null;
        }

        try {
            // Parse the user data
            const currentUser = JSON.parse(currentUserData);

            // Check if roles exist and have at least one entry
            if (currentUser.roles && currentUser.roles.length > 0) {
                // Get the first role name
                const roleName = currentUser.roles[0].name;

                // Store the role name in a variable
                return roleName;
            } else {
                console.warn('No roles found for the current user.');
                return null;
            }
        } catch (error) {
            console.error('Failed to parse user data from localStorage:', error);
            return null;
        }
    }
}
