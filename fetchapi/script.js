function addPerson(){
    document.querySelector('#myForm').addEventListener('submit', e => {
        e.preventDefault();
        let form = document.querySelector('#myForm');
        const data = new URLSearchParams();
        for(const p of new FormData(form)){
        data.append(p[0], p[1]);
    }

        fetch('php/create.php', {
            method: 'POST',
            body: data
        }).then(response => response.text()).then(response => {
            document.querySelector('.msg').innerHTML = response;
            document.querySelector('#result').classList.remove('hide'); 
        }).catch(error => console.log(error));
    });
}

function loadTable(){
    fetch('php/read.php').then((res) => res.json())
    .then(response => {
        console.log(response);
        let output = '';
        for(let i in response){
            output += `<tr scope="row">
                <td>${response[i].id_person}</td>
                <td>${response[i].name_person}</td>
                <td>${response[i].age_person}</td>
                <td>${response[i].email_person}</td>
                <td>
                <button type="button" class="btn btn-warning" id="button" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editRecord(${response[i].id_person});reloadFormEdit();">Editar</button>
                <button type="button" class="btn btn-danger" onclick="deleteRecord(${response[i].id_person});" >Apagar</button>
                </td>
            </tr>`;
        }
    
        document.querySelector('.tbody').innerHTML = output;
        
        
    }).catch(error => console.log(error));

}

function editRecord(id){

    fetch('php/edit.php?editId=' + id)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let option = '';
		for(let i in data){
			document.getElementById('edit-id').value = data[i].id_person;	
			document.getElementById('edit_name').value = data[i].name_person;
			document.getElementById('edit_age').value = data[i].age_person;
			document.getElementById('edit_email').value = data[i].email_person;
        }

    loadTable();

    }).catch((error) => {
        Alert('Erro na conexão com o banco!');
    });
}



function reloadFormEdit(){
    document.querySelector('#result-edit').classList.add("hide");
}

function updatePerson(){
    let id = document.getElementById('edit-id').value;
    let namePerson = document.getElementById('edit_name').value;
    let agePerson = document.getElementById('edit_age').value;
    let emailPerson = document.getElementById('edit_email').value;

		let formdata = {
			's_id' : id,
			'namePerson' : namePerson,
			'agePerson' : agePerson,
			'emailPerson' : emailPerson,
		}

		jsondata = JSON.stringify(formdata);

    fetch('php/update.php',{
        method : 'PUT',
        body : jsondata,
        headers: {
            'Content-type' : 'application/json',
        }
    })
    .then((response) => response.text())
    .then((response)=>{
        document.querySelector('.msg-edit').innerHTML = response;
        document.querySelector('#result-edit').classList.remove('hide');
    }).catch((error) => {
    });
}

function deleteRecord(id){

    if (confirm("Deseja realmente deletar?") == false){
        alert("Usuário não foi deletado!")
        loadTable();
    }else{
        
    fetch('php/delete.php?delId=' + id,{
        method : 'DELETE'
    })
    .then((response) => response.text())
    .then((result)=>{
        alert(result);
        loadTable();
    })
    .catch((error) => {
    });
    }
}

function reloadForm(){
    $('.modal').on('hidden.bs.modal', function () { $(this).find('form').trigger('reset'); })
    document.querySelector('#result').classList.add("hide");
}

loadTable();
