const Model = require('../Model');
const db = require('../../config/lemondb');
/* 
  table name: products
  product_id - PRIMARY KEY
  account_id - ref from accounts table indicate the owner of the products
  product_name - name of the product
  product_image - url of the product image
  price - number
  description - max 300 char product detail
*/

class Products extends Model {
  constructor(
    {
      id,
      accountId,
      name,
      imageUrl,
      price = 0,
      description,
    },
    client,
  ) {
    super(client);
    this.id = id;
    this.accountId = accountId;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  async insertProduct() {
    const sql = `
      INSERT INTO products(
        account_id,
        product_name,
        product_image,
        price,
        description
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

    const values = [this.accountId, this.name, this.imageUrl || null, this.price, this.description || null];
    try {
      const { rows } = await this.client.query(sql, values);
      return rows[0].product_id;
    } catch (e) {
      throw e;
    }
  }
  // not update branch price
  static async updateProduct(productId, {name, price, description, image}, client=db) {
    const sql = `
      UPDATE products
      SET
        product_name = $1,
        product_image = $2,
        price = $3,
        description = $4
      WHERE product_id = $5
      RETURNING *
    `;
    const values = [name, image, price, description, productId];
    try{
      const { rows } = await client.query(sql, values);
      return {
        id: rows[0].product_id,
        name: rows[0].product_name,
        image: rows[0].product_image,
        price: rows[0].price,
        description: rows[0].description
      } = rows[0];
    } catch (e) {
      throw e;
    }
  }

  static async deleteProduct({productId}, client=db) {
    const sql = `
      DELETE FROM products
      WHERE product_id = $1
    `;
    const values = [productId];
    try {
      await client.query(sql, values);
    } catch (e) {
      throw e;
    }
  }

  static async getProduct({ productId }) {
    const sql = `
      SELECT
        product_name,
        product_image,
        price,
        description
      FROM products
      WHERE product_id = $1
    `;
    const values = [productId];
    try {
      const { rows } = await db.query(sql, values);
      const product = rows[0]
        ? {
            id: productId,
            name: rows[0].product_name,
            imageUrl: rows[0].product_image,
            price: rows[0].price,
            description: rows[0].description,
          }
        : null;
      return product;
    } catch (e) {
      throw e;
    }
  }
}

module.exports.Products = Products;

module.exports.insertProduct = async (
  {
    accountId,
    name,
    imageUrl,
    price = 0,
    description,
  },
  client = db,
) => {
  const sql = `
    INSERT INTO products(
      account_id,
      product_name,
      product_image,
      price,
      description
    )
    VALUES(
      $1,
      $2,
      $3,
      $4,
      $5
    )
    RETURNING product_id
  `;
  const values = [accountId, name, imageUrl, price, description || null];

  try {
    const { rows } = await client.query(sql, values);
    return rows[0].product_id;
  } catch (e) {
    throw e;
  }
};
