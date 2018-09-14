import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Branch AngularCrud-V2
// Test commit to new Branch
@Injectable()
export class EmployeeService {
    constructor(private _httpClient: HttpClient) { }
    baseUrl = 'http://localhost:3000/employees';
    getEmployees(): Observable<Employee[]> {
        return this._httpClient.get<Employee[]>(this.baseUrl).pipe(catchError(this.handleError));
        // return of(this.listEmployees).pipe(delay(2000));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client side error : ', errorResponse.error.message);
        } else {
            console.error('Server side error : ', errorResponse);
        }

        return throwError('There is the problem with the service. We are notified and working on it. Please try again later.');
    }

    getEmployee(id: Number): Observable<Employee> {
        return this._httpClient.get<Employee>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this._httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(catchError(this.handleError));
    }

    updateEmployee(employee: Employee): Observable<void> {
        return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(catchError(this.handleError));
    }


    deleteEmployee(id: number): Observable<void> {
        return this._httpClient.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
    }
}
