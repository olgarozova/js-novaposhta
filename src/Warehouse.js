import WarehouseSchedule from "./WarehouseSchedule";
import Dictionary from "./Dictionary";

class Warehouse {
  constructor(data) {
    this.data = data;
    this.ElementWarehouse = document.createElement("div");
    this.ElementWarehouseNumber = document.createElement("div");
    this.ElementWarehouseAddress = document.createElement("div");
    this.ElementWarehouseMaxWeight = document.createElement("div");
    this.dictionary = new Dictionary();
  }
  render() {
    const {
      ShortAddress,
      CategoryOfWarehouse,
      Number,
      Schedule,
      TotalMaxWeightAllowed,
      PlaceMaxWeightAllowed,
    } = this.data;

    const type =
      CategoryOfWarehouse === "Postomat"
        ? this.dictionary.t("P-t")
        : this.dictionary.t("WH");
    const maxWeight =
      TotalMaxWeightAllowed !== "0"
        ? TotalMaxWeightAllowed
        : PlaceMaxWeightAllowed;

    this.ElementWarehouseNumber.innerHTML = `${type}: ${Number}`;
    this.ElementWarehouseNumber.classList.add("search-warehouses__item-number");
    this.ElementWarehouse.append(this.ElementWarehouseNumber);

    this.ElementWarehouseAddress.innerHTML = `${ShortAddress}`;
    this.ElementWarehouseAddress.classList.add(
      "search-warehouses__item-address"
    );
    this.ElementWarehouse.append(this.ElementWarehouseAddress);

    this.ElementWarehouseMaxWeight.innerHTML = `${maxWeight} ${this.dictionary.t(
      "kg"
    )}`;
    this.ElementWarehouseMaxWeight.classList.add(
      "search-warehouses__item-weight"
    );
    this.ElementWarehouse.append(this.ElementWarehouseMaxWeight);

    this.ElementWarehouse.classList.add("search-warehouses__item");

    const scheduleList = new WarehouseSchedule(Schedule).render();
    this.ElementWarehouse.append(scheduleList);

    return this.ElementWarehouse;
  }
}

export default Warehouse;
