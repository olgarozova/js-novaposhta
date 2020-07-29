import Dictionary from "./Dictionary";

class Recipient{
    constructor(data){
        this.data = data;  
        this.ElementRecipient = document.createElement('p');
        this.dictionary = new Dictionary(); 
    }
    render(){
        const {                    
            CityRecipient,            
            WarehouseRecipient
        } = this.data;

        this.ElementRecipient.innerHTML = `${this.dictionary.t("Recipient")}: ${CityRecipient}. ${WarehouseRecipient}`;        
        return this.ElementRecipient;
    }
}

export default Recipient;