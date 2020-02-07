import React from "react";
import NumberFormat from "react-number-format";
import Style from "./Productlist.module.css";

const Productlist = props => {
  const { products } = props;
  return (
    <div>
      {products ? (
        products.map(product => (
          <div className={`${Style.card} ${Style.cardBox}`}>
            <div className={Style.card__content} key={product._source.id}>
              <div className={Style.card__image}>
                {product._source.product.media.product_images ? (
                  <img
                    src={
                      product._source.product.media.product_images.first[140]
                    }
                    alt="product"
                  />
                ) : null}
              </div>
              <div className={Style.card__title}>
                {product._source && <div>{product._source.product.name}</div>}
              </div>
              <div className={Style.card__percentage}>
                <b>Dropped Percentage:</b>{" "}
                {product._source.price.diff_percentage}
                <br />
                <b>Formatted Price: </b>
                <NumberFormat
                  value={product._source.price.offer}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"kr"}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>no results</h1>
      )}
    </div>
  );
};

export default Productlist;
