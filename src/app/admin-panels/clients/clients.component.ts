import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { title } from 'process';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styles: ``,
})
export class ClientsComponent implements OnInit {
    url = environment.apiUrl;
    clientData: any = [];
    constructor(private httpClient: HttpClient) {}
    ngOnInit(): void {
        this.getUserData();
    }
    datatable: any;
    search = '';
    cols = [
        { title: 'Username', field: 'username' },
        { tile: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Email', field: 'email' },
        { title: 'Active', field: 'isActive' },
        { title: 'Locked', field: 'isLocked' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ];
    items = [
        {
            id: 1,
            name: 'Laurie Fox',
            email: 'lauriefox@company.com',
            country: 'USA',
            state: 'California',
            date: '15 Dec 2020',
            enddate: '15 Dec 2020',
            amount: '2275.45',
            status: 'Paid',
            paymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer'],
            cardDetails: {
                cardType: 'Visa',
                cardNumber: '**** **** **** 1234',
                expiryDate: '12/25',
                cardHolder: 'Laurie Fox',
            },
            billingAddress: {
                addressLine1: '123 Main Street',
                addressLine2: 'Apt 4B',
                city: 'Los Angeles',
                state: 'California',
                zipcode: '90001',
                country: 'USA',
            },
        },
        {
            id: 2,
            name: 'Mark Stevens',
            email: 'markstevens@company.com',
            country: 'Canada',
            state: 'Ontario',
            date: '22 Jan 2021',
            enddate: '22 Jan 2021',
            amount: '1500.00',
            status: 'Paid',
            paymentMethods: ['PayPal', 'Bank Transfer'],
            cardDetails: {
                cardType: 'MasterCard',
                cardNumber: '**** **** **** 5678',
                expiryDate: '05/23',
                cardHolder: 'Mark Stevens',
            },
            billingAddress: {
                addressLine1: '456 King Street',
                addressLine2: 'Suite 301',
                city: 'Toronto',
                state: 'Ontario',
                zipcode: 'M5V 1K4',
                country: 'Canada',
            },
        },
        {
            id: 3,
            name: 'Emily Clark',
            email: 'emilyclark@company.com',
            country: 'UK',
            state: 'London',
            date: '30 Mar 2021',
            enddate: '30 Mar 2021',
            amount: '800.99',
            status: 'Paid',
            paymentMethods: ['Credit Card', 'PayPal'],
            cardDetails: {
                cardType: 'American Express',
                cardNumber: '**** **** **** 4321',
                expiryDate: '09/22',
                cardHolder: 'Emily Clark',
            },
            billingAddress: {
                addressLine1: '789 Oxford Street',
                addressLine2: 'Flat 15',
                city: 'London',
                state: 'London',
                zipcode: 'W1D 1AU',
                country: 'UK',
            },
        },
        {
            id: 4,
            name: 'John Smith',
            email: 'johnsmith@company.com',
            country: 'USA',
            state: 'Texas',
            date: '5 Feb 2022',
            enddate: '5 Feb 2022',
            amount: '1900.50',
            status: 'Completed',
            paymentMethods: ['Credit Card', 'Bank Transfer'],
            cardDetails: {
                cardType: 'Visa',
                cardNumber: '**** **** **** 7890',
                expiryDate: '07/24',
                cardHolder: 'John Smith',
            },
            billingAddress: {
                addressLine1: '1012 Elm Street',
                addressLine2: 'Unit 203',
                city: 'Houston',
                state: 'Texas',
                zipcode: '77002',
                country: 'USA',
            },
        },
        {
            id: 5,
            name: 'Sophia Johnson',
            email: 'sophiajohnson@company.com',
            country: 'USA',
            state: 'Florida',
            date: '17 Jul 2022',
            enddate: '17 Jul 2022',
            amount: '1200.75',
            status: 'Paid',
            paymentMethods: ['Credit Card'],
            cardDetails: {
                cardType: 'MasterCard',
                cardNumber: '**** **** **** 2345',
                expiryDate: '01/26',
                cardHolder: 'Sophia Johnson',
            },
            billingAddress: {
                addressLine1: '234 Palm Avenue',
                addressLine2: 'Apt 101',
                city: 'Miami',
                state: 'Florida',
                zipcode: '33101',
                country: 'USA',
            },
        },
        {
            id: 6,
            name: 'James Williams',
            email: 'jameswilliams@company.com',
            country: 'USA',
            state: 'New York',
            date: '19 Oct 2022',
            enddate: '19 Oct 2022',
            amount: '950.60',
            status: 'Paid',
            paymentMethods: ['PayPal', 'Credit Card'],
            cardDetails: {
                cardType: 'Discover',
                cardNumber: '**** **** **** 8765',
                expiryDate: '04/23',
                cardHolder: 'James Williams',
            },
            billingAddress: {
                addressLine1: '987 Broadway',
                addressLine2: 'Penthouse',
                city: 'New York',
                state: 'New York',
                zipcode: '10010',
                country: 'USA',
            },
        },
        {
            id: 7,
            name: 'Olivia Brown',
            email: 'oliviabrown@company.com',
            country: 'Canada',
            state: 'British Columbia',
            date: '30 Apr 2023',
            enddate: '30 Apr 2023',
            amount: '1325.80',
            status: 'Paid',
            paymentMethods: ['Bank Transfer', 'PayPal'],
            cardDetails: {
                cardType: 'Visa',
                cardNumber: '**** **** **** 6543',
                expiryDate: '11/24',
                cardHolder: 'Olivia Brown',
            },
            billingAddress: {
                addressLine1: '112 Maple Street',
                addressLine2: 'Suite 404',
                city: 'Vancouver',
                state: 'British Columbia',
                zipcode: 'V6B 4X5',
                country: 'Canada',
            },
        },
        {
            id: 8,
            name: 'David Martinez',
            email: 'davidmartinez@company.com',
            country: 'Mexico',
            state: 'Nuevo León',
            date: '21 Feb 2023',
            enddate: '21 Feb 2023',
            amount: '1025.00',
            status: 'Completed',
            paymentMethods: ['Credit Card'],
            cardDetails: {
                cardType: 'MasterCard',
                cardNumber: '**** **** **** 1122',
                expiryDate: '03/22',
                cardHolder: 'David Martinez',
            },
            billingAddress: {
                addressLine1: '456 Benito Juárez',
                addressLine2: '',
                city: 'Monterrey',
                state: 'Nuevo León',
                zipcode: '64000',
                country: 'Mexico',
            },
        },
        {
            id: 9,
            name: 'Mia Davis',
            email: 'miadavis@company.com',
            country: 'Australia',
            state: 'Queensland',
            date: '25 Mar 2023',
            enddate: '25 Mar 2023',
            amount: '500.50',
            status: 'Paid',
            paymentMethods: ['PayPal'],
            cardDetails: {
                cardType: 'Visa',
                cardNumber: '**** **** **** 2345',
                expiryDate: '08/25',
                cardHolder: 'Mia Davis',
            },
            billingAddress: {
                addressLine1: '789 Park Street',
                addressLine2: '',
                city: 'Brisbane',
                state: 'Queensland',
                zipcode: '4000',
                country: 'Australia',
            },
        },
        {
            id: 10,
            name: 'Isabella Taylor',
            email: 'isabellataylor@company.com',
            country: 'UK',
            state: 'Manchester',
            date: '4 Jan 2023',
            enddate: '4 Jan 2023',
            amount: '1780.90',
            status: 'Paid',
            paymentMethods: ['Credit Card', 'PayPal'],
            cardDetails: {
                cardType: 'MasterCard',
                cardNumber: '**** **** **** 5567',
                expiryDate: '06/26',
                cardHolder: 'Isabella Taylor',
            },
            billingAddress: {
                addressLine1: '100 High Street',
                addressLine2: 'Flat 2A',
                city: 'Manchester',
                state: 'Manchester',
                zipcode: 'M1 1AA',
                country: 'UK',
            },
        },
        {
            id: 11,
            name: 'Alexander Lee',
            email: 'alexanderlee@company.com',
            country: 'Canada',
            state: 'Alberta',
            date: '20 May 2022',
            enddate: '20 May 2022',
            amount: '1340.75',
            status: 'Pending',
            paymentMethods: ['Bank Transfer'],
            cardDetails: {
                cardType: 'Visa',
                cardNumber: '**** **** **** 3333',
                expiryDate: '07/23',
                cardHolder: 'Alexander Lee',
            },
            billingAddress: {
                addressLine1: '22 River Road',
                addressLine2: 'Suite 101',
                city: 'Calgary',
                state: 'Alberta',
                zipcode: 'T2P 5H1',
                country: 'Canada',
            },
        },
        {
            id: 12,
            name: 'Lucas Harris',
            email: 'lucasharris@company.com',
            country: 'USA',
            state: 'Ohio',
            date: '14 Oct 2021',
            enddate: '14 Oct 2021',
            amount: '1450.30',
            status: 'Completed',
            paymentMethods: ['Credit Card', 'PayPal'],
            cardDetails: {
                cardType: 'American Express',
                cardNumber: '**** **** **** 7654',
                expiryDate: '10/24',
                cardHolder: 'Lucas Harris',
            },
            billingAddress: {
                addressLine1: '123 Oak Street',
                addressLine2: '',
                city: 'Cleveland',
                state: 'Ohio',
                zipcode: '44101',
                country: 'USA',
            },
        },
        {
            id: 13,
            name: 'Lily Green',
            email: 'lilygreen@company.com',
            country: 'USA',
            state: 'Arizona',
            date: '13 Sep 2021',
            enddate: '13 Sep 2021',
            amount: '1890.60',
            status: 'Paid',
            paymentMethods: ['PayPal'],
            cardDetails: {
                cardType: 'Visa',
                cardNumber: '**** **** **** 8763',
                expiryDate: '03/25',
                cardHolder: 'Lily Green',
            },
            billingAddress: {
                addressLine1: '890 Pine Street',
                addressLine2: '',
                city: 'Phoenix',
                state: 'Arizona',
                zipcode: '85001',
                country: 'USA',
            },
        },
        {
            id: 14,
            name: 'Elijah King',
            email: 'elijahking@company.com',
            country: 'Canada',
            state: 'Nova Scotia',
            date: '11 Mar 2020',
            enddate: '11 Mar 2020',
            amount: '1125.25',
            status: 'Paid',
            paymentMethods: ['Bank Transfer'],
            cardDetails: {
                cardType: 'MasterCard',
                cardNumber: '**** **** **** 1239',
                expiryDate: '01/23',
                cardHolder: 'Elijah King',
            },
            billingAddress: {
                addressLine1: '145 Birch Street',
                addressLine2: '',
                city: 'Halifax',
                state: 'Nova Scotia',
                zipcode: 'B3J 1A2',
                country: 'Canada',
            },
        },
        {
            id: 15,
            name: 'Ava Walker',
            email: 'avawalker@company.com',
            country: 'Australia',
            state: 'New South Wales',
            date: '30 Apr 2021',
            enddate: '30 Apr 2021',
            amount: '2200.00',
            status: 'Paid',
            paymentMethods: ['Credit Card'],
            cardDetails: {
                cardType: 'MasterCard',
                cardNumber: '**** **** **** 6790',
                expiryDate: '11/25',
                cardHolder: 'Ava Walker',
            },
            billingAddress: {
                addressLine1: '456 George Street',
                addressLine2: '',
                city: 'Sydney',
                state: 'New South Wales',
                zipcode: '2000',
                country: 'Australia',
            },
        },
        {
            id: 16,
            name: 'Benjamin Wright',
            email: 'benjaminwright@company.com',
            country: 'USA',
            state: 'Georgia',
            date: '20 Jul 2023',
            enddate: '20 Jul 2023',
            amount: '1400.00',
            status: 'Completed',
            paymentMethods: ['Bank Transfer'],
            cardDetails: {
                cardType: 'American Express',
                cardNumber: '**** **** **** 2349',
                expiryDate: '08/25',
                cardHolder: 'Benjamin Wright',
            },
            billingAddress: {
                addressLine1: '789 Rosewood Drive',
                addressLine2: '',
                city: 'Atlanta',
                state: 'Georgia',
                zipcode: '30301',
                country: 'USA',
            },
        },
        {
            id: 17,
            name: 'Charlotte Harris',
            email: 'charlotteharris@company.com',
            country: 'UK',
            state: 'Birmingham',
            date: '12 Feb 2023',
            enddate: '12 Feb 2023',
            amount: '1550.00',
            status: 'Paid',
            paymentMethods: ['PayPal'],
            cardDetails: {
                cardType: 'Visa',
                cardNumber: '**** **** **** 4320',
                expiryDate: '12/26',
                cardHolder: 'Charlotte Harris',
            },
            billingAddress: {
                addressLine1: '234 Kingsway',
                addressLine2: '',
                city: 'Birmingham',
                state: 'Birmingham',
                zipcode: 'B1 1AA',
                country: 'UK',
            },
        },
        {
            id: 18,
            name: 'Ethan Moore',
            email: 'ethanmoore@company.com',
            country: 'Canada',
            state: 'Quebec',
            date: '2 Aug 2023',
            enddate: '2 Aug 2023',
            amount: '2200.50',
            status: 'Paid',
            paymentMethods: ['Bank Transfer'],
            cardDetails: {
                cardType: 'MasterCard',
                cardNumber: '**** **** **** 9876',
                expiryDate: '01/27',
                cardHolder: 'Ethan Moore',
            },
            billingAddress: {
                addressLine1: '345 Rue Sainte-Catherine',
                addressLine2: '',
                city: 'Montreal',
                state: 'Quebec',
                zipcode: 'H3B 1A7',
                country: 'Canada',
            },
        },
        {
            id: 19,
            name: 'Grace Lewis',
            email: 'gracelewis@company.com',
            country: 'USA',
            state: 'Nevada',
            date: '25 Aug 2021',
            enddate: '25 Aug 2021',
            amount: '1700.30',
            status: 'Paid',
            paymentMethods: ['Credit Card'],
            cardDetails: {
                cardType: 'Visa',
                cardNumber: '**** **** **** 2211',
                expiryDate: '05/23',
                cardHolder: 'Grace Lewis',
            },
            billingAddress: {
                addressLine1: '101 Sunset Boulevard',
                addressLine2: 'Suite 110',
                city: 'Las Vegas',
                state: 'Nevada',
                zipcode: '89109',
                country: 'USA',
            },
        },
        {
            id: 20,
            name: 'Henry Scott',
            email: 'henryscott@company.com',
            country: 'Australia',
            state: 'Victoria',
            date: '9 Mar 2023',
            enddate: '9 Mar 2023',
            amount: '1185.10',
            status: 'Paid',
            paymentMethods: ['PayPal'],
            cardDetails: {
                cardType: 'MasterCard',
                cardNumber: '**** **** **** 7891',
                expiryDate: '10/24',
                cardHolder: 'Henry Scott',
            },
            billingAddress: {
                addressLine1: '765 Collins Street',
                addressLine2: '',
                city: 'Melbourne',
                state: 'Victoria',
                zipcode: '3000',
                country: 'Australia',
            },
        },
    ];
    deleteRow(item: any = null) {
        if (confirm('Are you sure want to delete selected row ?')) {
            if (item) {
                this.items = this.items.filter((d: any) => d.id != item);
                this.datatable.clearSelectedRows();
            } else {
                let selectedRows = this.datatable.getSelectedRows();
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                this.items = this.items.filter((d: any) => !ids.includes(d.id as never));
                this.datatable.clearSelectedRows();
            }
        }
    }
    selectedItem: any = null;
    isModalVisible = false;
    isEditMode = false;

    openModal(item: any, editMode = false) {
        this.selectedItem = { ...item }; // Clone item to avoid live editing
        this.isEditMode = editMode;
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
        this.selectedItem = null;
    }

    saveChanges() {
        if (this.isEditMode && this.selectedItem) {
            const index = this.items.findIndex((item) => item.id === this.selectedItem.id);
            if (index !== -1) {
                this.items[index] = { ...this.selectedItem }; // Save changes
            }
        }
        this.closeModal();
    }
    getUserData() {
        this.httpClient.get(this.url + 'api/users').subscribe(
            (response: any) => {
                console.log(response);
                this.clientData = response.users;
                console.log(this.clientData);
            },
            (error: any) => {
                console.log(error);
            },
        );
    }
}
