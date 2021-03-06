import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Array<Product>;
  private srcUrl = 'http://placehold.it/320x150';
  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1, '第一个商品吧', 1.99, 3.5, '这是我的angular-demo中的第一个商品', ['电子商品', '硬件设备']),
      new Product(2, '第二个商品吧', 2.99, 4.5, '这是我的angular-demo中的第二个商品', ['图书']),
      new Product(3, '第三个商品吧', 3.99, 1.5, '这是我的angular-demo中的第三个商品', ['硬件设备']),
      new Product(4, '第四个商品吧', 4.99, 2.5, '这是我的angular-demo中的第四个商品', ['电子商品', '硬件设备']),
      new Product(5, '第五个商品吧', 5.99, 3.5, '这是我的angular-demo中的第五个商品', ['图书']),
      new Product(6, '第六个商品吧', 6.99, 4.5, '这是我的angular-demo中的第六个商品', ['硬件设备'])
    ];
    this.products.push(new Product(7, '第六个商品吧', 6.99, 4.5, '这是我的angular-demo中的第六个商品', ['硬件设备']));
  }

}
export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>

  ) {
  }
}