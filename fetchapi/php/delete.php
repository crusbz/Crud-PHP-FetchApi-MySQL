<?php
include 'conexao.php';

$sid = $_GET['delId'];

$sql = "DELETE FROM persons WHERE id_person={$sid}";

$inserir = mysqli_query($conexao, $sql);

if ($inserir) {
    echo "Usuário deletado com sucesso";
} else {
    echo "<div class='alert alert-danger'><strong>Erro </strong>ao deletar usuário!</div>";
}
