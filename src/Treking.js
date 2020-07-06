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

export default Treking;