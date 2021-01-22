import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Orders } from '../models/orders.model';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {

    constructor(private http: HttpClient) { }

    fetchOrders() {
        return this.http
            .get(
                "https://ecommerce-management-28ea9-default-rtdb.firebaseio.com/orders.json"
            )
            .pipe(
                take(1),
                map((responseData) => {
                    let ordersArray: Orders;
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            ordersArray = { ...responseData[key] };
                        }
                    }
                    return ordersArray;
                })
            );
    }
}