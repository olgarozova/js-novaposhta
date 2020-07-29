
class Dictionary{
    constructor(){
        this.words  = {
            'Sender' : ' Вiдправник',
            'Recipient' : 'Одержувач',
            'Status' : 'Статус',
            'Get novaposhta TTN status' : 'Отримати статус за номером ТТН',
            'Search warehouses' : 'Пошук відділення',
            'Clear history' : 'Почистити iсторiю',
            'The history is empty' : 'Iсторiя порожня',
            'History' : 'Iсторiя',
            'Track your TTN' : 'Відстежити ТТН',
            'Search by number or location' : 'Пошук відділення за номером або за населеним пунктом',
            '14 symbols only. First symbol should be 5,2 or 1. Only numbers' : 'Тільки 14 символів. Перший символ повинен бути 5,2 або 1. Тільки цифри',
            'Get status TTN' : 'Відстежити',
            'Enter TTN number' : 'Введіть номер',
            'Enter city' : 'Оберіть насел. пункт',
            'WH' : ' Вiдд',
            'P-t':'П-т',
            'kg' : 'кг',
            'Schedule' : 'Графік роботи',
            'Monday' :'Пн',
            'Tuesday' : 'Вт',
            'Wednesday' : 'Ср',
            'Thursday' : 'Чт',
            'Friday' : 'Пт',
            'Saturday' : 'Суб',
            'Sunday' :'Нд',            

        };
        this.containerIds = ['tab1-link-title','tab2-link-title','ttns-history-title','tab1-container-title',
            'tab2-container-title','ttn_number__error','ttn-status-submit','ttn_number','cityName','search-warehouses-submit'];
    }

    t(word){         
        return this.words[word] ? this.words[word] : word;
    }

    translateHTMLText(){            
        this.containerIds.forEach(id => {           
            const el = document.querySelector(`#${id}`);
            el.innerText = this.t(el.innerText);
            if(el.placeholder) el.placeholder = this.t(el.placeholder);
        });
        
    }
}
export default Dictionary;