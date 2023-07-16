const url1 = 'https://restcountries.com/v3.1/';
const path = '.././data.json';
const countriesWrapper = document.getElementById('countries');
const filterBtns = document.querySelectorAll('.options');
const form = document.getElementById('form');
const formWrapper = document.getElementById('forms');
const darkBtn = document.getElementById('dark-button');
const body = document.getElementById('body');
let backBtn;
let countries;
let key;
let allCountries;

//Get countries onload
getCountry(`${url1}all`);


//APIcall
async function getCountry(url) {
    let res = await fetch(url);
    countries = await res.json();

    showCountries(countries);
    allCountries = document.querySelectorAll('.country');
    countryNodelist(allCountries);
}

//Filter by region
filterBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        key = btn.textContent;
        if (key == 'All')
            showCountries(countries);
        else
            filterData(countries);
    })
})

function filterData(dataArr) {
    let region = dataArr.filter((data) => data.region == key)
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
                    <p><span>Capital:</span>${capital ? capital : ""}</p>
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
                    <p><span>Capital:</span>${capital ? capital : ""}</p>
                </div>
            `
            countriesWrapper.appendChild(div);
    }

    allCountries = document.querySelectorAll('.country');
    countryNodelist(allCountries);
}

//Search feature
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let field = document.getElementById('search');
    let name =  field.value.trim();

    if(name && name != '') {
        searchCountry('https://restcountries.com/v3.1/name/' + name, 'search');
    }
    else
        window.location.reload()
})

async function searchCountry(url, id) {
    let res = await fetch(url);
    countries = await res.json();

    if (id == 'search'){
        showCountries(countries);
    }
    else
        openCountry(countries);
}


/** Dark Mode Functionality */
darkBtn.addEventListener('click', ()=>{
    body.classList.toggle("dark");
})

/** Expand a country */
function countryNodelist(list){
    list.forEach(item =>{
        item.addEventListener('click', ()=>{
            const countryName = item.children[1].children[0].textContent;
            searchCountry('https://restcountries.com/v3.1/name/' + countryName, 'expand');
        })
    })
}

function openCountry(c){
    let {name, population, flags, region, subregion, capital, currencies, tld, languages, borders} = c[0];
    
    let n, curr, lang, nativeName;
    if (name.nativeName && currencies && languages){
        n = Object.keys(name.nativeName);
        nativeName = name.nativeName[n[0]].common;
        curr = Object.keys(currencies);
        currencies = currencies[curr[0]].name;
        lang = Object.keys(languages).toString();
    }

    name = name.common

    countriesWrapper.innerHTML = '';
    countriesWrapper.classList.add('expanded');
    formWrapper.innerHTML = '';

    const div = document.createElement('div');

    div.className = 'expanded-country';
    div.innerHTML = `
        <button id="back">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back</span>
        </button> 
        <div class="flex">
            <img src="${flags.png}" alt="${name.common}" />
            <div class="text">
                <h2>${name}</h2>
                <div class="flex">
                    <div class="left">
                        <p>
                            <span>Native Name:</span>
                            ${nativeName ? nativeName : ''}
                        </p>
                        <p>
                            <span>Population:</span>
                            ${population}
                        </p>
                        <p>
                            <span>Region:</span>
                            ${region}
                        </p>
                        <p>
                            <span>Sub Region:</span>
                            ${subregion ? subregion : ''}
                        </p>
                        <p>
                            <span>Capital:</span>
                            ${capital ? capital : ''}
                        </p>
                    </div>
                    <div class="right">
                        <p>
                            <span>Top Level Domain:</span>
                            ${tld}
                        </p>
                        <p>
                            <span>Currencies:</span>
                            ${currencies ? currencies : ''}
                        </p>
                        <p>
                            <span>Languages:</span>
                            ${lang ? lang : ''}
                        </p>
                    </div>
                </div>
                <div class="borders">
                    <h3>Border Countries:</h3>
                    <div class="buttons" id="buttons"></div>
                </div>
            </div>
        </div>
    `
    countriesWrapper.appendChild(div);
    loop(borders);
    back();
    openBorder();
}

function loop(arr){
    if(arr){
        const parent = document.getElementById('buttons');
        for (let i = 0; i < arr.length; i++){
            let b = document.createElement('button');b
            b.className = 'border-btn'
            b.innerHTML = `${arr[i]}`;
            button = b;
            parent.appendChild(b)
        }
    }
}

function back(){
    backBtn = document.getElementById('back');
    
    backBtn.addEventListener('click', ()=>{
        window.location.reload();
    })
}

function openBorder(){
    let borderBtns = document.querySelectorAll('.border-btn')
    borderBtns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            let name = btn.innerHTML;
            searchCountry('https://restcountries.com/v3.1/name/' + name, 'expand');
        })
    })
}