<?php
require '../../CartScript/PHP/Queries.php';

$phpQueries = new Queries();

$resultWares = $phpQueries->selectAllWaresAndImages();

$returnObject = '{"wares":[';
$lastName = "";
$lastPrice = "";
$lastUrl = "";
$i = 0;

foreach ($resultWares as $ware) {

    $returnObject = $returnObject . '{"name":"' . $ware['name'] . '", "price":' . $ware['price'] .
        ', "images":[' . $ware['imagesurl'] . ']}';

    $ware['name'] = $lastName;
    $ware['price'] = $lastPrice;
    $ware['imagesurl'] = $lastUrl;
    if($i < mysqli_num_rows($resultWares) - 1){
        $returnObject = $returnObject . ", ";
    }
    $i++;
}
$returnObject = $returnObject . "]}";
echo $returnObject;
