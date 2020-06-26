class TTNApi {
    constructor(apiKey){
        this.apiKey = apiKey;           
    }

    getTTN(ttnId){
        console.log('send request for status of ' + ttnId);
        
        let body = {
            "apiKey": this.apiKey,
            "modelName": "TrackingDocument",
            "calledMethod": "getStatusDocuments",
            "methodProperties": {
                "Documents": [
                    {
                        "DocumentNumber": ttnId,
                        "Phone":""
                    },                    
                ]
            }
            
        };

        let response = fetch('https://api.novaposhta.ua/v2.0/json/',{
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response =>  response.data[0])
        .then(data =>  { // create TTN obj 
            const ttn = new TTN(data.Number,
                                data.StatusCode,
                                data.Status);   //add  WarehouseRecipient, WarehouseSender 
            ttn.viewStatusInfo();
            ttn.addToHistory();   
          
            return ttn;    
        })       
        .catch(error => alert('HTTP request error.  ' + error)); 
       
                      
    }
    
    viewHistoryBlock(){
        console.log('render html history block');
    }
    
    //my individual function
}

class TTN {
    constructor(ttnId,statusCode,status){        
        this.ttnId = ttnId;
        this.statusCode = statusCode;
        this.status = status;
    }
    viewStatusInfo(){
        //return HTML str
        console.log('render html status info');
    }
    addToHistory(){
        //save with localStorage ?
        console.log('add to history '+this.ttnId);
    }
}

class TTNForm {
    constructor(apiKey){
        this.form = document.querySelector("#ttn-status-form"); 
        this.ttnNumberElem = this.form.querySelector("#ttn_number");
           
        this.regExForTTN = /^(5|2|1)[0-9]{13}$/; // common regEx : firstsymbol 5|2|1 , 14 symbols in ttn, only numeric
        this.TTNApi = new TTNApi(apiKey);
    }
    isValidNumber(){        
        if (!this.regExForTTN.test(this.ttnNumberElem.value)) {
            console.log(this.ttnNumberElem.value + ' is not valid');
            return false;
        }        
        return true;
    }
    getInfo(event){ 
        event.preventDefault();              

        if(this.isValidNumber()){
            this.TTNApi.getTTN(this.ttnNumberElem.value);                    
        }      
    }
    init(){        
        this.form.onsubmit = this.getInfo.bind(this);
        this.TTNApi.viewHistoryBlock();
    }    
}
const novaPoshtaForm = new TTNForm('f32192aa4b7940e82fbe254e62673948');
novaPoshtaForm.init();