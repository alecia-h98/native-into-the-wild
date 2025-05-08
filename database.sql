-------------------------------------------------------
--------------------------------------------------
-- START FROM SCRATCH:
DROP TRIGGER IF EXISTS "on_user_update" ON "user";
DROP TABLE IF EXISTS "user";

-------------------------------------------------------
--------------------------------------------------
-- SEED DATA:
--   You'll need to actually register users via the application in order to get hashed
--   passwords. Once you've done that, you can modify this INSERT statement to include
--   your dummy users. Be sure to copy/paste their hashed passwords, as well.
--   This is only for development purposes! Here's a commented-out example:
-- INSERT INTO "user"
--   ("username", "password")
--   VALUES
--   ('unicorn10', '$2a$10$oGi81qjXmTh/slGzYOr2fu6NGuCwB4kngsiWQPToNrZf5X8hxkeNG'), --pw: 123
--   ('cactusfox', '$2a$10$8./c/6fB2BkzdIrAUMWOxOlR75kgmbx/JMrMA5gA70c9IAobVZquW'); --pw: 123






---My database code---
 
-- OPPS STARTING OVER...
--DROP TABLE "user" CASCADE;
--DROP TABLE "item" CASCADE;
--DROP TABLE "found" CASCADE;
 
CREATE TABLE "user"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(80) NOT NULL,
    "password" VARCHAR(1000) NOT NULL,
    "inserted_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL DEFAULT 'now()',
        "updated_at" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL DEFAULT 'now()',
        "is_admin" BOOLEAN NOT NULL DEFAULT '0'
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");
CREATE TABLE "item"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "found" VARCHAR(350) NOT NULL,
    "season" VARCHAR(255) NOT NULL,
    "uses" VARCHAR(350) NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "nutrition" VARCHAR(350) NOT NULL,
    "shelf_life" VARCHAR(350) NOT NULL,
    "harvesting" VARCHAR(450) NOT NULL,
    "imposters" VARCHAR(65) NOT NULL,
    "category_id" SERIAL NOT NULL
);
ALTER TABLE
    "item" ADD PRIMARY KEY("id");
CREATE TABLE "found"(
    "id" SERIAL NOT NULL,
    "item_id" SERIAL NOT NULL,
    "found_date" DATE NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1500) NOT NULL,
    "photo" VARCHAR(1500) NOT NULL,
    "user_id" SERIAL NOT NULL,
    "lat" DECIMAL(8, 6),
    "long" DECIMAL(9, 6)
);
ALTER TABLE
    "found" ADD PRIMARY KEY("id");
CREATE TABLE "user_item"(
    "id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "item_id" SERIAL NOT NULL,
    "is_favorited" BOOLEAN NOT NULL DEFAULT '0'
);
ALTER TABLE
    "user_item" ADD PRIMARY KEY("id");
CREATE TABLE "category"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "category" ADD PRIMARY KEY("id");
ALTER TABLE
    "user_item" ADD CONSTRAINT "user_item_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "found" ADD CONSTRAINT "found_item_id_foreign" FOREIGN KEY("item_id") REFERENCES "item"("id");
ALTER TABLE
    "user_item" ADD CONSTRAINT "user_item_item_id_foreign" FOREIGN KEY("item_id") REFERENCES "item"("id");
ALTER TABLE
    "item" ADD CONSTRAINT "item_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("id");
ALTER TABLE
    "found" ADD CONSTRAINT "found_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
    
    -------------------------------------------------------
--------------------------------------------------
-- AUTOMAGIC UPDATED_AT:

-- Did you know that you can make and execute functions
-- in PostgresQL? Wild, right!? I'm not making this up. Here
-- is proof that I am not making this up:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/

-- Create a function that sets a row's updated_at column
-- to NOW():
CREATE OR REPLACE FUNCTION set_updated_at_to_now() -- 👈
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user table that will execute
-- the set_update_at_to_now function on any rows that
-- have been touched by an UPDATE query:
CREATE TRIGGER on_user_update
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();


------

    INSERT INTO "category" ("id", "name") VALUES
    (1, 'other'),
    (2, 'mushroom'),
    (3, 'berry_fruit'),
    (4, 'herb'),
    (5, 'nut_seed');

INSERT INTO "item" 
    ("name", "description", "found", "season", "uses", "photo", "nutrition", "shelf_life", "harvesting", "imposters", "category_id") 
VALUES 
    ('Dandelion', 'A common plant with jagged leaves and bright yellow flowers that turn into seed puffs.', 'Found in fields, lawns, and roadsides.', 'Best harvested in early spring.', 'Used in salads, teas, and herbal remedies.', '', 'Rich in vitamins A, C, and K.', 'Use within a few days fresh; dried roots last months.', 'Harvest young leaves before flowering.', 'Catsear (Hypochaeris radicata)', 1),
    ('Morel', 'A prized wild mushroom with a honeycomb-like cap and hollow interior.', 'Near dead or decaying trees in forests.', 'Spring, after rainfall.', 'Used in gourmet dishes, soups, and sauces.', '', 'High in vitamin D and antioxidants.', 'Best consumed fresh within 4 days or dried for long-term storage.', 'Soak and rinse thoroughly before cooking.', 'False morels (Gyromitra spp.)', 1),
    ('Chokecherry', 'A small tree with dark red to black berries growing in clusters.', 'Found along rivers and open fields.', 'Berries ripen in late summer.', 'Used for jams, jellies, and syrups.', '', 'Rich in antioxidants and vitamin C.', 'Fresh berries last up to 2 weeks; preserves last months.', 'Harvest by hand when berries turn dark.', 'Prunus serotina (Black Cherry)', 3),
    ('Stinging Nettle', 'A tall, leafy plant with serrated edges and tiny stinging hairs.', 'Grows in moist, rich soil near streams and fields.', 'Early spring to late summer.', 'Used in teas, soups, and medicinal extracts.', '', 'High in iron, calcium, and vitamin A.', 'Fresh lasts 1 week; dried lasts months.', 'Use gloves when harvesting; pick young tops.', 'Dead-nettle (Lamium spp.)', 4),
    ('Sunflower Seeds', 'Large yellow flowers with edible seeds in the center.', 'Grown in fields and gardens.', 'Late summer to early fall.', 'Eaten raw, roasted, or pressed for oil.', '', 'Rich in vitamin E and healthy fats.', 'Fresh seeds last 1-2 weeks; dried up to a year.', 'Harvest when flower heads droop and seeds loosen.', 'N/A', 5),
    ('Black Walnut', 'A large tree with green husked nuts that turn dark when ripe.', 'Found in woodlands and fields.', 'Nuts mature in fall.', 'Used in baking, cooking, and woodworking.', '', 'High in protein and omega-3s.', 'Stored properly, nuts last months.', 'Wear gloves; hulls stain skin.', 'Butternut (Juglans cinerea)', 5),
    ('Wild Blueberry', 'A low-growing shrub with small, deep blue berries.', 'Found in forests and rocky terrain.', 'Berries ripen in summer.', 'Eaten fresh, dried, or made into preserves.', '', 'Rich in antioxidants and fiber.', 'Fresh lasts about 2 weeks; frozen up to a year.', 'Harvest gently to avoid crushing.', 'Nightshade berries', 3),
    ('Hen of the Woods', 'A large, ruffled mushroom growing at tree bases.', 'Found near oak trees.', 'Late summer to fall.', 'Used in stir-fries, soups, and medicinal teas.', '', 'Contains beta-glucans and potassium.', 'Fresh lasts 1 week; dried lasts months.', 'Brush off dirt before use.', 'Similar-looking polypores', 2),
    ('Wild Garlic', 'A plant with slender green leaves and small white flowers.', 'Grows in woodlands and meadows.', 'Spring to early summer.', 'Used in pestos, soups, and seasonings.', '', 'Rich in sulfur compounds and vitamin C.', 'Fresh lasts 1 week; dried lasts months.', 'Harvest leaves before flowering.', 'Lily of the Valley (toxic)', 4),
    ('Hickory Nut', 'A hard-shelled nut from hickory trees.', 'Found in woodlands and open fields.', 'Nuts ripen in fall.', 'Eaten raw, roasted, or in baked goods.', '', 'High in fats, protein, and minerals.', 'Properly stored nuts last up to a year.', 'Gather fallen nuts and dry before cracking.', 'Pignut hickory (Carya glabra)', 5);

INSERT INTO "public"."user"("name","username","password","inserted_at","updated_at","is_admin")
VALUES
(E'testuser',E'new-user',E'$2b$10$i1wJzM4/MRkM/EPtJ/DfHO5avg4WYjqr0kjv/Z2547iX/2d1EiI2e',E'2025-02-27 17:14:45-06',E'2025-02-27 17:14:45-06',FALSE);


INSERT INTO "found" ("item_id", "found_date", "location", "description", "photo", "user_id") VALUES
    (2, '2024-04-15', 'Appalachian Mountains', 'Found a cluster near a fallen oak tree.', 'image1.jpg', 1),
    (4, '2024-05-10', 'Great Lakes Region', 'Harvested young nettles for tea.', 'image2.jpg', 1),
    (6, '2023-09-21', 'Missouri River Valley', 'Collected walnuts after a storm.', 'image3.jpg', 1),
    (8, '2024-08-02', 'Northern California', 'Found a massive Hen of the Woods mushroom.', 'image4.jpg', 1);

INSERT INTO "user_item" ("user_id", "item_id") VALUES
    (1, 6),
    (1, 8),
    (1, 3);
INSERT INTO "user_item" ("user_id", "item_id") VALUES
    (2, 6),
    (2, 4),
    (2, 7);