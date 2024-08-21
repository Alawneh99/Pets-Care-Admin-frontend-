export class Item {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    isHaveDiscount: boolean;
    discountAmount: number;
    discountType: string;
    categoryID: number;
    orderId: number;
  
    constructor(
      id: number,
      name: string,
      description: string,
      image: string,
      price: number,
      quantity: number,
      isHaveDiscount: boolean,
      discountAmount: number,
      discountType: string,
      categoryID: number,
      orderId: number
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = image;
      this.price = price;
      this.quantity = quantity;
      this.isHaveDiscount = isHaveDiscount;
      this.discountAmount = discountAmount;
      this.discountType = discountType;
      this.categoryID = categoryID;
      this.orderId = orderId;
    }
  }
  