import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Style from "./Productsearch.module.css";
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
        console.log(res.status);
        this.setState({
          products: res.data.hits.hits,
          alertShow: false
        });
        if (res.status === 200) {
          this.setState({ errorMessage: "Empty array" });
        }
      })
      .catch(error => {
        console.log("new", error);
        if (error.response.status === 400) {
          this.setState({
            errorMessage: "Please fill in the Product Name",
            alertShow: true
          });
        } else {
          this.setState({
            errorMessage: "Something went wrong",
            alertShow: true
          });
        }
      });
    e.target.reset(); // making input empty
  };

  render() {
    const { alertShow } = this.state;
    const { errorMessage } = this.state;
    const { products } = this.state;
    if (products === null) {
      return <p>Fetching product...</p>;
    }
    return (
      <div>
        <Helmet>
          <title>Product Search</title>
        </Helmet>
        <div className={Style.message}>
          {alertShow && (
            <div className={`${Style.alert} ${Style.alertWarning}`}>
              <span>Warning! </span>
              {errorMessage}
            </div>
          )}
        </div>
        <div className={Style.form}>
          <form onSubmit={this.getProduct}>
            <input
              type="text"
              id="product"
              className={Style.form__field}
              placeholder="Search here...."
            />
            <label for="product" className={Style.form__label}>
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
