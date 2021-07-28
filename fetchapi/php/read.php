<?php
include 'conexao.php';

$sql = "SELECT * FROM persons";
$busca = mysqli_query($conexao, $sql);

$resultado = mysqli_fetch_all($busca, MYSQLI_ASSOC);

exit(json_encode($resultado));
