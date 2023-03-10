import React, { Component } from "react";
import { Table,Button } from "reactstrap";

export default class ProductList extends Component {
  
  render() {
    return (
      <div>
        <h3>{this.props.info.baskabirsey}</h3>
        <h3>
          {this.props.info.title}-{this.props.currentCategory}
        </h3>
        {/* // kategoriden productliste veri gönderilmiş oldu bu yapı sayesinde... */}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>productName</th>
              <th>quantityPerUnit</th>
              <th>unitPrice</th>
              <th>unitsInStock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                {" "}
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <Button color="info" onClick={()=>this.props.addToCart(product)}>Sepete Ekle</Button>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
