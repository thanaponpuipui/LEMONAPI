CREATE TABLE membership
(
  membership_id SMALLSERIAL PRIMARY KEY,
  tier TEXT NOT NULL UNIQUE,
  price REAL NOT NULL,
  description TEXT
);

CREATE TABLE default_delivery_service
(
  default_service_id SMALLSERIAL PRIMARY KEY,
  service_name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL
);


CREATE TABLE tags
(
  tag_id SMALLSERIAL PRIMARY KEY,
  tag_name_eng TEXT NOT NULL,
  tag_name_th TEXT NOT NULL
);


INSERT INTO default_delivery_service(service_name, icon) VALUES('Grab', 'https://ucarecdn.com/d6a2610d-d1a2-48ce-8e41-0fabbb9cee3e/Grab.png');
INSERT INTO default_delivery_service(service_name, icon) VALUES('Food Panda', 'https://ucarecdn.com/697a2d1d-ab8d-4613-a9dc-6e456565de7b/Foodpanda.png');
INSERT INTO default_delivery_service(service_name, icon) VALUES('LINEMAN', 'https://ucarecdn.com/c12967e5-1fa2-489d-9fd0-1def829c593a/Lineman.png');
INSERT INTO default_delivery_service(service_name, icon) VALUES('GET', 'https://ucarecdn.com/7d0ff855-6d8d-4f82-9098-17d75f54175b/Get.png');

INSERT INTO membership
(
  tier,
  price,
  description
)
VALUES
(
  'demo',
  0,
  'demo tier for test account.'
);
