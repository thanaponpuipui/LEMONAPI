INSERT INTO addresses (address1, sub_district, district, province, postcode) VALUES ('99', 'no-where', 'townsville city', 'GOLDEN GAY TIME', '11450');

INSERT INTO owners (first_name, last_name, email, address_id) VALUES ('Grag', 'Focker', 'gaylordfocker@MTP.com', 1);

INSERT INTO accounts (login_name, password, restaurant_name, owner_id) VALUES ('testaccount', 'test1234', 'KFC123', 1);

INSERT INTO contact_no (contact_no) VALUES ('0871245263');

INSERT INTO branches (account_id, address_id, branch_name) VALUES (1, 1, 'KFC123');

INSERT INTO staffs (account_id, address_id, first_name, last_name, gender, contact_no_id, is_owner) VALUES (1, 1, 'Grag', 'Focker', 'm', 1, true);
INSERT INTO staffs (account_id, address_id, first_name, last_name, gender, contact_no_id, is_owner) VALUES (1, 1, 'Matha', 'Focker', 'f', null, false);

INSERT INTO products (account_id, product_name, price, description) VALUES (1, 'steak', 150, 'test menu');

INSERT INTO stock_items (account_id, item_name, unit, amount) VALUES (1, 'meat', 'g', 1000);
INSERT INTO stock_items (account_id, item_name, unit, amount) VALUES (1, 'butter', 'g', 400);

INSERT INTO stock_consume (product_id, item_id, amount) VALUES (1, 1, 200);
INSERT INTO stock_consume (product_id, item_id, amount) VALUES (1, 2, 20);

INSERT INTO account_member_status (account_id, membership_id) VALUES (1, 1);

INSERT INTO branch_product (branch_id, product_id, branch_price) VALUES (1, 1, 175);

INSERT INTO branch_stock (branch_id, item_id) VALUES (1, 1);
INSERT INTO branch_stock (branch_id, item_id) VALUES (1, 2);

INSERT INTO branch_staff (branch_id, staff_id, position) VALUES (1, 2, 'staff');

INSERT INTO branch_contact_no (branch_id, contact_no_id, is_main) VALUES (1, 1, true);

INSERT INTO owner_contact_no (owner_id, contact_no_id, is_main) VALUES (1, 1, true);
