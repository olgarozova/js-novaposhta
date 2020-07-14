class BodyCreator{
    constructor(apiKey){
        this.apiKey = apiKey;
    }
    create(type,data = {}){
        if(type === 'Treking'){
            const {ttnId} = data;                              
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
        if(type === 'Settlements'){
            const {city} = data;
            this.modelName = "Address",
            this.calledMethod = "searchSettlements",
            this.methodProperties = {
                "CityName": city        
            }
        }
        if(type === 'Warehouses'){            
            this.modelName = "AddressGeneral",
            this.calledMethod = "getWarehouses",
            this.methodProperties = {
                "Language": "ru"        
            }
        }        
    return this;
    }

}

export default BodyCreator;