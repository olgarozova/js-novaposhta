import Warehouse from "./Warehouse";

class IndexDB{
    constructor(dbStore){
        this.dbStore = dbStore;
    }

    openDB(){
        const idb = window.indexedDB || window.mozIndexedDB ||  window.webkitIndexedDB; //add if (idb)
        return idb.open(this.dbStore,3);
    }

    getWarhousesFromDB(cityRef,warehousesContainer){
       
        const request = this.openDB(); 
        request.onsuccess = function(event) {
            const db = event.target.result;
            warehousesContainer.innerHTML = ""; 
            const transaction = db.transaction(["warehouses"]);
            const objectStore = transaction.objectStore("warehouses");
           
           const index = objectStore.index("SettlementRef");
           const singleKeyRange = IDBKeyRange.only(cityRef);
          
           const cursorIndex = index.openCursor(singleKeyRange);

           cursorIndex.onerror = function(event) {
                alert("Database error: " + event.target.error);  
           };
            cursorIndex.onsuccess = function(event) {
                const res = event.target.result;
                
                if(res) {                   
                    
                    const warehouse = new Warehouse(res.value);                    
                    warehousesContainer.append(warehouse.render());
                    
                    res.continue();                        
                }else {
                    console.log('Entries all displayed.');
                  }
               
            };
        }
    }
    addWarehousesToBD(data){       

        const request = this.openDB();                      
        
        request.onerror = function(event) {
            alert("Database error: " + event.target.error);
        };
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(["warehouses"], "readwrite");
            const objectStore = transaction.objectStore("warehouses");
          
            for (let i in data) {
                objectStore.add(data[i]);                                        
            }                                       
        };

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
        
            if(!db.objectStoreNames.contains("warehouses")) {
                const objectStore = db.createObjectStore("warehouses", { keyPath: "SiteKey" });
                objectStore.createIndex("SettlementRef","SettlementRef", {unique:false});
                objectStore.createIndex("Number","Number", {unique:false});
               // objectStore.createIndex("Ref-Number",["SettlementRef","Number"]);
            }

        };           
    
}
}

export default IndexDB;