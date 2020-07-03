
/*
class TtnList {
    constructor(DateFrom,DateTo){               
        this.modelName = "InternetDocument";
        this.calledMethod = "getDocumentList";
        this.methodProperties = {
            "DateTimeFrom" : DateFrom,
            "DateTimeFrom" : DateTo,
            "Page" :1,
            "GetFullList": "0"
        };
    }
        
}*/
/***********************************************************/
/*class RequestFactory {

    createRequest (type,apiKey,data) {     
       let body; 
       if (type === 'Treking') {
           body = new Treking(data.ttnId);
       }
       body.apiKey = apiKey;

   }
 }
 */
class Treking {
    constructor(apiKey,ttnId){               
        this.apiKey = apiKey;
        this.modelName = "TrackingDocument";
        this.calledMethod = "getStatusDocuments";
        this.methodProperties = {
            "Documents": [
                {
                    "DocumentNumber": ttnId,
                    "Phone":""
                },                    
            ]
        };
        
    }
}

/*******************************************************/

class TTNApi {
    constructor(apiKey){
        this.apiKey = apiKey;        
    }

    getTTN(ttnId){              
        
        /*let body = { //TODO : create new class Treking
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
            
        };*/
        const body = new Treking(this.apiKey,ttnId);

        const response = fetch('https://api.novaposhta.ua/v2.0/json/',{
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response =>  response.data[0])
        .then(data =>  {            
            // create TTN obj 
            const ttn = new TTN(data);
          
            return ttn;    
        })       
        .catch(error => alert('HTTP request error.  ' + error)); 

        return response;                    
    }       
    
    //my individual function
}

class TTN {
    constructor(data){
        
        this.data = data;                
    }
    viewStatusInfo(resultContainer){
        const {
            Number,
            Status,
            StatusCode,
            ActualDeliveryDate,
            CityRecipient,
            CitySender,
            WarehouseRecipient,
            WarehouseSender,
        } = this.data;
                
        let resultHtml = `<p>Status: ${Status}</p>`;
        if(WarehouseRecipient) resultHtml += `<p><b>Recipient:</b> ${CityRecipient}. ${WarehouseRecipient}</p>`;
        if(WarehouseSender) resultHtml += `<p><b>Sender:</b> ${CitySender}. ${WarehouseSender}</p>`;
        
        resultContainer.innerHTML = resultHtml;        
    }    
}
/********************************************************************/
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
        this.ttnHistory = new TTN_History(this.apiKey/*,this*/);      
        this.form.onsubmit = this.getInfo.bind(this);       
        this.ttnHistory.viewHistoryBlock();
    }    
}

/***************************************************/

class TTN_History{ 
    constructor(apiKey/*,ttnForm*/){ 
        this.ttnApi = new TTNApi(apiKey);
      //  this.ttnForm = ttnForm; // get from  novaPoshtaForm ?
        this.statusInfoContainer = document.querySelector("#ttn-status-result");
    }

    getHistoryTtns(){
        let ttns = JSON.parse(localStorage.getItem('historyTtns') || '[]');       
        return ttns;
    }
    addToHistory(ttnId){                
        
        let ttns = JSON.parse(localStorage.getItem('historyTtns') || '[]' );
       
        if(!ttns.includes(ttnId)) {
            ttns.push(ttnId);        
            localStorage.setItem('historyTtns',JSON.stringify(ttns)); 
            this.viewHistoryBlock();               
        }
    }
    getHistoryInfo(event){                               
        
        const ttn = event.target.innerText;           
        //this.ttnForm.ttnNumberElem.value = ttn;

        novaPoshtaForm.ttnNumberElem.value = ttn;

        const response = this.ttnApi.getTTN(ttn);  
        response.then(ttn => {
            ttn.viewStatusInfo(this.statusInfoContainer);           
        });            
               
     }

    viewHistoryBlock(){
        const ttnHistoryContainer = document.querySelector(".ttns-history__result");
        const ttns = this.getHistoryTtns();      

        if(!!ttns.length){
           
            const ul = document.createElement('ul');          
           
            ttns.forEach(ttn => { 

                const li = document.createElement('li');
                li.classList.add('ttns-history__result-item');
                                
                li.onclick = this.getHistoryInfo.bind(this);
                ul.appendChild(li);
                li.innerHTML = ttn;

            });
            ttnHistoryContainer.innerHTML = '';            
            ttnHistoryContainer.appendChild(ul);
                      
            //add button 'clear history'
            const btnClear = document.createElement("button");
            btnClear.innerHTML = "Clear history";
            btnClear.classList.add('form-btn');
            btnClear.onclick = this.deleteHistory.bind(this);                
            ttnHistoryContainer.appendChild(btnClear);  
        }else{           
            ttnHistoryContainer.innerHTML = 'The history is empty';
        }
    }
    deleteHistory(){       
        localStorage.removeItem('historyTtns');
        this.viewHistoryBlock();
    }

}

const novaPoshtaForm = new TTNForm('f32192aa4b7940e82fbe254e62673948');
novaPoshtaForm.init();
