CREATE TYPE gender AS ENUM ('m', 'f', 'other');
CREATE DOMAIN postcode as TEXT CHECK( VALUE ~ '\d{5}');
CREATE DOMAIN phone_no as TEXT CHECK( VALUE ~ '0\d{8,9}');
CREATE TYPE mem_status AS ENUM ('current', 'ended', 'pending');
CREATE TYPE staff_status AS ENUM ('on', 'off');
CREATE TYPE order_type AS ENUM ('eat-in', 'delivery', 'take-away');
CREATE TYPE stock_update_action AS ENUM ('update', 'plus', 'minus');

CREATE TABLE addresses (
  address_id SERIAL PRIMARY KEY,
  address1 VARCHAR(100) NOT NULL,
  address2 VARCHAR(100),
  sub_district VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  postcode postcode NOT NULL
);

CREATE TABLE owners (
  owner_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(200),
  address_id INTEGER REFERENCES addresses(address_id) ON DELETE SET NULL
);


CREATE TABLE accounts (
  account_id SERIAL PRIMARY KEY,
  login_name VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  join_date TIMESTAMP NOT NULL DEFAULT NOW(),
  restaurant_name VARCHAR(100) NOT NULL,
  owner_id INTEGER REFERENCES owners(owner_id) ON DELETE RESTRICT NOT NULL
);


CREATE TABLE contact_no (
  contact_no_id SERIAL PRIMARY KEY,
  contact_no phone_no NOT NULL
);

CREATE TABLE branches (
  branch_id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES accounts(account_id) ON DELETE RESTRICT NOT NULL,
  address_id INTEGER REFERENCES addresses(address_id) ON DELETE SET NULL,
  branch_name VARCHAR(100) NOT NULL
);

CREATE TABLE staffs (
  staff_id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES accounts(account_id) ON DELETE RESTRICT NOT NULL,
  address_id INTEGER REFERENCES addresses(address_id) ON DELETE SET NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  gender gender,
  image VARCHAR(500),
  password VARCHAR(100),
  contact_no_id INTEGER REFERENCES contact_no(contact_no_id) ON DELETE SET NULL,
  is_owner BOOL DEFAULT FALSE NOT NULL
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES accounts(account_id) ON DELETE RESTRICT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_image VARCHAR(500),
  price REAL NOT NULL DEFAULT 0,
  description VARCHAR(500)
);

CREATE TABLE product_tag (
  product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE NOT NULL,
  tag_id INTEGER REFERENCES tags(tag_id) ON DELETE RESTRICT NOT NULL,
  PRIMARY KEY(product_id, tag_id)
);

CREATE TABLE stock_items (
  item_id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES accounts(account_id) ON DELETE RESTRICT NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  unit VARCHAR(20),
  amount REAL NOT NULL DEFAULT 0
);

CREATE TABLE stock_update_history (
  stock_update_id BIGSERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES stock_items(item_id) ON DELETE NO ACTION NOT NULL,
  staff_id INTEGER REFERENCES staffs(staff_id) ON DELETE NO ACTION NOT NULL, 
  update_amount REAL NOT NULL,
  total_amount REAL NOT NULL,
  action stock_update_action NOT NUll,
  note VARCHAR(300)
);

CREATE TABLE stock_consume (
  product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE NOT NULL,
  item_id INTEGER REFERENCES stock_items(item_id) ON DELETE CASCADE NOT NULL,
  amount REAL NOT NULL DEFAULT 0,
  PRIMARY KEY (product_id, item_id)
);

CREATE TABLE account_member_status (
  account_member_id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES accounts(account_id) ON DELETE RESTRICT NOT NULL,
  membership_id INTEGER REFERENCES membership(membership_id) ON DELETE RESTRICT NOT NULL,
  start_date TIMESTAMP NOT NULL default now(),
  end_date TIMESTAMP,
  status mem_status NOT NULL DEFAULT 'pending'
);

-- Branch belongings

CREATE TABLE branch_product (
  product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE NOT NULL,
  branch_id INTEGER REFERENCES branches(branch_id) ON DELETE CASCADE NOT NULL,
  branch_price REAL,
  PRIMARY KEY(product_id, branch_id)
);

CREATE TABLE branch_stock (
  branch_id INTEGER REFERENCES branches(branch_id) ON DELETE CASCADE NOT NULL,
  item_id INTEGER REFERENCES stock_items(item_id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY(item_id, branch_id)
);

CREATE TABLE branch_staff (
  branch_id INTEGER REFERENCES branches(branch_id) ON DELETE CASCADE NOT NULL,
  staff_id INTEGER REFERENCES staffs(staff_id) ON DELETE CASCADE NOT NULL,
  position VARCHAR(50) NOT NULL DEFAULT 'staff',
  join_date TIMESTAMP DEFAULT now(),
  status staff_status NOT NULL DEFAULT 'on',
  PRIMARY KEY(branch_id, staff_id)
);

CREATE TABLE branch_contact_no (
  branch_id INTEGER REFERENCES branches(branch_id) ON DELETE CASCADE NOT NULL,
  contact_no_id INTEGER REFERENCES contact_no(contact_no_id) ON DELETE CASCADE NOT NULL,
  is_main BOOL NOT NULL,
  PRIMARY KEY(branch_id, contact_no_id)
);

CREATE TABLE owner_contact_no (
  owner_id INTEGER REFERENCES owners(owner_id) ON DELETE CASCADE NOT NULL,
  contact_no_id INTEGER REFERENCES contact_no(contact_no_id) ON DELETE CASCADE NOT NULL,
  is_main BOOL NOT NULL,
  PRIMARY KEY(owner_id, contact_no_id)
);

CREATE TABLE sale_orders (
  order_id SERIAL PRIMARY KEY,
  branch_id INTEGER REFERENCES branches(branch_id) ON DELETE CASCADE NOT NULL,
  order_type order_type,
  ordered_time TIMESTAMP NOT NULL DEFAULT NOW(),
  closed_time TIMESTAMP
);

CREATE TABLE order_product (
  order_id INTEGER REFERENCES sale_orders(order_id) ON DELETE CASCADE NOT NULL,
  product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL DEFAULT 1,
  delivered_amount INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (order_id, product_id)
);