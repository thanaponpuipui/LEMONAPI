const Model = require('../Model');
const db = require('../../database');
/* 
  table name: products
  product_id - PRIMARY KEY
  account_id - ref from accounts table indicate the owner of the products
  product_name - name of the product
  product_image - url of the product image
  price - number
  info - max 300 char product detail
*/

class Products extends Model {
  constructor ({
    id,
    accountId,
    name,
    imageUrl='https://ucarecdn.com/fa297ebd-50d8-4dcf-add4-821ba8af2b51/photoofalandscape.png',
    price=0,
    info
  }, client) {
    super(client);
    this.id = id;
    this.accountId = accountId;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.info = info;
  }

  async insertProduct () {
    const sql = `
      INSERT INTO products(
        account_id,
        product_name,
        product_image,
        price,
        info
      )
      VALUES(
        $1,
        $2,
        $3,
        $4,
        %5
      )
      RETURNING product_id
    `;

    const values = [this.accountId, this.name, this.imageUrl, this.price, this.info || null];
    try {
      const { rows } = await this.client.query(sql, values);
      return rows[0].product_id;
    } catch (e) {
      throw e;
    }
  }

  static async getProduct({productId}) {
    const sql = `
      SELECT
        product_name,
        product_image,
        price,
        info
      FROM products
      WHERE product_id = $1
    `;
    const values = [productId];
    try {
      const { rows } = await db.query(sql, values);
      const product = rows[0] ? {
        id: productId,
        name: rows[0].product_name,
        imageUrl: rows[0].product_image,
        price: rows[0].price,
        info: rows[0].info,
      } : null;
      return product
    } catch (e) {
      throw e;
    }
  }
}

module.exports.Products = Products;

module.exports.insertProduct = async ({
  accountId,
  name,
  imageUrl='https://ucarecdn.com/fa297ebd-50d8-4dcf-add4-821ba8af2b51/photoofalandscape.png',
  price=0,
  info,
}, client=db) => {
  const sql = `
    INSERT INTO products(
      account_id,
      product_name,
      product_image,
      price,
      info
    )
    VALUES(
      $1,
      $2,
      $3,
      $4,
      %5
    )
    RETURNING product_id
  `;
  const values = [accountId, name, imageUrl, price, info || null];

  try {
    const { rows } = await client.query(sql, values);
    return rows[0].product_id;
  } catch (e) {
    throw e;
  }
}