export class Orders {
    constructor(
        public orderId: number,
        public deliveryDate: string,
        public orderDate: string,
        public role: string,
        public status: string,
        public trackingId: string
    ) { }
}