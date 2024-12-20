import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-my-plan',
    templateUrl: './my-plan.component.html',
    styles: ``,
})
export class MyPlanComponent implements OnInit {
    url = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}
    ngOnInit(): void {
        this.getUserData();
        this.getPlansData();
    }

    // Sample data for demonstration purposes, including user details
    subscribedPlan: any = [];

    availablePlans: any = [];

    showModal = false;
    selectedPlanToUpgrade: any = null;

    // Function to open the modal and set the selected plan
    upgradePlan(plan: any) {
        this.selectedPlanToUpgrade = plan;
        this.showModal = true;
    }

    // Close the modal
    closeModal() {
        this.showModal = false;
        this.selectedPlanToUpgrade = null;
    }

    // Function to confirm the plan upgrade
    confirmUpgrade() {
        if (this.selectedPlanToUpgrade) {
            console.log(`Upgrading to ${this.selectedPlanToUpgrade.name}`);
            this.subscribedPlan = this.selectedPlanToUpgrade; // Update the subscribed plan
            this.closeModal();
        } else {
            console.error('No plan selected for upgrade');
        }
    }

    getUserData() {
        this.httpClient.get(this.url + 'api/user/my-profile').subscribe(
            (response: any) => {
                // console.log(response);
                this.subscribedPlan = this.mapUserData(response);
                console.log(this.subscribedPlan);
            },
            (error: any) => {
                console.log(error);
            },
        );
    }

    getPlansData() {
        this.httpClient.get(this.url + 'api/plans').subscribe(
            (response: any) => {
                // console.log(response);
                this.availablePlans = response.plans;
            },
            (error: any) => {
                console.log(error);
            },
        );
    }

    private mapUserData(response: any) {
        return {
            id: response.currentPlan.planId, // Static or dynamically assigned
            name: response.currentPlan.name,
            description: response.currentPlan.description,
            price: response.currentPlan.price,
            user: {
                name: response.userProfile.firstName.concat(' ', response.userProfile.lastName),
                email: response.userProfile.email,
                phone: response.userProfile.mobileNumber,
                modeOfTransaction: 'Credit Card', // Static value or replace based on additional data
                address: response.userProfile.address,
            },
        };
    }
}
