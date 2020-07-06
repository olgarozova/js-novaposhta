class Recipient{
    constructor(data){
        this.data = data;  
        this.ElementRecipient = document.createElement('p'); 
    }
    render(){
        const {                    
            CityRecipient,            
            WarehouseRecipient
        } = this.data;

        this.ElementRecipient.innerHTML = `Recipient: ${CityRecipient}. ${WarehouseRecipient}`;        
        return this.ElementRecipient;
    }
}

export default Recipient;