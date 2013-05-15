<?php

include("db_connect.php");
$rom = 0;
$address = 0;
$comment = "";

header("Pragma: no-cache");
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");

if(isset( $_GET["rom"])) $rom = $_GET["rom"];
if(isset( $_GET["addr"])) $address = $_GET["addr"];
if(isset( $_GET["comment"])) $comment = $_GET["comment"];


db_query("delete from comment where rom=".$rom." and address=".$address.";");
if($comment != ""){
  $r = db_query("insert into comment (rom, address, comment) values (".$rom.", ".$address.", '".$comment."');");
}

db_close();

?>
