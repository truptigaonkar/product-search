import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

class Productsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      successMessage: "",
      products: []
    };
  }

  // Disappear error message after 2000sec.
  componentDidUpdate() {
    setTimeout(() => this.setState({ errorMessage: "" }), 2000);
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
        this.setState({
          products: res.data.hits.hits,
          successMessage: "Product list is as follow:"
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          errorMessage: "Please fill in the product"
        });
      });
    e.target.reset(); // making input empty
  };

  render() {
    if (!this.state.products) {
      return <p>Loading products...</p>;
    }
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
        <p style={{ color: "green" }}>{this.state.successMessage}</p>
        <table border="1">
          <thead>
            <tr>
              <th>Product Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => (
              <tr>
                {product._source && <td>{product._source.product.name}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Productsearch;
