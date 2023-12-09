import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  // baseAPI: String = "http://localhost:8080/api/v1/bank";
  constructor(
    private http: HttpClient
  ) { }

  addBank(bank: any): Observable<any> {
    return this.http.post(environment.baseAPI + "", bank)
  }
  
  updateBank(bank: any, id: string): Observable<any> {
    return this.http.put(environment.baseAPI+"/"+ id, bank)
  }

  deleteBank(id: string) {
    this.http.delete(environment.baseAPI+"/" + id)
  }

  getAllBanks(): Observable<any> {
    return this.http.get(environment.baseAPI + "")
  }
}
