class Warehouse{

    constructor(data){
        this.data = data;  
        this.ElementSender = document.createElement('p');  
    }
    render(){
        const {                    
            Description,            
            Number,
            Schedule,
            ShortAddress,
            PlaceMaxWeightAllowed
        } = this.data;

        this.ElementSender.innerHTML = `warehouse: ${Number}. ${Description}`;    //TODO add all fields    
        return this.ElementSender;
    }
}

export default Warehouse;