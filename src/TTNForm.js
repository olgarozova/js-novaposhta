import TTNApi from "./TTNApi";
import TTNHistory from "./TTNHistory"; 

class TTNForm {

    constructor(apiKey){
        this.apiKey = apiKey; 
        this.form = document.querySelector("#ttn-status-form"); 
        this.ttnNumberElem = this.form.querySelector("#ttn_number");    
        this.message = this.form.querySelector("#ttn_number__error");
           
        this.regExForTTN = /^(5|2|1)[0-9]{13}$/;
        this.TTNApi = new TTNApi(apiKey);

        this.statusInfoContainer = document.querySelector("#ttn-status-result");
        
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

                         
            response.then(ttn => {
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
        this.ttnHistory = new TTNHistory(this.apiKey,this);      
        this.form.onsubmit = this.getInfo.bind(this);       
        this.ttnHistory.viewHistoryBlock();
    }    
}

export default TTNForm;