DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userAdd`(
  IN _username VARCHAR(64),
  IN _value VARCHAR(253),
  IN _firstname VARCHAR(200),
  IN _lastname VARCHAR(200),
  IN _groupname VARCHAR(64)
)
BEGIN 
    INSERT INTO radcheck (username, value)
    VALUES (_username, _value);
    INSERT INTO userinfo (username, firstname, lastname)
    VALUES (_username, _firstname, _lastname);
    INSERT INTO userbillinfo (username)
    VALUES (_username);
    INSERT INTO radusergroup (username, groupname)
    VALUES (_username, _groupname);
END$$
DELIMITER ;
