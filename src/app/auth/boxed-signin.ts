import { Component } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './boxed-signin.html',
    animations: [toggleAnimation],
})
export class BoxedSigninComponent {
    email: string = '';
    txtPassword: string = '';
    store: any;
    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService,
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

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }

    onSubmit(): void {
        console.log('Email:', this.email);
        console.log('Password:', this.txtPassword);
        this.appSetting
            .login(this.email, this.txtPassword)
            .pipe(first())
            .subscribe(
                (data) => {
                    alert('User Login Successfully');
                    this.router.navigate(['/']);
                },
                (error) => {
                    console.log(error, 'Login Error');

                    alert('user name or password is invalid');
                },
            );
    }
}
