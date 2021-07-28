<?php
include 'conexao.php';

$input = file_get_contents('php://input');
$decode = json_decode($input, true);

$id = $decode['s_id'];
$namePerson = $decode['namePerson'];
$agePerson = $decode['agePerson'];
$contactEmailPerson = $decode['emailPerson'];

$sql = "UPDATE persons SET name_person = '{$namePerson}', age_person = '{$agePerson}',email_person = '{$contactEmailPerson}' WHERE id_person = {$id}";

$inserir = mysqli_query($conexao, $sql);

if ($inserir) {
    echo "<div class='alert alert-success'>Usuário atualizado com <strong>Sucesso!</strong></div>";
} else {
    echo "<div class='alert alert-danger'><strong>Erro </strong>ao atualizar usuário!</div>";
}
