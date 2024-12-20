import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-submitted-answers',
    templateUrl: './submitted-answers.component.html',
    styles: ``,
})
export class SubmittedAnswersComponent implements OnInit {
    url = environment.apiUrl;

    userId: any = '';
    submittedAnswers: any = [];

    responses: any = [];

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.userId = this.getUserId();
        console.log(this.userId);
        this.getUserSubmittedAnswers(this.userId);
    }

    toggleAnswer(index: number): void {
        this.responses.forEach((response: { showAnswer: boolean }, i: number) => {
            response.showAnswer = i === index ? !response.showAnswer : false;
        });
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

    getUserSubmittedAnswers(userId: any) {
        this.httpClient.get(`${this.url}api/user/${userId}/answers`).subscribe(
            (response: any) => {
                // console.log(response);
                this.submittedAnswers = response.answers;
                this.responses = this.transformApiResponse(this.submittedAnswers);
                console.log(this.responses);
            },
            (error: any) => {
                console.log(error);
            },
        );
    }
    transformApiResponse(apiResponse: any[]): { id: number; question: string; response: string; showAnswer: boolean }[] {
        return apiResponse.map((item, index) => ({
            id: item.userId,
            question: item.questionText,
            response: item.answer,
            showAnswer: false,
        }));
    }
}
