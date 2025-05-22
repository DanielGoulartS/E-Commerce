<?php
require '../../CartScript/PHP/Connection.php';
class Queries
{

    private $connection;

    public function __construct()
    {
        $this->connection = new Connection();
    }

    public function selectOrderCode($orderCode)
    {
        return $this->connection->Query("SELECT * FROM orders WHERE `code` = '" . $orderCode . "';");
    }

    public function insertOrder($orderCode, $totalPrice)
    {
        return $this->connection->Query("INSERT INTO " . $this->connection->base . ".orders VALUES 
        ('" . $orderCode . "', '" . $totalPrice . "');");
    }

    public function insertOrdersWares($orderCode, $wareName, $wareAmount)
    {
        return $this->connection->Query("INSERT INTO " . $this->connection->base . ".ordersWares VALUES 
        ('" . $orderCode . "', '" . $wareName . "', '" . $wareAmount . "');");
    }

    public function selectAllWaresAndImages()
    {
        return $this->connection->Query("SELECT base.wares.name, base.wares.price, GROUP_CONCAT(' \"', base.images.ìmagesurl, '\"') AS `imagesurl`
        FROM base.wares INNER JOIN base.waresimages ON base.waresimages.waresname = base.wares.name
        INNER JOIN base.images ON base.waresimages.imagesindex = base.images.index GROUP BY base.wares.name;");
    }
}
