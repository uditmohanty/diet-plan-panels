import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { PaymentsComponent } from './payments/payments.component';
import { SharedModule } from 'src/shared.module';

const routes:Routes = [
  { path: 'clients', component: ClientsComponent, data: { title: 'Clients' } },
  { path: 'doc-upload', component: DocumentUploadComponent, data: { title: 'Document Upload' } },
  { path: 'payments', component: PaymentsComponent, data: { title: 'Payments' } },
]


@NgModule({
  declarations: [ClientsComponent,DocumentUploadComponent,PaymentsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule.forRoot()],
})
export class AdminPanelsModule { }
