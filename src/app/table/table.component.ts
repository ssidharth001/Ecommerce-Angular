import { Message } from 'primeng/api';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { OrdersService } from '../services/order-details.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService]
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

  msgs: Message[] = [];

  editAddressMode: boolean = false;

  constructor(private modalService: NgbModal, private confirmationService: ConfirmationService, private ordersService: OrdersService) { }

  ngOnInit() {

    this.ordersService.fetchOrders().subscribe((res) => console.log(res))

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

  openEditOrder(content, orderId) {
    this.editAddressMode = false;
    this.selectedOrderId = orderId;
    this.displayModal = true;
  }

  confirmDelete(orderId) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        console.log('deleted');

      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        console.log('not deleted');
      }
    });
  }

  onEditAddress() {
    this.editAddressMode = true;
    console.log('done');
  }

  onCancelEdit() {
    this.editAddressMode = false;
  }
}
