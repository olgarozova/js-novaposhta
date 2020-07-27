import TTNForm from "./TTNForm";
import SearchWarehouseForm from "./SearchWarehouseForm";
import settings from "./settings";
import Dictionary from "./Dictionary";

const getTTnStatusForm = new TTNForm(settings);
getTTnStatusForm.init();

const searchWarehouseForm = new SearchWarehouseForm(settings);
searchWarehouseForm.init();

Dictionary.translateHTMLText('tab1-link-title');
Dictionary.translateHTMLText('tab2-link-title');
Dictionary.translateHTMLText('ttns-history-title');
