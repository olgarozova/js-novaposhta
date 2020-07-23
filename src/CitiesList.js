import City from "./City";

class CitiesList{

    constructor(cities,containerId){
        this.cities = cities;  
        this.container = document.querySelector(`#${containerId}`);  
    }
    render(){    
        this.container.innerHTML = '';
               
        const citiesList =  this.cities.map( city => new City(city,this.container).render()        
        );        
        if(citiesList.length) { 
            this.container.classList.remove('search-warehouses__list-hide'); 
            this.container.append(...citiesList);
            return;
        }
        this.container.classList.add('search-warehouses__list-hide'); 
    }
}

export default CitiesList;