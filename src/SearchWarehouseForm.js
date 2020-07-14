import TTNApi from "./TTNApi";
import CitiesList from "./CitiesList";
import IndexDB from "./IndexDB";

class SearchWarehouseForm{
    constructor(settings){
        const {apiKey} = settings;

        this.apiKey = apiKey; 
        this.form = document.querySelector("#search-warehouses-form"); 
        this.form.onsubmit = this.getWarehouses.bind(this);

        this.cityName = this.form.querySelector("#cityName");  
        this.cityName.oninput = this.searchCity.bind(this);
                  
        this.TTNApi = new TTNApi(settings);                

        this.warehousesContainer = document.querySelector("#warehouses-result");
        this.CitiesContainerId = 'cities-drop-down-ul';         
                
        this.indexDB = new IndexDB('WarehousesNP3');
                                
    }

    searchCity(event){ 
        const cityValue = event.target.value;       
        const response = this.TTNApi.searchSettlements(cityValue);        
        response.then(response => response.data[0].Addresses
        ).then(data => {            
            const citiesList = new CitiesList(data,this.CitiesContainerId);
            citiesList.render();           
        });  

    }
    getWarehouses(event){
        event.preventDefault();          
        if(this.cityName.dataset.cityRef){                       
           const res = this.indexDB.getWarhousesFromDB(this.cityName.dataset.cityRef,this.warehousesContainer); //byRef          
        }else {
            alert('Please, select city from dropdown list.');
        }        
    }
        
    init(){
        //TODO setInterval 1 per day get warehouses
        const response = this.TTNApi.getWarehouses();        
        response.then(response => response.data)
        .then(data => {
           // console.dir(data);
            this.indexDB.addWarehousesToBD(data);           
        });                
    }
}
export default SearchWarehouseForm;