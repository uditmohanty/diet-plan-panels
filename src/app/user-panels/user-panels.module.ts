import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared.module';
import { MyPlanComponent } from './my-plan/my-plan.component';
import { DietPlanDownloadComponent } from './diet-plan-download/diet-plan-download.component';
import { SubmittedAnswersComponent } from './submitted-answers/submitted-answers.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../service/token-interceptor.service';

const routes: Routes = [
    { path: 'my-plan', component: MyPlanComponent, data: { title: 'My Plan' } },
    { path: 'plan-download', component: DietPlanDownloadComponent, data: { title: 'Plan Download' } },
    { path: 'ans-submitted', component: SubmittedAnswersComponent, data: { title: 'Submitted Answers' } },
];
@NgModule({
    declarations: [MyPlanComponent, DietPlanDownloadComponent, SubmittedAnswersComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule.forRoot()],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
})
export class UserPanelsModule {}
