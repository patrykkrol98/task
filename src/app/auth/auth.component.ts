import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  selectedTab!: number;
  forgotPasswordMode: any;

  constructor() { }

  ngOnInit(): void { }

  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex
  }

  forgotPassword(flag: boolean) {
    this.forgotPasswordMode = flag;
  }

}
