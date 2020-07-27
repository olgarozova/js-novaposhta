
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
        };
    }

    static t(word){ 

        const dictionary = new this(); 
        return dictionary.words[word] ? dictionary.words[word] : word;
    }

    static translateHTMLText(containerId){     

        const el = document.querySelector(`#${containerId}`);       
        el.innerText = this.t(el.innerText);
    }
}
export default Dictionary;