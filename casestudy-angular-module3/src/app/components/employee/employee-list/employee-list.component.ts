import { Component, OnInit } from '@angular/core';
import { employeeArr } from '../../../models/employee/Employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeArr = employeeArr;

  constructor() { }

  ngOnInit(): void {
  }

}
