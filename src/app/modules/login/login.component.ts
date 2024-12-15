import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { Login } from '../core/auth.service';
import { LoginStore } from './service/login.store';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NzMessageModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [LoginStore],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    public loginOrRegister = signal<boolean>(true);
    protected formBuilder = inject(FormBuilder);
    protected readonly router = inject(Router);
    private store = inject(LoginStore);

    private readonly activeTitleLogin = {
        text: 'Sign in to your account',
        recommend: 'Don’t have an account yet',
        req: 'Remember me',
        action: 'Sign up',
        call: 'Sign In',
    };

    private readonly activeTitleRegister = {
        text: 'Register for your account',
        recommend: 'Already have an account',
        req: 'I accept the Terms and Conditions',
        action: 'Login here',
        call: 'Create an account',
    };

    constructor() {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        if (this.router.url.includes('/login')) {
            this.loginOrRegister.set(true);
        } else if (this.router.url.includes('/register')) {
            this.loginOrRegister.set(false);
        }
    }

    get f() {
        return this.loginForm.controls;
    }

    titleSignupOrRegister = computed(() =>
        this.loginOrRegister()
            ? this.activeTitleLogin
            : this.activeTitleRegister
    );

    register() {
        this.loginOrRegister.set(!this.loginOrRegister());
        this.loginOrRegister()
            ? this.router.navigate(['/welcome/login'])
            : this.router.navigate(['/welcome/register']);
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            // return;
        }
        const login: Login = {
            userName: this.f['userName'].value,
            password: this.f['password'].value,
        };
        this.loginOrRegister()
            ? this.store.login(login)
            : this.store.register(login);
    }
}
