import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TextField, Card, CardContent, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import NumberFormat from "react-number-format";
import "./Productsearch.css";
import { URL } from "../components/config";

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
        <div>{alertShow && <Alert severity="error">{errorMessage}</Alert>}</div>
        <form onSubmit={this.getProduct}>
          <TextField
            id="standard-basic"
            name="product"
            label="Product"
            placeholder="Search for ... e.g.apple"
          />
        </form>
        <div className="product-card">
          {products.map(product => (
            <Card style={{ width: 275, margin: "10px" }}>
              <CardContent key={product._source.id}>
                {product._source.product.media.product_images ? (
                  <img
                    src={
                      product._source.product.media.product_images.first[140]
                    }
                    alt="product"
                  />
                ) : null}
                <Typography variant="h5" component="h2">
                  {product._source && <div>{product._source.product.name}</div>}
                </Typography>
                <Typography color="textSecondary">
                  Dropped Percentage: {product._source.price.diff_percentage}
                  <br />
                  Formatted Price:{" "}
                  <NumberFormat
                    value={product._source.price.offer}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"kr"}
                  />
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Productsearch;
