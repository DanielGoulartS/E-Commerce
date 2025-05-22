<?php
require '../../CartScript/PHP/Queries.php';

$phpQueries = new Queries();

if (isset($_GET['orderCode'])) {

    $var = $_GET['orderCode'];

    $previousOrders = $phpQueries->selectOrderCode($var);

    if (mysqli_num_rows($previousOrders)) {
        foreach ($previousOrders as $order) {
            echo "Code '" . $order['orderCode'] . "' already in use.";
        }
    } else {
        echo "false";
    }
} else if (!isset($_GET['orderCode'])) {
    echo "O servidor não recebeu devidamente o código do pedido.";
}

?>