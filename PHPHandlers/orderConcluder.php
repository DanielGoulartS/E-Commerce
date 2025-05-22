<?php
require '../../CartScript/PHP/Queries.php';

$phpQueries = new Queries();

if (isset($_GET['code'])) {

    if (sizeof($_GET) <= 2) {
        echo "Adicione mercadorias ao carrinho para efetuar alguma compra!";
        return;
    }
    $i = 0;
    foreach ($_GET as $key => $value) {
        switch ($i) {
            case 0:
                $orderCode = $value;
                break;
            case 1:
                $totalPrice = $value;
                $phpQueries->insertOrder($orderCode, $totalPrice);
                break;
            default:
                if ($i % 2 == 0) {
                    $wareName = $value;
                } else {
                    $wareAmount = $value;
                    $phpQueries->insertOrdersWares($orderCode, $wareName, $wareAmount);
                }
        }
        $i++;
    }
    echo $orderCode;
}

?>