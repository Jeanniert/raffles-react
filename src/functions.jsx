import Swal from "sweetalert2";
import storage from "./Storage/storage";
import axios from "axios";

export const show_alerta= (msj, icon)=> {
    Swal.fire({title:msj, icon:icon, buttonsStyling:true});
}

export const sendRequest = async(method, params, url, redir= '')=>{
    let res;
    await axios({method:method, url:url, data:params}).then(
        response => {
            res= response.data,
            (method != 'GET') ? show_alerta(response.data.message, 'success'):'',
            setTimeout( ()=>
                (redir !== '') ? window.location.href= redir:'', 2000)
            
        }).catch( (errors)=>{
            let desc='';
            res= errors.response.data;
            show_alerta(errors.response.data.message, 'error')
        })
        return res;
}

export const confirmation = async(name, url, redir)=>{
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'Are you sure delete '+name+'?',
        icon:'question', showCancelButton:true,
        confirmButtonText: '<i class= "fa-solid fa-check"></i> Yes, delete',
        cancelButtonText: '<i class= "fa-solid fa-ban"></i> Cancel'
    }).then( (result)=> {
        if(result.isConfirmed){
            sendRequest('DELETE', {}, url, redir);
        }
    })
}
export default show_alerta;