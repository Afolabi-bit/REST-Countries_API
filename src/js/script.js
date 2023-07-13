const url1 = 'https://restcountries.com/v3.1/';
const path = '.././data.json';
const countriesWrapper = document.getElementById('countries');
const filterBtns = document.querySelectorAll('.options');
const form = document.getElementById('form');
const darkBtn = document.getElementById('dark-button');
const body = document.getElementById('body');
let key;

//Get countries onload
getCountry(`${url1}all`);


//APIcall
async function getCountry(url) {
    let res = await fetch(url);
    data = await res.json();

    showCountries(data);
}


//Allow more details onClick
function openCountry() {
    
}

//Filter by region
filterBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        key = btn.textContent;
        if (key == 'All')
            showCountries(data);
        else
            filterData(data);
    })
})

function filterData(data) {
    let region = data.filter((d) => d.region == key)
    showCountries(region);
}

//Render data to HTML
function showCountries(data) {
    if(data.length > 1) {
        countriesWrapper.innerHTML = '';
        data.forEach(country => {
            let {name, population,  flags, region, capital} = country;
        
            const div = document.createElement('div');
            div.className = 'country';
            div.innerHTML = 
            `
                <img src="${flags.png}"  alt="${flags.alt}">
                <div class="text">
                    <h2 class="name">${name.common}</h2>
                    <p><span>Population:</span>${population}</p>
                    <p><span>Region:</span>${region}</p>
                    <p><span>Capital:</span>${capital}</p>
                </div>
            `
            countriesWrapper.appendChild(div);
        })
    } else {
        countriesWrapper.innerHTML = '';

        let {name, population,  flags, region, capital} = data[0];
        
            const div = document.createElement('div');
            div.className = 'country';
            div.innerHTML = 
            `
                <img src="${flags.png}"  alt="${flags.alt}">
                <div class="text">
                    <h2 class="name">${name.common}</h2>
                    <p><span>Population:</span>${population}</p>
                    <p><span>Region:</span>${region}</p>
                    <p><span>Capital:</span>${capital}</p>
                </div>
            `
            countriesWrapper.appendChild(div);
    }
}

//Search feature
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let field = document.getElementById('search');
    let name =  field.value.trim();

    if(name && name != '') {
        searchCountry('https://restcountries.com/v3.1/name/' + name);
        field.value = '';
    }
    else
        window.location.reload()
})

async function searchCountry(url) {
    let res = await fetch(url);
    data = await res.json();
    showCountries(data);
}


/** Dark Mode Functionality */
darkBtn.addEventListener('click', ()=>{
    body.classList.toggle("dark");
})