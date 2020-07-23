class BodySettlements{
    constructor(data){
        const {city} = data;
        this.modelName = "Address",
        this.calledMethod = "searchSettlements",
        this.methodProperties = {
            "CityName": city        
        }       

    }
}

export default BodySettlements;