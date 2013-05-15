<?php
$db_type="mysql";
$db="";

if ($db_type=="mysql") {
    $con = mysql_connect('localhost', 'newbie', 'newbie');

    if (!$con)
      {
      die('Could not connect: ' . mysql_error());
      }

    mysql_select_db("newbienes", $con);
} else if ($db_type=="sqllite") {
    $db = sqlite_open("test.db");
}

function db_query($sql) {
    global $db_type;
    if ($db_type=="mysql") {
        $result = mysql_query($sql);
        return $result; 
    }
    else if ($db_type=="sqllite") {
       $result = sqlite_query($db,$sql);
       return $result;
    }
}

function db_fetch($q) {
    global $db_type;
    if ($db_type=="mysql") {
        //echo($q);
        return mysql_fetch_array($q);
}
}

function db_close() {
    global $db_type;
    if ($db_type=="mysql") {
        return;
    }
    else if ($db_type=="sqllite") {
       sqlite_close($db);
    }
}

function num_rows($q) {
    if ($db_type=="mysql") {
        return mysql_num_rows($q);
    }
}

?>