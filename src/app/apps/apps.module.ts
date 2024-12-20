import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// shared module
import { SharedModule } from 'src/shared.module';

import { ScrumboardComponent } from './scrumboard';
import { ContactsComponent } from './contacts';
import { NotesComponent } from './notes';
import { TodolistComponent } from './todolist';
import { InvoicePreviewComponent } from './invoice/preview';
import { InvoiceAddComponent } from './invoice/add';
import { InvoiceEditComponent } from './invoice/edit';
import { CalendarComponent } from './calendar';
import { ChatComponent } from './chat';
import { MailboxComponent } from './mailbox';
import { InvoiceListComponent } from './invoice/list';
import { UserPanelsModule } from '../user-panels/user-panels.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../service/token-interceptor.service';
import { AdminPanelsModule } from '../admin-panels/admin-panels.module';
import { AuthModule } from '../auth/auth.module';

const routes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('../user-panels/user-panels.module').then((m) => m.UserPanelsModule),
    },
    {
        path: 'admin',
        loadChildren: () => import('../admin-panels/admin-panels.module').then((m) => m.AdminPanelsModule),
    },
    // { path: 'auth', loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule) },
    // { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule.forRoot()],
    declarations: [
        ChatComponent,
        ScrumboardComponent,
        ContactsComponent,
        NotesComponent,
        TodolistComponent,
        InvoiceListComponent,
        InvoicePreviewComponent,
        InvoiceAddComponent,
        InvoiceEditComponent,
        CalendarComponent,
        MailboxComponent,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
})
export class AppsModule {}
