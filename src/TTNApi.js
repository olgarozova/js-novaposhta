import TTN from "./TTN";
import Treking from "./Treking";
//import settings from "./settings";

/*
* TTN API class
*/

class TTNApi {
    constructor(apiKey){
        this.apiKey = apiKey;        //add destruction settings //settings
    }

    getTTN(ttnId){              

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

export default TTNApi;