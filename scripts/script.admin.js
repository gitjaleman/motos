sessionActive();
$(document).ready(function() {
    localStorage.setItem('url','');
    getTipoDocumento();
    getTipoReserva();
    getReservas();
    frmFilter();
    frm_update_reserva();
});

const getTipoDocumento = () =>{
    apiHandler.fetchData('tipo_documento', null, (data)=>{
        let select_data = data.data;
        localStorage.setItem('documento', JSON.stringify(select_data));
        for (let item of select_data) {
            $('#tipo_documento').append(
                '<option value="'+item.id+'">'+item.tipo+'</option>'
            );
        }
        for (let item of select_data) {
            $('#up_tipo_documento').append(
                '<option value="'+item.id+'">'+item.tipo+'</option>'
            );
        }
    })
}

const getTipoReserva = () =>{
    apiHandler.fetchData('tipo_reserva', null, (data)=>{
        let select_data = data.data;
        localStorage.setItem('reserva', JSON.stringify(select_data));
        for (let item of select_data) {
            $('#tipo_reserva').append(
                '<option value="'+item.id+'">'+item.tipo+'</option>'
            );
        }
        for (let item of select_data) {
            $('#up_tipo_reserva').append(
                '<option value="'+item.id+'">'+item.tipo+'</option>'
            );
        }
    })
}

const frmFilter = () =>{
    $('#frm_filter').submit(function(e) {
        e.preventDefault();
        let nombres = $('#nombres').val();
        let apellidos = $('#apellidos').val();
        let tipo_documento = $('#tipo_documento').val();
        let identificacion = $('#identificacion').val();
        let fecha = $('#fecha').val();
        let tipo_reserva = $('#tipo_reserva').val();
        let personas = $('#personas').val();
        let estado = $('#estado').val();

        let getUrl ="?";

        if(nombres!=''){
            getUrl= getUrl+"nombres="+nombres+"&";
        }
        if(apellidos!=''){
            getUrl= getUrl+"apellidos="+apellidos+"&";
        }
        if(tipo_documento!='null'){
            getUrl= getUrl+"tipo_documento="+tipo_documento+"&";
        }
        if(identificacion!=''){   
            getUrl= getUrl+"identificacion="+identificacion+"&";
        }
        if(fecha!=''){
            getUrl= getUrl+"fecha="+fecha+"&";
        }
        if(tipo_reserva!='null'){
            getUrl= getUrl+"tipo_reserva="+tipo_reserva+"&";
        }
        if(personas!=''){
            getUrl= getUrl+"personas="+personas+"&";
        }
        if(estado!='null'){
            getUrl= getUrl+"estado="+estado+"&";
        }
        getUrl = getUrl.slice(0, -1); 
        localStorage.setItem('url',getUrl);
        getReservas();


    });
}



const  getReservas = () =>{
    let url = localStorage.getItem('url');
    let path = 'reserva'+url;
    apiHandler.fetchData(path, null, (data)=>{
        if (data.status) {
            processTable(data.data)
        }else{
            console.log(data);
        }
    })
}


const processTable = (data) =>{
    let num = 1;
    $('#tbl').html('');
    for (let item of data) {
        $('#tbl').append(
            '<div class="row_'+esPar(num)+'">'+
                '<div class="item">'+item.nombres+'</div>'+
                '<div class="item">'+item.apellidos+'</div>'+
                '<div class="item">'+tipoDocumento(item.tipo_documento)+'</div>'+
                '<div class="item">'+item.identificacion+'</div>'+
                '<div class="item">'+item.fecha+'</div>'+
                '<div class="item">'+tipoReserva(item.tipo_reserva)+'</div>'+
                '<div class="item">'+item.personas+'</div>'+
                '<div class="item">'+item.estado+'</div>'+
                '<div class="item">'+
                    '<div class="btn" onclick="getId('+item.id+')" >'+
                        '<i class="ri-add-circle-line"></i>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );
        num++;
    }
}

const esPar = (num) =>{
    if(num % 2 == 0){
        return 1;
    }else{
        return 2
    }
}

const resetFilter = () =>{
    $('#frm_filter')[0].reset();
    localStorage.setItem('url','');
    getReservas();
}

const tipoDocumento = (v) =>{
    let datos = localStorage.getItem('documento');
    datos = JSON.parse(datos);
    let res = datos.find(elemento => elemento.id === v).tipo;
    return res;
}
const tipoReserva = (v) =>{
    let datos = localStorage.getItem('reserva');
    datos = JSON.parse(datos);
    let res = datos.find(elemento => elemento.id === v).tipo;
    return res;
}


const getId = (id) =>{
    $('#modal').slideDown(0);
    apiHandler.fetchData('reserva?id='+id, null, (data)=>{
        if (data.status) {
 
            let reserva = data.data[0];

            $('#up_nombres').val(reserva.nombres);
            $('#up_apellidos').val(reserva.apellidos);
            $('#up_tipo_documento').val(reserva.tipo_documento);
            $('#up_identificacion').val(reserva.identificacion);
            $('#up_email').val(reserva.email);
            $('#up_fecha').val(reserva.fecha);
            $('#up_tipo_reserva').val(reserva.tipo_reserva);
            $('#up_personas').val(reserva.personas);
            $('#up_descripcion').val(reserva.descripcion);
            $('#up_id').val(reserva.id);


        }
    })
}


const  closeModal = () =>{
    $('#modal').slideUp(0);
}

const frm_update_reserva = () =>{
    $('#frm_update_reserva').submit(function(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('id', $('#up_id').val());
        formData.append('nombres', $('#up_nombres').val());
        formData.append('apellidos', $('#up_apellidos').val());
        formData.append('tipo_documento', $('#up_tipo_documento').val());
        formData.append('identificacion', $('#up_identificacion').val());
        formData.append('email', $('#up_email').val());
        formData.append('fecha', $('#up_fecha').val());
        formData.append('tipo_reserva', $('#up_tipo_reserva').val());
        formData.append('personas', $('#up_personas').val());
        formData.append('descripcion', $('#up_descripcion').val());
        apiHandler.postData('reserva/update', formData, (data)=>{
            data.status==true?processSuccess():processError();
        })

    });
}



const  confirmar = ()=>{

    let id = $('#up_id').val();
    apiHandler.postData('reserva/confirmate?id='+id,null, (data)=>{
        data.status==true?processSuccess():processError();
    })
}




const  processSuccess = ()=>{
    notification('success','Datos Actualizados');
    closeModal();
    getReservas();
}

const  processError = ()=>{
    notification('Error','!Upps algo salio mal, intentalo de nuevo.');
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