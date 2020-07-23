import BodyTreking from "./BodyTreking";
import BodySettlements from "./BodySettlements";
import BodyWarehouses from "./BodyWarehouses";

class BodyCreator{
    constructor(apiKey){
        this.apiKey = apiKey;
    }
    create(type,data = {}){
        let body = {};        
        switch (type) {
            case "BodyTreking":
                body = new BodyTreking(data);
                break;
            case "BodySettlements":
                body = new BodySettlements(data);
                break;
            case "BodyWarehouses":
                body = new BodyWarehouses(data);
                break;           
        }

        body.apiKey = this.apiKey;             
        return body;
    }
}

export default BodyCreator;