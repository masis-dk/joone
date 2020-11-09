/**
 * request all products
 * @param limit
 * @returns {Promise<any>}
 */
export async function getAllProducts(limit = null) {
  const res = await fetch(`http://localhost:8080/products?limit=${limit ? limit.toString() : ''}`);

  return await res.json();
}

/**
 * request variant for a given product with img
 * @param id
 * @param imgID
 * @returns {Promise<any>}
 */
export async function getVariantsProducts(id, imgID) {
  const res = await fetch(`http://localhost:8080/products/variants/${id.toString()}?imgid=${imgID}`);

  return await res.json();
}

/**
 * request one product with id
 * @param id
 * @returns {Promise<any>}
 */
export async function getProductById(id) {
  const res = await fetch(`http://localhost:8080/product/${id.toString()}`);

  return await res.json();
}
