class Recipient{
    constructor(data){
        this.data = data;   
    }
    render(){
        const {                    
            CityRecipient,            
            WarehouseRecipient
        } = this.data;

        return `<p><b>Recipient:</b> ${CityRecipient}. ${WarehouseRecipient}</p>`;
    }
}

export default Recipient;