import Recipient from "./Recipient";
import Sender from "./Sender";


class TTN {
    constructor(data){
        
        this.data = data;                
    }
    viewStatusInfo(resultContainer){
        const {        
            Status,
            CityRecipient,
            CitySender,
            WarehouseRecipient,
            WarehouseSender,
        } = this.data;

        const recipient = new Recipient({CityRecipient,WarehouseRecipient});
                
        let resultHtml = `<p>Status: ${Status}</p>`;
       // if(WarehouseRecipient) resultHtml += `<p><b>Recipient:</b> ${CityRecipient}. ${WarehouseRecipient}</p>`;
       
        if(WarehouseSender) resultHtml += `<p><b>Sender:</b> ${CitySender}. ${WarehouseSender}</p>`;
        
        resultContainer.innerHTML = resultHtml;        
    }    
}

export default TTN;