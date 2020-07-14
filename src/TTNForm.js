import TTNApi from "./TTNApi";
import TTNHistory from "./TTNHistory"; 
import TTN from "./TTN";

class TTNForm {

    constructor(settings){
        const {apiKey} = settings;

        this.apiKey = apiKey; 

        this.form = document.querySelector("#ttn-status-form"); 
        this.form.onsubmit = this.getInfo.bind(this);
        this.ttnNumberElem = this.form.querySelector("#ttn_number");    
        this.message = this.form.querySelector("#ttn_number__error");
           
        this.regExForTTN = /^(5|2|1)[0-9]{13}$/;
        this.TTNApi = new TTNApi(settings);                

        this.statusInfoContainer = document.querySelector("#ttn-status-result");
        this.ttnHistory = new TTNHistory(settings,this);
        
    }

    isValidNumber(){        
        if (!this.regExForTTN.test(this.ttnNumberElem.value)) {           
            return false;
        }        
        return true;
    }
    getInfo(event){ 
        event.preventDefault();              

        if(this.isValidNumber()){
            this.ttnNumberElem.classList.remove('invalid');
            this.message.classList.remove('show');            

            const response = this.TTNApi.getTTN(this.ttnNumberElem.value);                           

            response.then(response => response.data[0])
            .then(data =>  {            
                // create TTN obj 
                const ttn = new TTN(data);              
                return ttn;    
            })
            .then(ttn => {
                ttn.viewStatusInfo(this.statusInfoContainer);
                this.ttnHistory.addToHistory(ttn.data.Number);                
            });            
        }else{
            this.ttnNumberElem.classList.add('invalid');
            this.message.classList.add('show');
            this.statusInfoContainer.innerHTML = '';
        }      
    }    

    init(){                
        this.ttnHistory.render();       
    }    
}

export default TTNForm;