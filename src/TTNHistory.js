import TTNApi from "./TTNApi";
import TTN from "./TTN";
import Dictionary from "./Dictionary";

class TTNHistory {
  constructor(settings, ttnForm) {
    this.ttnApi = new TTNApi(settings);
    this.ttnForm = ttnForm;
    this.statusInfoContainer = document.querySelector("#ttn-status-result");
    this.dictionary = new Dictionary();
  }

  getHistoryTtns() {
    let ttns = JSON.parse(localStorage.getItem("historyTtns") || "[]");
    return ttns;
  }
  addToHistory(ttnId) {
    let ttns = JSON.parse(localStorage.getItem("historyTtns") || "[]");

    if (!ttns.includes(ttnId)) {
      ttns.push(ttnId);
      localStorage.setItem("historyTtns", JSON.stringify(ttns));
      this.render();
    }
  }
  getHistoryInfo(event) {
    const ttn = event.target.innerText;
    this.ttnForm.ttnNumberElem.value = ttn;
    this.ttnForm.clearError();

    const response = this.ttnApi.getTTN(ttn);
    response
      .then((response) => response.data[0])
      .then((data) => {
        const ttn = new TTN(data);
        return ttn;
      })
      .then((ttn) => {
        ttn.viewStatusInfo(this.statusInfoContainer);
      });
  }

  render() {
    const ttnHistoryContainer = document.querySelector(".ttns-history__result");
    const ttns = this.getHistoryTtns();

    if (ttns.length) {
      const ul = document.createElement("ul");
      ul.classList.add("ttns-history__result-list");

      ttns.forEach((ttn) => {
        const li = document.createElement("li");
        li.classList.add("ttns-history__result-item");

        li.onclick = this.getHistoryInfo.bind(this);
        ul.appendChild(li);
        li.innerHTML = ttn;
      });
      ttnHistoryContainer.innerHTML = "";
      ttnHistoryContainer.appendChild(ul);

      const btnClear = document.createElement("button");
      btnClear.innerHTML = this.dictionary.t("Clear history");
      btnClear.classList.add("form-btn");
      btnClear.onclick = this.deleteHistory.bind(this);

      ttnHistoryContainer.appendChild(btnClear);
    } else {
      ttnHistoryContainer.innerHTML = this.dictionary.t("The history is empty");
    }
  }
  deleteHistory() {
    localStorage.removeItem("historyTtns");
    this.render();
  }
}
export default TTNHistory;
