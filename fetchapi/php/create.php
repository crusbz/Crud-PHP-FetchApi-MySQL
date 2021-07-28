<?php
include 'conexao.php';

$namePerson = $_POST['name_person'];
$agePerson = $_POST['age_person'];
$contactEmailPerson = $_POST['email_person'];

$sql = "INSERT INTO `persons`(`name_person`, `age_person`, `email_person`) VALUES ('$namePerson', $agePerson, '$contactEmailPerson')";

$inserir = mysqli_query($conexao, $sql);

if ($inserir) {
   echo "<div class='alert alert-success'>Novo usuário cadastrado com <strong>Sucesso!</strong></div>";
} else {
   echo "<div class='alert alert-danger'><strong>Erro </strong>ao cadastrar usuário!</div>";
}
