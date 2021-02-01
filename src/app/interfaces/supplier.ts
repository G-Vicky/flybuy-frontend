export interface ISupplier {
  _id: string;
  company: String;
  contactName: String;
  phone: Number;
  country: String;
  products: [
    {
      productName: String;
      productPrice: Number;
      productDescription: String;
    }
  ];
  createdAt: Number;
}
