import City from "./City";

class CitiesList{

    constructor(cities,containerId){
        this.cities = cities;  
        this.container = document.querySelector(`#${containerId}`);  
    }
    render(){    
        this.container.innerHTML = '';
        this.container.classList.remove('search-warehouses__list-hide');        
        const citiesList =  this.cities.map( city => new City(city,this.container).render()        
        );
        
        this.container.append(...citiesList);
    }
}

export default CitiesList;