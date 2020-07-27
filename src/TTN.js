import Recipient from "./Recipient";
import Sender from "./Sender";
import Dictionary from "./Dictionary";


class TTN {
    constructor(data){
        
        this.data = data;  
        this.ElementStatus = document.createElement('p');         
    }
    viewStatusInfo(resultContainer){
        const {        
            Status,
            CityRecipient,
            CitySender,
            WarehouseRecipient,
            WarehouseSender,
        } = this.data;

        resultContainer.innerHTML = "";

        this.ElementStatus.classList.add('ttn-status-result__status');       
        this.ElementStatus.innerHTML = `${Dictionary.t("Status")}:  + ${Status}`;
        resultContainer.appendChild(this.ElementStatus);
        if(WarehouseRecipient){       
            const recipient = new Recipient({CityRecipient,WarehouseRecipient});        
            resultContainer.appendChild(recipient.render());
        }
        if(WarehouseSender){       
            const sender = new Sender({CitySender,WarehouseSender});
            resultContainer.appendChild(sender.render());
        }
                       
    }    
}

export default TTN;