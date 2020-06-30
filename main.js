
/*class RequestFactory {

     createRequest (type,apiKey,ttnId = '') {     
        let body; 
        if (type === 'Treking') {
            body = new Treking(ttnId);
        }else if(type === 'TtnList'){
            body = new TtnList();
        }
        body.apiKey = apiKey;

    }
  }

class Treking {
    constructor(ttnId){               
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


class TTNApi {
    constructor(apiKey){
        this.apiKey = apiKey;        
    }

    getTTN(ttnId){
        console.log('send request for status of ' + ttnId);
       // let body = RequestFactory.createRequest('Treking',apiKey,ttnId);

        
        let body = { //TODO : create new class Treking
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

       const response = fetch('https://api.novaposhta.ua/v2.0/json/',{
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response =>  response.data[0])
        .then(data =>  { // create TTN obj 
            const ttn = new TTN(data.Number,
                                data.StatusCode,
                                data.Status);   //TODO: add  WarehouseRecipient, WarehouseSender 
          
            return ttn;    
        })       
        .catch(error => alert('HTTP request error.  ' + error)); 

        return response;                    
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
        //return HTML 
        console.log('render html status info');
    }
    addToHistory(){
        //save with localStorage ?
        console.log('add to history '+this.ttnId);
        
        let ttns = JSON.parse(localStorage.getItem('historyTtns') || '[]' );
       
        if(!ttns.includes(this.ttnId)) {
            ttns.push(this.ttnId);        
            localStorage.setItem('historyTtns',JSON.stringify(ttns)); 
            TTN_History.viewHistoryBlock();               
        }
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
            const response = this.TTNApi.getTTN(this.ttnNumberElem.value);                           

            //add to history here!               
            response.then(ttn => {
                ttn.viewStatusInfo();
                ttn.addToHistory();
            });
            
        }      
    }    

    init(){        
        this.form.onsubmit = this.getInfo.bind(this);       
        TTN_History.viewHistoryBlock();
    }    
}
/***************************************************/

class TTN_History{
    static getHistoryTtns(){
        let ttns = JSON.parse(localStorage.getItem('historyTtns') || '[]');       
        return ttns;
    }
    static getHistoryInfo(event){ 
        // event.preventDefault();              
 
         if(this.isValidNumber()){
             this.TTNApi.getTTN(this.ttnNumberElem.value);     
             //add to history here!               
         }      
     }

    static viewHistoryBlock(){
        const ttnHistoryContainer = document.querySelector(".ttns-history__result");
        const ttns = this.getHistoryTtns();
        console.log('render html history block');

        if(!!ttns.length){
           
            const ul = document.createElement('ul');          
           
            ttns.forEach(ttn => { 

                const li = document.createElement('li');//add onclick event
                                
                li.onclick = this.getHistoryInfo;
                ul.appendChild(li);
                li.innerHTML = ttn;

            });
            ttnHistoryContainer.innerHTML = '';            
            ttnHistoryContainer.appendChild(ul);
            

          
            //add button 'clear history'
            const btnClear = document.createElement("button");
            btnClear.innerHTML = "Clear history";
            btnClear.onclick = this.deleteHistory.bind(this);                
            ttnHistoryContainer.appendChild(btnClear);  
        }else{           
            ttnHistoryContainer.innerHTML = 'The history is empty';
        }
    }
    static deleteHistory(){
        console.log('delete all history');
        localStorage.removeItem('historyTtns');
        this.viewHistoryBlock();
    }

}



const novaPoshtaForm = new TTNForm('f32192aa4b7940e82fbe254e62673948');
novaPoshtaForm.init();