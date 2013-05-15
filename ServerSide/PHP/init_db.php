<!DOCTYPE html>
<html>

<?php

include("db_connect.php");

db_query("drop table table1;");
db_query("create table table1 (address int, comment varchar(255));");

$address = 0x8017;
$comment = "いろいろスタート";
db_query("insert into table1 (address, comment) values (".$address.", '".$comment."');");
$address = 0x800f;
$comment = "PPU初期化待ち";
db_query("insert into table1 (address, comment) values (".$address.", '".$comment."');");

$qresult = db_query("select * from table1;");

while($row = db_fetch($qresult)){
  print $row->address . $row->comment . "\n";
}


db_close($db);



?>

</html>