import { Component, OnInit } from '@angular/core';
import { RestServicesService } from '../services/rest-services.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  burgerlist: object[];
  searchtext: string;
  burgerOriginalList: object[];
  priceRange: string[];
  foodCategory: string[];
  ratings: number[];
  selectedType: string = '';
  orderList: string[];

  constructor(private restService: RestServicesService) { }

  ngOnInit() {
    this.priceRange = ['50-100', '100-200', '300-400', '400-500'];
    this.ratings = [5, 4, 3, 2, 1];
    this.foodCategory = ['veg', 'non veg'];
    this.restService.getBurgetList().subscribe((response: any) => {
      console.log(response);
      this.burgerlist = response;
      this.burgerOriginalList = response;
    }, (err) => {
      console.log(err);
      alert("Internal server error");
    });
  }


  onFilterChange(data, filterType) {
    this.selectedType = data; let arr;
    if (filterType === 'category') {
      arr = this.burgerOriginalList.filter((item: any) => {
        if (item.category === data)
          return item;
      })
    }
    else if (filterType === 'price') {
      let amount = data.split('-');
      arr = this.burgerOriginalList.filter((item: any) => {
        if (parseFloat(item.discountedPrice) >= parseFloat(amount[0]) && parseFloat(item.discountedPrice) <= parseFloat(amount[1]))
          return item;
      })
    }

    else if (filterType === 'rating') {
      arr = this.burgerOriginalList.filter((item: any) => {
        if (item.rating === data.toString())
          return item;
      })
    }

    this.burgerlist = arr;

  }

  searchBurger() {
    if (this.searchtext && this.burgerlist.length) {
      let arr = this.burgerOriginalList.filter((item: any) => {
        if (item.name.toLowerCase() === this.searchtext.toLowerCase())
          return item;
      })
      this.burgerlist = arr;
    }
    else {
      this.burgerlist = this.burgerOriginalList;
    }
  }

  addItem(item) {
    this.restService.pushDataInOrderList(item);
  }


}
