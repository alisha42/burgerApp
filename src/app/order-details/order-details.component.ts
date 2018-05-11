import { Component, OnInit } from '@angular/core';
import { RestServicesService } from '../services/rest-services.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderlist: object[];

  constructor(private restService: RestServicesService) { }

  ngOnInit() {
    this.orderlist = this.restService.getOrderList();
  }


  onSubmit() {
    alert('Your order is placed successfully.It will be delived within one hour');
  }
}
