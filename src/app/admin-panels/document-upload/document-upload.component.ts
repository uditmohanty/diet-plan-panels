import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-document-upload',
    templateUrl: './document-upload.component.html',
    styles: ``,
})
export class DocumentUploadComponent implements OnInit {
    url = environment.apiUrl;
    clientData: any = [];

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.getUserData();
    }

    selectedClient: any = '';
    selectedFile: File | null = null;
    uploadedPlans: { clientId: number; clientName: string; fileUrl: string }[] = [
        {
            clientId: 1,
            clientName: 'John Doe',
            fileUrl: 'https://example.com/uploads/john_doe_diet_plan.pdf',
        },
        {
            clientId: 2,
            clientName: 'Jane Smith',
            fileUrl: 'https://example.com/uploads/jane_smith_diet_plan.pdf',
        },
    ];

    userDocuments: any = [];
    isEditMode: boolean = false;
    editingClientId: number | null = null;

    // Handle file selection
    onFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input?.files?.length) {
            this.selectedFile = input.files[0];
        }
    }

    // Clear form
    clearForm(): void {
        this.selectedClient = null;
        this.selectedFile = null;
        this.isEditMode = false;
        this.editingClientId = null;
    }

    // Upload or update diet plan
    uploadDietPlan(): void {
        if (this.selectedFile && this.selectedClient) {
            const client = this.clientData.find((c: { id: any }) => c.id === this.selectedClient);
            if (client) {
                const mockFileUrl = `https://example.com/uploads/${this.selectedFile.name}`;

                if (this.isEditMode && this.editingClientId !== null) {
                    const planIndex = this.uploadedPlans.findIndex((p) => p.clientId === this.editingClientId);
                    if (planIndex !== -1) {
                        this.uploadedPlans[planIndex].fileUrl = mockFileUrl;
                        alert('Diet plan updated successfully!');
                    }
                } else {
                    this.uploadedPlans.push({
                        clientId: client.id,
                        clientName: client.name,
                        fileUrl: mockFileUrl,
                    });
                    alert('Diet plan uploaded successfully!');
                }

                this.clearForm();
            }
        }
    }

    // Edit an existing diet plan
    editDietPlan(plan: { clientId: number; clientName: string; fileUrl: string }): void {
        this.isEditMode = true;
        this.editingClientId = plan.clientId;
        this.selectedClient = plan.clientId;
    }

    // Handle file selection
    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0]; // Get the first selected file
    }

    // Upload the selected file directly in the component
    onUpload(): void {
        if (this.selectedFile) {
            const formData: FormData = new FormData();
            formData.append('Documents', this.selectedFile, this.selectedFile.name); // Attach file to the form data

            // API endpoint to upload the document
            this.httpClient
                .post(`${this.url}api/user/${this.selectedClient}/documents`, formData, {
                    headers: new HttpHeaders().set('Accept', '*/*'),
                })
                .subscribe(
                    (response) => {
                        console.log('Upload successful:', response);
                    },
                    (error) => {
                        console.error('Upload failed:', error);
                    },
                );
        } else {
            console.error('No file selected!');
        }
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

    getUserDocData(userId: any) {
        this.httpClient.get(`${this.url}api/user/${userId}/documents`).subscribe(
            (response: any) => {
                console.log(response);
                this.transformDocuments(response);
            },
            (error: any) => {
                console.log(error);
            },
        );
    }

    transformDocuments(response: any) {
        if (response && response.isSuccess && Array.isArray(response.documents)) {
            this.userDocuments = response.documents.map((doc: { id: any; name: any; path: any }) => ({
                id: doc.id,
                name: doc.name,
                path: `${this.url}${doc.path}`,
            }));
        } else {
            this.userDocuments = []; // Clear the array if the response is invalid
        }
    }

    deleteUserDocument(documentId: string) {
        const requestBody = { id: documentId };

        this.httpClient.delete(`${this.url}api/user/${this.selectedClient}/documents`, { body: requestBody }).subscribe(
            (response: any) => {
                console.log(`Document with ID ${documentId} deleted successfully for user ${this.selectedClient}.`);

                // Remove the deleted document from the userDocuments array
                this.userDocuments = this.userDocuments.filter((doc: { id: string }) => doc.id !== documentId);
            },
            (error: any) => {
                console.error(`Error deleting document with ID ${documentId} for user ${this.selectedClient}:`, error);
            },
        );
    }
}
