import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css']
})
export class EmployeesDetailsComponent implements OnInit {
  employee: Employee;
  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService) { }

  ngOnInit() {
    const id =  +this._route.snapshot.paramMap.get('id');
    this.employee = this._employeeService.getEmployee(id);
  }

}
