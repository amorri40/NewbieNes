<?php

include("db_connect.php");

    header("Pragma: no-cache");
    header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");

    $exists = db_query("select * from newbienes where type=table and name=rom");
    
    if(num_rows($exists) == 0)
    {
     db_query("create table rom ( id integer primary key AUTO_INCREMENT, "."hash varchar(2555) not null, name varchar(255) , comment varchar(2555) );");
    }

    $hash = "null";
    if(isset( $_GET["hash"])) $hash = $_GET["hash"];

    $id = db_query("select id from rom where hash=\"".$hash."\";");
    
    if(num_rows($id)==FALSE){
      $q=db_query("insert into rom (hash) values (\"".$hash."\");");
      if (mysql_error()) {
   die(mysql_error());
}
      echo "num_rows($id):".num_rows($id)." ok";
    }

    $query = db_query("select id, hash, name from rom where hash=\"".$hash."\";", true);
    $row = db_fetch($query);

    #$result = array('id'=>$id, 'name=>$name);

    $json= json_encode($row);
    echo $json;



    db_close();

?>