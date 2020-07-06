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

        this.ElementSender.innerHTML = `Sender: ${CitySender}. ${WarehouseSender}`;        
        return this.ElementSender;
    }
}

export default Sender;