import TTNApi from "./TTNApi";

class TTNHistory{ 
    constructor(apiKey,ttnForm){ 
        this.ttnApi = new TTNApi(apiKey);
        this.ttnForm = ttnForm; // get from  novaPoshtaForm ?
        this.statusInfoContainer = document.querySelector("#ttn-status-result");
    }

    getHistoryTtns(){
        let ttns = JSON.parse(localStorage.getItem('historyTtns') || '[]');       
        return ttns;
    }
    addToHistory(ttnId){                
        
        let ttns = JSON.parse(localStorage.getItem('historyTtns') || '[]' );
       
        if(!ttns.includes(ttnId)) {
            ttns.push(ttnId);        
            localStorage.setItem('historyTtns',JSON.stringify(ttns)); 
            this.viewHistoryBlock();               
        }
    }
    getHistoryInfo(event){                               
        
        const ttn = event.target.innerText;           
        this.ttnForm.ttnNumberElem.value = ttn;

       // novaPoshtaForm.ttnNumberElem.value = ttn;

        const response = this.ttnApi.getTTN(ttn);  
        response.then(ttn => {
            ttn.viewStatusInfo(this.statusInfoContainer);           
        });            
               
     }

    viewHistoryBlock(){
        const ttnHistoryContainer = document.querySelector(".ttns-history__result");
        const ttns = this.getHistoryTtns();      

        if(ttns.length){
           
            const ul = document.createElement('ul');          
           
            ttns.forEach(ttn => { 

                const li = document.createElement('li');
                li.classList.add('ttns-history__result-item');
                                
                li.onclick = this.getHistoryInfo.bind(this);
                ul.appendChild(li);
                li.innerHTML = ttn;

            });
            ttnHistoryContainer.innerHTML = '';            
            ttnHistoryContainer.appendChild(ul);
                      
            //add button 'clear history'
            const btnClear = document.createElement("button");
            btnClear.innerHTML = "Clear history";
            btnClear.classList.add('form-btn');
            btnClear.onclick = this.deleteHistory.bind(this);                
            ttnHistoryContainer.appendChild(btnClear);  
        }else{           
            ttnHistoryContainer.innerHTML = 'The history is empty';
        }
    }
    deleteHistory(){       
        localStorage.removeItem('historyTtns');
        this.viewHistoryBlock();
    }

}
export default TTNHistory;