import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  customers: { id: number; name: string; country: { name: string; code: string; }; company: string; date: any; status: string; verified: boolean; activity: number; representative: { name: string; image: string; }; balance: number; }[];

  representatives: any;

  statuses: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  orders: any;

  selectedOrderId: number;

  orderDetails: TreeNode[];

  displayModal: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

    this.orders = [
      {
        "orderId": 1000,
        "status": "scheduled",
        "orderDate": "2015-09-13",
        "trackingId": 'TNO1000',
        "deliveryDate": "2015-09-23"
      },
      {
        "orderId": 1001,
        "status": "processing",
        "orderDate": "2015-08-13",
        "trackingId": 'TNO1001',
        "deliveryDate": "2015-08-23"
      },
      {
        "orderId": 1004,
        "status": "delivered",
        "orderDate": "2015-09-10",
        "trackingId": 'TNO1004',
        "deliveryDate": "2015-09-16"
      }]

    this.orderDetails = [
      {
        "label": "Order Details",
        "data": "",
        "expandedIcon": "pi pi-sitemap",
        "collapsedIcon": "pi pi-sitemap",

        "children": [{ "label": "Shipment 1", "icon": "pi-ellipsis-h", "data": "" }, { "label": "Shipment 1", "icon": "pi-ellipsis-h", "data": "" }]

      }
    ]

    this.orders.forEach(
      order => (order.date = new Date(order.date))
    );
  }

  showModalDialog(content, orderId) {
    this.selectedOrderId = orderId;
    this.displayModal = true;
  }

  onclick(content, orderId) {
    console.log(orderId);


    this.modalService.open(content)
  }
}
