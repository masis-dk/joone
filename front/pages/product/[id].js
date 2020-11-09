import React     from 'react';
import PropTypes from 'prop-types';
import { get }   from 'lodash/fp';
import {
  getAllProducts,
  getProductById,
  getVariantsProducts
}                from "../../queries/products";
import Main      from "../../components/Main/Main";
import Button    from "../../components/Button/Button";
import ListItem  from "../../components/ListItem/ListItem";

function Product({ product, variants }) {
  const productPrice = get('variants[0].price', product);

  return (
    <Main title={ `Joone | ${ product.title }` }>
      <div style={ { padding: 50 } }>
        <h2 style={ { textAlign: 'center' } }>{ get('title', product) }</h2>

        <div className="c-product-single">
          <div className="e-product-single-img">
            <img src={ product.image.src } alt={ product.image.alt || '' } />

            <div className="e-product-variant" style={ { marginTop: 20 } }>
              <ul style={ { display: 'flex' } }>
                <ListItem products={variants} withButton={false} />
              </ul>
            </div>
          </div>

          <div className="e-product-single-add-to-cart">
            { productPrice &&
            <>
              <h1>{ productPrice } €</h1>
              <Button text="Ajouter au panier" />
            </>
            }
          </div>
        </div>
      </div>
    </Main>
  );
}

Product.propTypes = {
  product: PropTypes.object,
  variants: PropTypes.array,
};

Product.defaultProps = {
  variants: [],
};

export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products.products.map(p => ( { params: { id: p.id.toString() } } ));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await getProductById(params.id);
  const { product } = response;

  const variants = product.variants.splice(0, 5);
  const variantsImgs = variants.map(img => getVariantsProducts(img.product_id, img.image_id));

  return {
    props: { product: product, variants: await Promise.all(variantsImgs) }
  };
}

export default Product;
