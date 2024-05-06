<?php 
$path = './data.json';
$jsonString = file_get_contents($path);
$jsonData = json_decode($jsonString, false);
header('Content-type:application/json');
print_r($jsonData);
