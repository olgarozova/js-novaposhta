class City {
  constructor(data, parentUl) {
    this.data = data;
    this.CityElement = document.createElement("li");
    this.AutocompliteElement = document.querySelector("#cityName");
    this.parentUl = parentUl;
  }
  render() {
    const { Present, Ref } = this.data;

    this.CityElement.innerHTML = `${Present}`;
    this.CityElement.classList.add("cities-drop-down-ul__li");
    this.CityElement.dataset.cityRef = Ref;

    this.CityElement.onclick = () => {
      this.parentUl.classList.add("search-warehouses__list-hide");
      this.AutocompliteElement.value = Present;
      this.AutocompliteElement.dataset.cityRef = Ref;
    };
    return this.CityElement;
  }
}

export default City;
