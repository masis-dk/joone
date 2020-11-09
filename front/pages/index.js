import React              from 'react';
import { getAllProducts } from "../queries/products";
import ListItem           from "../components/ListItem/ListItem";
import Main               from "../components/Main/Main";

function Home({ products }) {

  return (
    <Main title="Joone">
      <div data-joone="home">
        <ul className="c-products-list">
          <ListItem products={ products } />
        </ul>
      </div>
    </Main>
  )
}

export async function getStaticProps() {
  const response = await getAllProducts();
  const { products } = response;

  return { props: { products } };
}

export default Home;
