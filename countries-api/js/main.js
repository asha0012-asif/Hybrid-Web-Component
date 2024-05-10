const APP = {
    init: () => {
        APP.fetchCountries();
    },

    fetchCountries: async () => {
        try {
            const response = await fetch("https://countriesnow.space/api/v0.1/countries");
            console.log(response);
            
            if(!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            console.log(data);

            APP.displayCountries(data.data);
        } catch (error) {
            console.log(error);
        }
    }, 

    displayCountries: (countriesData) => {
        const df = new DocumentFragment();
        
        countriesData.forEach(countryData => {
            const li = document.createElement("li");
            li.innerText = countryData.country;
            li.setAttribute("data-cities", JSON.stringify(countryData.cities));
            
            df.append(li);
        });

        const countriesList = document.getElementById("countries-list");
        countriesList.append(df);
        
        countriesList.addEventListener("click", APP.displayCities);
    },

    displayCities: (ev) => {
        const citiesListTitle = document.getElementById("cities-list__title");
        citiesListTitle.innerText = `Cities in ${ev.target.innerText}`;
        
        const cities = JSON.parse(ev.target.getAttribute("data-cities"));
        console.log(cities);

        const df = new DocumentFragment();

        cities.forEach(city => {
            const li = document.createElement("li");
            li.innerHTML = city;
            df.append(li);
        });

        const citiesList = document.getElementById("cities-list");
        citiesList.innerHTML = "";
        citiesList.append(df);
    }
}

window.addEventListener("DOMContentLoaded", APP.init);

