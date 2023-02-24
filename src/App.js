import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap"; //Kendisi otomatik olarak bunu ekledi eklemezse bunu manual eklememiz gerek
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList"; // title bir reserved word değil herhangi bir şey olabilir
import alertify from "alertifyjs";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };
  changeCategory = (kategoriiii) => {
    this.setState({ currentCategory: kategoriiii.categoryName });
    // set state diyince set state içindekilerle ilgili olan yerler farklı dosyada bile olursa olsun ilgili yerler tekrar render edilir.
    this.getProducts(kategoriiii.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  componentDidMount() {
    this.getProducts();
  }
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addeditem = newCart.find((c) => c.product.id === product.id);
    if (addeditem) {
      addeditem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    // gönderdiğim eleman dışındakileri filtrele, filtrelenenler yeni elemanlarımdır.
    alertify.success(product.productName + "  Sepete Eklendi");
    //alertify paketi ile alertledik
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
  };
  decreaseProduct = (product) => {
    let newCart = this.state.cart;
    var addeditem = newCart.find((c) => c.product.id === product.id);
    if (addeditem) {
      addeditem.quantity += -1;
      this.setState({ cart: newCart });
    }
    if (addeditem.quantity < 1) {
      this.removeFromCart(addeditem.product);
    }
  };
  render() {
    let title_category =
      "Category  List is coming from app.js with props yapısı";
    let productInfo = {
      title: "Product Lİst yapısı encapsulation ile bu sekilde yapılır...",
      baskabirsey: "-----------baskabisey---------------",
    };
    return (
      <div className="App">
        <Container>
          <Navi
            decreaseProduct={this.decreaseProduct}
            removeFromCart={this.removeFromCart}
            products={this.state.products}
            cart={this.state.cart}
          />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                title={title_category}
              />
              {/* categoryList e fonksiyon yolladık */}
            </Col>
            <Col xs="9">
              <BrowserRouter>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <ProductList
                        addToCart={this.addToCart}
                        products={this.state.products}
                        currentCategory={this.state.currentCategory}
                        info={productInfo}
                      />
                    }
                  />
                  {/* // localhost açıldığında direk Anasayfa yani productList  açılsın demek bir üstteki kod */}
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/cart"
                    element={
                      <CartList
                        cart={this.state.cart}
                        removeFromCart={this.removeFromCart}
                        decreaseProduct={this.decreaseProduct}

                      />
                    }
                  />
                </Routes>
              </BrowserRouter>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
