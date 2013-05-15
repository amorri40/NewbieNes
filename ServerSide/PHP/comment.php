<?php

include("db_connect.php");

$rom = 0;
$csv = 0;
if(isset( $_GET["rom"])) $rom = $_GET["rom"];
if(isset( $_GET["csv"])) $csv = $_GET["csv"];
if($csv == 1){
  header("Content-type: text/plain; charset=utf-8");
}
header("Pragma: no-cache");
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");

$exists = db_query("select * from newbie where type='table' and name='comment'");
if(num_rows($exists) == 0)
{
  db_query("create table comment( rom integer, address integer, comment varchar(255));");
}

$query = db_query("select * from comment where rom=".$rom." order by address;");

$arr = array();

while($row = db_fetch($query)){
  array_push($arr, $row);
}

if($csv == 1){
  foreach($arr as $a){
    echo $a->address."\t".$a->comment;
    echo "\n";
  }
}else{
  echo json_encode($arr);
}

db_close();

?>
