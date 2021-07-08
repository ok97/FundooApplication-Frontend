import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  constructor() { }

  ngOnInit(): void {
  }
  logout() {
    // this.utility.displayMessage("Logout successfully")
    // localStorage.removeItem('Token')
    // localStorage.removeItem('EmployeeFirstName')
     localStorage.removeItem('Email')
    // this.route.navigate(['login'])
  }
}
