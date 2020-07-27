import Dictionary from "./Dictionary";

class Sender{

    constructor(data){
        this.data = data;  
        this.ElementSender = document.createElement('p');        
    }
    render(){
        const {                    
            CitySender,            
            WarehouseSender
        } = this.data;
        
        this.ElementSender.innerHTML = `${Dictionary.t("Sender")}: ${CitySender}. ${WarehouseSender}`;        
        return this.ElementSender;
    }
}

export default Sender;