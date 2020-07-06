import TTN from "./TTN";
import Treking from "./Treking";

/*
* TTN API class
*/

class TTNApi {
    constructor(settings){
        const {apiKey,baseUrl} = settings;

        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    getTTN(ttnId){              

        const body = new Treking(this.apiKey,ttnId);

        const response = fetch(this.baseUrl ,{
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