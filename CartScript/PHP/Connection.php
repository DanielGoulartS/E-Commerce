<?php

class Connection
{

    private $host;
    private $usuario;
    private $senha;
    public $base;
    private $dbConnection;

    public function __construct()
    {
        $this->host = 'localhost';
        $this->usuario = 'root';
        $this->senha = '';
        $this->base = 'base';

        $this->dbConnection = mysqli_connect($this->host, $this->usuario, $this->senha, $this->base)
            or die("Erro ao Conectar a base de dados.");
    }

    public function IsConnected()
    {
        return mysqli_get_connection_stats($this->dbConnection);
    }

    public function CloseConnection()
    {
        return mysqli_close($this->dbConnection);
    }

    public function Query(string $query)
    {
        return mysqli_query($this->dbConnection, $query);
    }

}
