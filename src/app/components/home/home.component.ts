import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    loggedIn: boolean = false;

    constructor(private userCookie: UserService,
        private router: Router) { }

    ngOnInit(): void {
        const session = this.userCookie.getSessionCookie();
        if (session.access_token) {
            this.loggedIn = true;
        }
    }

    logout() {
        this.loggedIn = false;
        this.userCookie.clearSessionCookie();
        this.router.navigate(['/login'])
    }
}
