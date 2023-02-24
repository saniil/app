import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap"; //import etmemiz şart manuel

export default class CategoryList extends Component {
  // constructor(props) {
  //   //constructor şart değildir artık direk olarak state = yapabilirdik...
  //   super(props); // props'ı compenentimize(CategoryList) taşımış olduk     // süslü parantes '{}' ben js kodu başlatcam demektir...
  //   //this yapısı normal c# java'daki gibi CategoryList'e değil Component Class'ına ait olur
  //   this.state = {
  //     categories: [
  //       { categoryId: 1, categoryName: "Baverages" },
  //       { categoryId: 2, categoryName: "Condiments" },
  //       { categoryId: 3, categoryName: "Pepsi" },
  //     ],
  //     currentCategory: ""
  //   };
  state = {
    categories: [],
  };
  getCategories=()=>{
    fetch("http://localhost:3000/categories").then(response=>response.json()).then(data=>this.setState({categories:data}))
  }
  //component yerleşti içini doldur artık demek için alttaki fonksiyon kullanılabilir.
  componentDidMount(){
    this.getCategories();
  }
  
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ListGroup>
          {this.state.categories.map((kategoriiii) => (
            <ListGroupItem active={kategoriiii.categoryName===this.props.currentCategory?true:false} 
              onClick={() => this.props.changeCategory(kategoriiii)}
              key={kategoriiii.id}
              color="info"
            >
              {kategoriiii.categoryName}
            </ListGroupItem>
          ))}
          {/*  ListGroupItem 3 data kategori olduğu için 3 kere çalışmalı */}
        </ListGroup>
        {/* <h4>{this.props.currentCategory}</h4> */}
      </div>
    );
  }
}
