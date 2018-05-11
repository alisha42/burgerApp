import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestServicesService {

  orderList: any = [];
  constructor(private http: HttpClient) { }

  getBurgetList() {
    return this.http.get('http://demo8381899.mockable.io/bugerList');
  }

  pushDataInOrderList(item) {
    this.orderList.push(item)
  }

  getOrderList() {
    return this.orderList;
  }

}
