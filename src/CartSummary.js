import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class CartSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Sepet - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>
              <Badge
                onClick={() => this.props.removeFromCart(cartItem.product)}
                color="danger"
              >
                Sil
              </Badge>
              <Badge
                onClick={() => this.props.decreaseProduct(cartItem.product)}
                color="dark"
              >
                azalt
              </Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem><Link to="/cart">Sepete git</Link></DropdownItem>


            
          {/* // sepete ekleyince cart yerine gidiyoruz ancak sayfa yenilenmiş oluyor o yüzden sepet boşalıyor normalde 
            // bu sayede sepet boşalmamış oldu ----İMPORT UNUTULMAMALI -react router doom'dan gelir.- */}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  renerEmpyCart() {
    return (
      <NavItem>
        <NavLink>Sepet Boş</NavLink>
      </NavItem>
    );
  }
  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renerEmpyCart()}
      </div>
    );
  } // eğer sepete eklenmiş eleman varsa sepeti göster eğer sepet boş ise boş olduğunu göster
}
