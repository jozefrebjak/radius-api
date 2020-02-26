USE radius;

DELIMITER $$
USE `radius`$$

CREATE PROCEDURE `nasAdd` (
  IN _nasname VARCHAR(128),
  IN _shortname VARCHAR(32),
  IN _type VARCHAR(30),
  IN _secret VARCHAR(60),
  IN _description VARCHAR(200)
)
BEGIN 
    INSERT INTO nas (nasname, shortname, type, secret, description)
    VALUES (_nasname, _shortname, _type, _secret, _description);
END