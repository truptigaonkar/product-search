import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

class Productsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
  }
  getProduct = e => {
    e.preventDefault();
    const productToSearch = e.target.elements.product.value;
    axios
      .post(
        `https://search-pj-campaigns-dykc3wbnqz22xvoiwp2ta5bk3m.eu-west-1.es.amazonaws.com/campaign-*-4-deals/_search?q=product.name:${productToSearch}`
      )
      .then(res => {
        console.log(res.data.hits.hits);
        this.setState({ products: res.data.hits.hits });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 400) {
          this.setState({
            errorMessage: "Please fill in the product"
          });
        }
      });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Product Search</title>
        </Helmet>
        <h3>Product Search</h3>
        <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        <form onSubmit={this.getProduct}>
          <input type="text" name="product" placeholder="Enter Product..." />
          <button>Get Product</button>
        </form>
      </div>
    );
  }
}

export default Productsearch;
