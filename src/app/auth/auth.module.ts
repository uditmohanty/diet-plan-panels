import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// shared module
import { SharedModule } from 'src/shared.module';

import { BoxedLockscreenComponent } from './boxed-lockscreen';
import { BoxedPasswordResetComponent } from './boxed-password-reset';
import { BoxedSigninComponent } from './boxed-signin';
import { BoxedSignupComponent } from './boxed-signup';
import { CoverLockscreenComponent } from './cover-lockscreen';
import { CoverLoginComponent } from './cover-login';
import { CoverPasswordResetComponent } from './cover-password-reset';
import { CoverRegisterComponent } from './cover-register';

const authRoutes: Routes = [
    { path: 'login', component: BoxedSigninComponent, data: { title: 'Login' } },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forChild(authRoutes), CommonModule, SharedModule.forRoot()],
    declarations: [
        BoxedLockscreenComponent,
        BoxedPasswordResetComponent,
        BoxedSigninComponent,
        BoxedSignupComponent,
        CoverLockscreenComponent,
        CoverLoginComponent,
        CoverPasswordResetComponent,
        CoverRegisterComponent,
    ],
})
export class AuthModule {}
