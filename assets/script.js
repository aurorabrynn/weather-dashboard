var searchForm = document.querySelector("#search-form");
var cityName = document.querySelector("#city-name");
var currentDiv = document.querySelector("#current");
var futureDiv = document.querySelector("#future");
var ulEl = document.querySelector(".list-group");
var storage = document.querySelector("#storage")
var storageEl = document.querySelector("#search-box");
var i = 0;

//when submit is clicked
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityNameInput = cityName.value;
    var urlToFetchCurrent = `http://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&units=imperial&appid=745149043888fbd1a0283fd8a132ecf0`
    var urlToFetchFuture = `http://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput}&units=imperial&appid=745149043888fbd1a0283fd8a132ecf0`
    localStorage.setItem('cityNameInput', cityNameInput);

    //find api for current
    fetch(urlToFetchCurrent).then(function (response) {
        return response.json()
    }).then(function (data) {
        currentDiv.innerHTML = "";
        futureDiv.innerHTML = "";
        //console.log(data);
        var resultBlock = document.createElement("div");
        resultBlock.setAttribute("class", "result-block");

        //console.log(data.name);
        var titleH2 = document.createElement("h2");
        titleH2.textContent = data.name + " (" + moment().format("M/D/YYYY") + ")";
        resultBlock.append(titleH2);

        /*var icon = document.createElement("img");
        icon.textContent = data.weather[0].icon;
        resultBlock.append(icon);*/

        //console.log(data.main.temp);
        var tempP = document.createElement("p");
        tempP.textContent = "Temperature: " + data.main.temp + " °F";
        resultBlock.append(tempP);

        //console.log(data.main.humidity);
        var humP = document.createElement("p");
        humP.textContent = "Humidity: " + data.main.humidity + "%";
        resultBlock.append(humP);

        //console.log(data.wind.speed);
        var windP = document.createElement("p");
        windP.textContent = "Wind Speed: " + data.wind.speed + " MPH";
        resultBlock.append(windP);

        currentDiv.append(resultBlock);

        var liEl = document.createElement("li");
        liEl.setAttribute("class", "list-group-item btn btn-light");
        liEl.innerHTML = localStorage.getItem('cityNameInput');
        ulEl.append(liEl);

        /*liEl.addEventListener("click", function (event) {
            return
        })*/

    })
    //find api for forecast
    fetch(urlToFetchFuture).then(function (response) {
        return response.json()
    }).then(function (data) {
        //console.log(data)
        var futureTitle = document.createElement("h3")
        futureTitle.innerHTML = "5 Day Forecast:"
        futureDiv.append(futureTitle);
        for (let i = 0; i < data.list.length; i = i + 8) {
            var column = document.createElement("div");
            var card = document.createElement("div");
            var cardBody = document.createElement("div");
            column.setAttribute("class", "col-lg-2");
            card.setAttribute("class", "card");
            cardBody.setAttribute("class", "card-body");

            //console.log(data.list[i].dt_txt);
            //console.log(moment(data.list[i].dt_txt).format("M/D/YYYY"));
            var dateH3 = document.createElement("h3");
            dateH3.textContent = moment(data.list[i].dt_txt).format("M/D/YYYY");
            dateH3.setAttribute = ("class", "card-title")
            cardBody.append(dateH3);

            //console.log(data.list[i].main.temp);
            var tempP = document.createElement("p");
            tempP.textContent = "Temp: " + data.list[i].main.temp + " °F";
            tempP.setAttribute = ("class", "card-text")
            cardBody.append(tempP);

            //console.log(data.list[i].main.humidity);
            var humP = document.createElement("p");
            humP.textContent = "Humidity: " + data.list[i].main.humidity + "%";
            humP.setAttribute = ("class", "card-text")
            cardBody.append(humP);

            card.append(cardBody);
            column.append(card);
            futureDiv.append(column);
        }
    })
})

/*liEl.addEventListener("click", function (event) {
    event.preventDefault();
    var urlToFetchCurrent = `http://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&units=imperial&appid=745149043888fbd1a0283fd8a132ecf0`
    var urlToFetchFuture = `http://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput}&units=imperial&appid=745149043888fbd1a0283fd8a132ecf0`
    localStorage.setItem('cityNameInput', cityNameInput);

    //find api for current
    fetch(urlToFetchCurrent).then(function (response) {
        return response.json()
    }).then(function (data) {
        currentDiv.innerHTML = "";
        futureDiv.innerHTML = "";
        //console.log(data);
        var resultBlock = document.createElement("div");
        resultBlock.setAttribute("class", "result-block");

        //console.log(data.name);
        var titleH2 = document.createElement("h2");
        titleH2.textContent = data.name + " (" + moment().format("M/D/YYYY") + ")";
        resultBlock.append(titleH2);

        /*var icon = document.createElement("img");
        icon.textContent = data.weather[0].icon;
        resultBlock.append(icon);*/

        //console.log(data.main.temp);
/*var tempP = document.createElement("p");
tempP.textContent = "Temperature: " + data.main.temp + " °F";
resultBlock.append(tempP);

//console.log(data.main.humidity);
var humP = document.createElement("p");
humP.textContent = "Humidity: " + data.main.humidity + "%";
resultBlock.append(humP);

//console.log(data.wind.speed);
var windP = document.createElement("p");
windP.textContent = "Wind Speed: " + data.wind.speed + " MPH";
resultBlock.append(windP);

currentDiv.append(resultBlock);

var liEl = document.createElement("li");
liEl.setAttribute("class", "list-group-item btn btn-light");
liEl.innerHTML = localStorage.getItem('cityNameInput');
ulEl.append(liEl);

})
//find api for forecast
fetch(urlToFetchFuture).then(function (response) {
return response.json()
}).then(function (data) {
//console.log(data)
var futureTitle = document.createElement("h3")
futureTitle.innerHTML = "5 Day Forecast:"
futureDiv.append(futureTitle);
for (let i = 0; i < data.list.length; i = i + 8) {
    var column = document.createElement("div");
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    column.setAttribute("class", "col-lg-2");
    card.setAttribute("class", "card");
    cardBody.setAttribute("class", "card-body");

    //console.log(data.list[i].dt_txt);
    //console.log(moment(data.list[i].dt_txt).format("M/D/YYYY"));
    var dateH3 = document.createElement("h3");
    dateH3.textContent = moment(data.list[i].dt_txt).format("M/D/YYYY");
    dateH3.setAttribute = ("class", "card-title")
    cardBody.append(dateH3);

    //console.log(data.list[i].main.temp);
    var tempP = document.createElement("p");
    tempP.textContent = "Temp: " + data.list[i].main.temp + " °F";
    tempP.setAttribute = ("class", "card-text")
    cardBody.append(tempP);

    //console.log(data.list[i].main.humidity);
    var humP = document.createElement("p");
    humP.textContent = "Humidity: " + data.list[i].main.humidity + "%";
    humP.setAttribute = ("class", "card-text")
    cardBody.append(humP);

    card.append(cardBody);
    column.append(card);
    futureDiv.append(column);
}
})
})*/