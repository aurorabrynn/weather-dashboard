var searchForm = document.querySelector("#search-form");
var cityName = document.querySelector("#city-name");
var currentDiv = document.querySelector("#current");
var futureDiv = document.querySelector("#future");
var queryArr = location.search.split("&");
var searchTerm = queryArr[0].split("=")[1];
var i = 0;

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityNameInput = cityName.value;
    var urlToFetchCurrent = `http://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&units=imperial&appid=745149043888fbd1a0283fd8a132ecf0`
    var urlToFetchFuture = `http://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput}&units=imperial&appid=745149043888fbd1a0283fd8a132ecf0`
    fetch(urlToFetchCurrent).then(function (response) {
        return response.json()
    }).then(function (data) {
        currentDiv.innerHTML = "";
        futureDiv.innerHTML = "";
        console.log(data);
        var resultBlock = document.createElement("div");
        resultBlock.setAttribute("class", "result-block");

        console.log(data.name);
        var titleH2 = document.createElement("h2");
        titleH2.textContent = data.name;
        resultBlock.append(titleH2);

        console.log(data.main.temp);
        var tempP = document.createElement("p");
        tempP.textContent = data.main.temp;
        resultBlock.append(tempP);

        console.log(data.main.humidity);
        var humP = document.createElement("p");
        humP.textContent = data.main.humidity;
        resultBlock.append(humP);

        console.log(data.wind.speed);
        var windP = document.createElement("p");
        windP.textContent = data.wind.speed;
        resultBlock.append(windP);

        /*var linkAnchor = document.createElement("a");
        var linkButton = document.createElement("button");
        linkButton.textContent = "Read More";
        linkAnchor.setAttribute("href", data.results[i].id);
        linkAnchor.setAttribute("target", "_blank");
        linkAnchor.append(linkButton);
        resultBlock.append(linkAnchor);*/

        currentDiv.append(resultBlock);
    })
    fetch(urlToFetchFuture).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data)
        for (let i = 5; i < data.list.length; i = i + 8) {
            var resultBlock = document.createElement("div");
            resultBlock.setAttribute("class", "result-block");

            console.log(data.list[i].dt_txt);
            var dateH3 = document.createElement("h3");
            dateH3.textContent = data.list[i].dt_txt;
            resultBlock.append(dateH3);

            console.log(data.list[i].main.temp);
            var tempP = document.createElement("p");
            tempP.textContent = data.list[i].main.temp;
            resultBlock.append(tempP);

            console.log(data.list[i].main.humidity);
            var humP = document.createElement("p");
            humP.textContent = data.list[i].main.humidity;
            resultBlock.append(humP);

            futureDiv.append(resultBlock);
        }
    })
})