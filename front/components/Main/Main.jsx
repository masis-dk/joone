import React     from 'react';
import PropTypes from 'prop-types';
import Head      from "../Head/Head";
import Nav       from "../Nav/Nav";

function Main({ children, title }) {
  return (
    <main>
      <Head title={title}/>
      <Nav />
      <h1 style={ { textAlign: 'center', marginBottom: 30 } }>JOONE</h1>
      { children }
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

Main.defaultProps = {
  title: 'Joone'
};

export default Main;
