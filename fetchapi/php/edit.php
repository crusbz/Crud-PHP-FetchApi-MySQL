<?php
    include 'conexao.php';

    $id = $_GET['editId'];

    $sql = "SELECT * FROM `persons` WHERE id_person = {$id}";
    $buscar = mysqli_query($conexao, $sql);
    $output = [];

    while($row = mysqli_fetch_assoc($buscar)){
        $output[] = $row;
      }

    exit (json_encode($output));

    
?>