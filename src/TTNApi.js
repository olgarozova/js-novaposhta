import BodyCreator from "./BodyCreator";

/*
* TTN API class
*/

class TTNApi {
    constructor(settings){
        const {apiKey,baseUrl} = settings;

        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    sendRequest(baseUrl,method,body){
        const response = fetch(baseUrl ,{
            method: method,
            body: JSON.stringify(body)
        })
        .then(response => response.json())           
        .catch(error => alert('HTTP request error.  ' + error)); 

        return response; 
    }

    getTTN(ttnId){                      
        const body = new BodyCreator(this.apiKey).create('Treking',{ttnId});// console.dir(body);  
        return this.sendRequest(this.baseUrl,"POST",body);                
    }   

    searchSettlements(city) { // населенные пункты по названию из инпута       
        const body = new BodyCreator(this.apiKey).create('Settlements',{city});
        return this.sendRequest(this.baseUrl,"POST",body);   
    }

    getWarehouses() {//  отделения по коду города //getWarehouses         
        const body = new BodyCreator(this.apiKey).create('Warehouses');
        return this.sendRequest(this.baseUrl,"POST",body);  
    }        
        
}

export default TTNApi;