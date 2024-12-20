import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-diet-plan-download',
    templateUrl: './diet-plan-download.component.html',
    styles: ``,
})
export class DietPlanDownloadComponent implements OnInit {
    url = environment.apiUrl;

    userId: any = '';

    documents: any = [];

    constructor(private httpClient: HttpClient) {}
    ngOnInit(): void {
        this.getUserData();
        this.userId = this.getUserId();
        console.log(this.userId);
        this.getUserDocData(this.userId);
    }

    subscribedPlan: any = [];

    showPreparingPopup: boolean = false;
    planType: string = '';
    userHasSubscribedAfterExpiry: boolean = false; // Flag for subscription status

    downloadPlan() {
        const isFileAvailable = this.checkFileAvailability();

        if (isFileAvailable) {
            const element = document.getElementById('plan-details');
            if (element) {
                html2canvas(element).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('DietPlan.pdf');
                });
            }
        } else {
            this.showPreparingPopup = true;
        }
    }
    // Open Modal with Plan Type
    openModal(plan: string) {
        this.planType = plan === 'latest' ? 'Latest Week' : 'Previous Week';
        this.showPreparingPopup = true;
    }

    // Close Modal
    closePopup() {
        this.showPreparingPopup = false;
        this.planType = '';
    }

    // Example Download Handlers
    downloadPreviousPlan() {
        console.log('Downloading previous plan...');
    }

    downloadLatestPlan() {
        console.log('Downloading latest plan...');
    }
    checkFileAvailability(): boolean {
        // Simulate file availability check
        return false; // Change this to true to simulate file availability
    }

    upgradePlans = [
        { name: 'Basic Plan', description: 'Access to basic features', price: 100 },
        { name: 'Pro Plan', description: 'Access to all features', price: 200 },
        { name: 'Premium Plan', description: 'Access to all features and VIP support', price: 300 },
    ];

    upgradePlan(plan: any): void {
        if (plan.name !== this.subscribedPlan.name) {
            this.subscribedPlan = plan;
            alert(`You have successfully upgraded to the ${plan.name}!`);
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

    private mapUserData(response: any) {
        return {
            name: response.currentPlan.name,
            description: response.currentPlan.description,
            price: response.currentPlan.price,
            startDate: response.currentPlan.startDate,
            endDate: response.currentPlan.endDate,
            status: 'Active',
            user: {
                name: `${response.userProfile.firstName} ${response.userProfile.lastName}`,
                email: response.userProfile.email,
                phone: response.userProfile.mobileNumber,
                modeOfTransaction: 'Credit Card', // Adjust if mode is available in the response
                address: response.userProfile.address,
            },
            subscriptionId: response.currentPlan.planId || 'N/A',
        };
    }

    getUserId() {
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
            if (currentUser.userId != null && currentUser != undefined) {
                // Get the first role name
                const userId = currentUser.userId;

                // Store the role name in a variable
                return userId;
            } else {
                console.warn('No user id found for the current user.');
                return null;
            }
        } catch (error) {
            console.error('Failed to parse user data from localStorage:', error);
            return null;
        }
    }

    getUserDocData(userId: any) {
        this.httpClient.get(`${this.url}api/user/${userId}/documents`).subscribe(
            (response: any) => {
                this.documents = response.documents;
                console.log(this.documents);
            },
            (error: any) => {
                console.log(error);
            },
        );
    }

    downloadDocument(documentPath: string) {
        // Create the full URL for the document
        const downloadUrl = `${this.url}${documentPath}`;

        // Create an invisible link element to trigger the download
        const link = document.createElement('a');
        link.href = downloadUrl;

        // Fallback to document name or provide a default filename if split().pop() returns undefined
        const filename = documentPath.split('/').pop() || 'downloaded-file.pdf';
        link.download = filename;

        link.click(); // Trigger the download
    }
}
