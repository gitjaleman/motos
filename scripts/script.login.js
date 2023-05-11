
$(document).ready(function() {
    frmLogin();
});





const frmLogin = () =>{
    $('#frm_login').submit(function(e) {
        e.preventDefault(); 
        let formData = new FormData();
        formData.append('email', $('#email').val());
        formData.append('password', $('#password').val());
        apiHandler.postData('login', formData, (data)=>{
           data.status==true?processSuccess(data):processError();
        }) 
    });
}

const processSuccess = (data) =>{
    sessionStorage.setItem("session", 'active');
    sessionStorage.setItem("nombre", data.data[0].nombre);
    locationPage('admin');
   
}

const processError = () =>{
    notification('error','!!ups. Usuiario o contraseña incorrecta');
}


const notification = (status,msn) =>{
    toastr[status](msn)

    toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    }
}
