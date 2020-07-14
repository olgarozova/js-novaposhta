import TTNForm from "./TTNForm";
import SearchWarehouseForm from "./SearchWarehouseForm";
import settings from "./settings";

const getTTnStatusForm = new TTNForm(settings);
getTTnStatusForm.init();

const searchWarehouseForm = new SearchWarehouseForm(settings);
searchWarehouseForm.init();