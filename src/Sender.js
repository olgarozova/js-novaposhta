import Dictionary from "./Dictionary";

class Sender{

    constructor(data){
        this.data = data;  
        this.ElementSender = document.createElement('p');   
        this.dictionary = new Dictionary();     
    }
    render(){
        const {                    
            CitySender,            
            WarehouseSender
        } = this.data;
        
        this.ElementSender.innerHTML = `${this.dictionary.t("Sender")}: ${CitySender}. ${WarehouseSender}`;        
        return this.ElementSender;
    }
}

export default Sender;