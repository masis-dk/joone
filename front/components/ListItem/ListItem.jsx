import React     from 'react';
import PropTypes from 'prop-types';
import Link      from "next/link";
import Button    from "../Button/Button";
import classname from "classnames";

function ListItem({ products, withButton }) {
  return (
    <>
      { products.map((product, i) =>
        <li
          key={ `${product.id}_${i}` }
          className={ classname("c-products-list-img", { "c-products-list__item": withButton }) }
        >
          {withButton
            ? (
              <Link href={ `/product/${ product.id }` } as={ `/product/${ product.id }` }>
                <div className="e-product-link">
                  <div className="e-product-img">
                    <img src={ product.image.src } alt={ product.image.alt || '' } />
                  </div>

                  { withButton &&
                  <div className="e-product-btn">
                    <p className="e-product-title">{ product.title }</p>
                    <Button text="Découvrir" />
                  </div>
                  }
                </div>
              </Link>
            )
            : (
              <div key={ `${product.id}_${i}` } className="e-product">
                <div>
                  <img src={ product?.image?.src } alt={ product?.image?.alt || '' } />
                </div>

                { withButton &&
                <div className="e-product-btn">
                  <p className="e-product-title">{ product.title }</p>
                  <Button text="Découvrir" />
                </div>
                }
              </div>
            )
          }
        </li>
      ) }
    </>
  );
}

ListItem.propTypes = {
  products  : PropTypes.array,
  withButton: PropTypes.bool,
};

ListItem.defaultProps = {
  products  : [],
  withButton: true,
}

export default ListItem;
