import { Message, MessageService } from 'primeng/api';
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
  providers: [ConfirmationService, MessageService]
})
export class TableComponent implements OnInit {

  customers: { id: number; name: string; country: { name: string; code: string; }; company: string; date: any; status: string; verified: boolean; activity: number; representative: { name: string; image: string; }; balance: number; }[];

  representatives: any;

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  orders: any;

  selectedOrderId: number;

  orderDetails: TreeNode[];

  displayModal: boolean;

  msgs: Message[] = [];

  editAddressMode: boolean = false;

  selOrderAddress: any;

  editedAddress: string;

  constructor(private modalService: NgbModal, private confirmationService: ConfirmationService, private ordersService: OrdersService, private messageService: MessageService) { }

  ngOnInit() {

    this.ordersService.fetchOrders().subscribe((res) => {
      this.orders = res;
      this.loading = false;
    })

    // this.orders = [
    //   {
    //     "orderId": 1000,
    //     "status": "scheduled",
    //     "orderDate": "2015-09-13",
    //     "trackingId": 'TNO1000',
    //     "deliveryDate": "2015-09-23"
    //   },
    //   {
    //     "orderId": 1001,
    //     "status": "processing",
    //     "orderDate": "2015-08-13",
    //     "trackingId": 'TNO1001',
    //     "deliveryDate": "2015-08-23"
    //   },
    //   {
    //     "orderId": 1004,
    //     "status": "delivered",
    //     "orderDate": "2015-09-10",
    //     "trackingId": 'TNO1004',
    //     "deliveryDate": "2015-09-16"
    //   }]

    this.orderDetails = [
      {
        "label": "Order Details",
        "data": "",
        "expandedIcon": "pi pi-sitemap",
        "collapsedIcon": "pi pi-sitemap",
        "children": [{
          "label": "Shipment 1",
          "data": "",
          "expandedIcon": "pi pi-sitemap",
          "collapsedIcon": "pi pi-sitemap",
          "children": [{ "label": "Cancel", "icon": "pi pi-minus-circle", "data": "" }]
        },
        {
          "label": "Shipment 2",
          "data": "",
          "expandedIcon": "pi pi-sitemap",
          "collapsedIcon": "pi pi-sitemap",
          "children": [{ "label": "Cancel", "icon": "pi pi-minus-circle", "data": "" }]
        }]
      }
    ]

    this.orders?.forEach(
      order => order
    );
  }

  nodeSelect(event) {
    if (event.node.label == 'Cancel') {
      console.log('Shipment Cancelled')
    }

  }

  openEditOrder(orderId) {
    this.editAddressMode = false;
    this.selOrderAddress = this.orders.filter((order) => { return order.orderId == orderId })[0].shippingAddress;
    this.editedAddress = this.selOrderAddress;
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

  onSubmitAddress() {
    console.log(this.editedAddress);

  }

  onCancelEdit() {
    this.editAddressMode = false;
  }
}
