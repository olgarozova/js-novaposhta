import Dictionary from "./Dictionary";

class WarehouseSchedule{
    constructor(data){
        this.data = data;         
        this.ElementSchedule = document.createElement('div');
        this.ElementScheduleList = document.createElement('ul');
        this.ElementScheduleOpen = document.createElement('span'); 
        this.dictionary = new Dictionary();         
    }

    render(){
        
        const schedule = Object.entries(this.data).map( ([day, time] )=> {            
            const elementDay = document.createElement('li');             // TODO new WarehouseScheduleDay ?
            elementDay.classList.add('search-warehouses__item-schedule-day');
            elementDay.innerHTML = `${this.dictionary.t(day)}: ${time}`;            
            return elementDay;
        });
        this.ElementScheduleList.classList.add('search-warehouses__item-schedule-list');
        this.ElementScheduleList.append(...schedule);

        this.ElementScheduleOpen.classList.add('search-warehouses__item-schedule-arrow');       
        this.ElementScheduleOpen.innerHTML = this.dictionary.t('Schedule');
        this.ElementScheduleOpen.onclick = function (){            
            this.parentElement.classList.toggle('search-warehouses__item-schedule-open');
        }
        

        

        this.ElementSchedule.classList.add('search-warehouses__item-schedule');
        this.ElementSchedule.append(this.ElementScheduleOpen,this.ElementScheduleList);        
        
        return this.ElementSchedule;        
    }
}

export default WarehouseSchedule;