const db = require('../../config/lemondb');

module.exports.insertBranchProduct = async ({ branchId, productId, price }, client = db) => {
  const sql = `
    INSERT INTO branch_product(
      branch_id,
      product_id,
      branch_price
    )
    VALUES(
      $1,
      $2,
      $3
    )
  `;
  const values = [branchId, productId, price || null];
  try {
    await client.query(sql, values);
  } catch (e) {
    throw e;
  }
};

module.exports.selectAllBranchProducts = async ({ branchId }, client = db) => {
  const sql = `
    SELECT
      p.product_id,
      p.product_name,
      p.product_image,
      p.description,
      p.price,
      b.branch_price
    FROM products p
    JOIN branch_product b
    ON p.product_id = b.product_id
    WHERE b.branch_id = $1
  `;
  const values = [branchId];

  try {
    const { rows } = await client.query(sql, values);
    const productList = [];
    rows.forEach(row => {
      const product = {
        id: row.product_id,
        name: row.product_name,
        imageUrl: row.product_image,
        description: row.description,
        price: row.price,
        branchPrice: row.branchPrice,
      };
      productList.push(product);
    });

    return productList;
  } catch (e) {
    throw e;
  }
};
