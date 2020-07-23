import WarehouseSchedule from "./WarehouseSchedule";

class Warehouse{

    constructor(data){
        this.data = data;  
        this.ElementWarehouse = document.createElement('div');
        this.ElementWarehouseNumber = document.createElement('div');
        this.ElementWarehouseAddress = document.createElement('div');
        this.ElementWarehouseMaxWeight = document.createElement('div');  
        
    }
    render(){
        const {                    
            ShortAddress, 
            CategoryOfWarehouse,           
            Number,
            Schedule,            
            TotalMaxWeightAllowed,
            PlaceMaxWeightAllowed
        } = this.data;           
                
        const type = (CategoryOfWarehouse === "Postomat") ? "P-t" : "WH";        
        const maxWeight = TotalMaxWeightAllowed !== '0'  ? TotalMaxWeightAllowed : PlaceMaxWeightAllowed;
     
        //this.ElementWarehouse.innerHTML = `${type}: ${Number}. ${ShortAddress} (${maxWeight} kg) `;  
        this.ElementWarehouseNumber.innerHTML = `${type}: ${Number}`;
        this.ElementWarehouseNumber.classList.add('search-warehouses__item-number');
        this.ElementWarehouse.append(this.ElementWarehouseNumber);

        this.ElementWarehouseAddress.innerHTML = `${ShortAddress}`;
        this.ElementWarehouseAddress.classList.add('search-warehouses__item-address');
        this.ElementWarehouse.append(this.ElementWarehouseAddress);

        this.ElementWarehouseMaxWeight.innerHTML = `${maxWeight} kg`;
        this.ElementWarehouseMaxWeight.classList.add('search-warehouses__item-weight');
        this.ElementWarehouse.append(this.ElementWarehouseMaxWeight);


        this.ElementWarehouse.classList.add('search-warehouses__item');     

        const scheduleList = new WarehouseSchedule(Schedule).render();    
        this.ElementWarehouse.append(scheduleList);     
    

        return this.ElementWarehouse;
    }
}

export default Warehouse;
