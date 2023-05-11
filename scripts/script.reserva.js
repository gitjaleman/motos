sessionStorage.clear();
$(document).ready(function() {
    getTipoDocumento();
    getTipoReserva();
    frmReserva();
});



const getTipoDocumento = () =>{
    apiHandler.fetchData('tipo_documento', null, (data)=>{
        let select_data = data.data;
        $('#tipo_documento').html('');
        for (let item of select_data) {
            $('#tipo_documento').append(
                '<option value="'+item.id+'">'+item.tipo+'</option>'
            );
        }
    })
}

const getTipoReserva = () =>{
    apiHandler.fetchData('tipo_reserva', null, (data)=>{
        let select_data = data.data;
        $('#tipo_reserva').html('');
        for (let item of select_data) {
            $('#tipo_reserva').append(
                '<option value="'+item.id+'">'+item.tipo+'</option>'
            );
        }
    })
}


const frmReserva = () =>{
    $('#frm_reserva').submit(function(e) {
        e.preventDefault(); 
        let formData = new FormData();
        formData.append('nombres', $('#nombres').val());
        formData.append('apellidos', $('#apellidos').val());
        formData.append('tipo_documento', $('#tipo_documento').val());
        formData.append('identificacion', $('#identificacion').val());
        formData.append('email', $('#email').val());
        formData.append('fecha', $('#fecha').val());
        formData.append('tipo_reserva', $('#tipo_reserva').val());
        formData.append('personas', $('#personas').val());
        formData.append('descripcion', $('#descripcion').val());
        apiHandler.postData('reserva', formData, (data)=>{
            data.status==true?processSuccess(data):processError();
        }) 
    });
}

const processSuccess = (data) =>{
    notification('success','se registro su reserva');
    $('#frm_reserva')[0].reset();
}

const processError = () =>{
    console.log('error');
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


