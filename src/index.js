import TTNForm from "./TTNForm";
import SearchWarehouseForm from "./SearchWarehouseForm";
import settings from "./settings";
import Dictionary from "./Dictionary";

const getTTnStatusForm = new TTNForm(settings);
getTTnStatusForm.init();

const searchWarehouseForm = new SearchWarehouseForm(settings);
searchWarehouseForm.init();

const dictionary = new Dictionary();
dictionary.translateHTMLText();
