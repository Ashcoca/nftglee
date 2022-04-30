CREATE  INDEX "artworks_locked_by" on
  "public"."artworks" using btree ("locked_by");
