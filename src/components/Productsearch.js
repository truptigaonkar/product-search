import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./Productsearch.css";
import { URL } from "../components/config";
import Productlist from "../components/Productlist";

class Productsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      products: [],
      alertShow: false
    };
  }

  getProduct = e => {
    e.preventDefault();
    const productToSearch = e.target.elements.product.value;
    axios
      .post(`${URL}?q=product.name:${productToSearch}`)
      .then(res => {
        console.log(res.data.hits.hits);
        this.setState({
          products: res.data.hits.hits,
          alertShow: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          errorMessage: "Please fill in the Product Name",
          alertShow: true
        });
      });
    e.target.reset(); // making input empty
  };

  render() {
    const { alertShow } = this.state;
    const { errorMessage } = this.state;
    const { products } = this.state;
    return (
      <div>
        <Helmet>
          <title>Product Search</title>
        </Helmet>
        <div className="message">
          {alertShow && (
            <div className="alert alert-warning">
              <span>Warning! </span>
              {errorMessage}
            </div>
          )}
        </div>
        <div className="form">
          <form onSubmit={this.getProduct}>
            <input
              type="text"
              id="product"
              className="form__field"
              placeholder="Search here...."
            />
            <label for="product" className="form__label">
              Search here....
            </label>
          </form>
        </div>
        <Productlist products={products} />
      </div>
    );
  }
}

export default Productsearch;
