DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userAddOrEdit`(
  IN _username VARCHAR(64),
  IN _value VARCHAR(253),
  IN _firstname VARCHAR(200),
  IN _lastname VARCHAR(200),
  IN _groupname VARCHAR(64)
)
BEGIN 
    DECLARE _exists TINYINT;
    SET _exists = (SELECT COUNT(*) FROM radcheck WHERE username=_username); 
    IF _exists=0 THEN 
      INSERT INTO radcheck (username, value)
      VALUES (_username, _value);
      INSERT INTO userinfo (username, firstname, lastname)
      VALUES (_username, _firstname, _lastname);
      INSERT INTO userbillinfo (username)
      VALUES (_username);
      INSERT INTO radusergroup (username, groupname)
      VALUES (_username, _groupname);
    ELSE
      UPDATE radcheck
      SET
      username = _username,
      `value` = _value
        WHERE username = _username;
      UPDATE userinfo
      SET
      firstname = _firstname,
      lastname = _lastname
        WHERE username = _username;
      UPDATE userbillinfo
      SET
      username = _username
        WHERE username = _username;
      UPDATE radusergroup
      SET
      username = _username,
      groupname = _groupname
        WHERE username = _username;
    END IF;
END$$
DELIMITER ;
