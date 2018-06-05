document.addEventListener("DOMContentLoaded", (e) =>{

   const mainContent = document.getElementById("content")
   const submitButton = document.getElementById("zip-submit")
   const preLoaderMain = document.createElement("div")
   const preLoaderIndeterminate = document.createElement("div")
   let city
   let temperatureUnits = "\xB0F"

   preLoaderMain.setAttribute("class", "progress")
   preLoaderIndeterminate.setAttribute("class", "indeterminate")

   // Weather Card
   const weatherSection = document.getElementById("weatherSection")
   weatherSection.setAttribute("class", "section")
   const weatherSectionRow = document.getElementById("weatherSectionRow")
   weatherSectionRow.setAttribute("class", "row")
   const weatherSectionCol = document.getElementById("weatherSectionCol")
   weatherSectionCol.setAttribute("class", "col s12 m6 center-align")
   const weatherCard = document.createElement("div")
   weatherCard.setAttribute("class", "card")
   const cardContent = document.createElement("div")
   cardContent.setAttribute("class", "card-content")
   const cardTitle = document.createElement("span")
   cardTitle.setAttribute("class", "card-title")
   const currentForecast = document.createElement("p")
   const currentTemperatureFarenheit = document.createElement("p")
   const currentTemperatureCelcius = document.createElement("p")
   const cardAction = document.createElement("div")
   cardAction.setAttribute("class", "card-action")
   const toggleUnitsButton = document.createElement("button")
   toggleUnitsButton.setAttribute("class", "waves-effect waves-light btn")
   toggleUnitsButton.textContent = "Convert Temperature"


   document.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault()
      city = document.querySelector("input").value
      loader()
   })

   function loader() {
      // weatherSectionCol.removeChild(weatherCard) if weatherSectionCol.hasChild() === true
      mainContent.appendChild(preLoaderMain)
      preLoaderMain.appendChild(preLoaderIndeterminate)
      getWeather()
   }

   function getWeather() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${city},us&units=imperial&APPID=b86a0b5ba99016554b748c7fbf040e36`, { mode: "cors" })
         .then(function(response) {
            mainContent.removeChild(preLoaderMain)
            return response.json()
         })
         .then(function(response) {
            console.log(response)

            let fullTemperature = response.main.temp
            let roundedTemperatureFarenheit = Math.round(fullTemperature)
            let roundedTemperatureCelcius = Math.round((fullTemperature - 32) * (5/9))
            console.log(fullTemperature)
            console.log(roundedTemperatureFarenheit)
            console.log(roundedTemperatureCelcius)
            cardTitle.textContent = `${response.name}`
            currentForecast.textContent = `Current weather: ${response.weather[0].main}`
            currentTemperatureFarenheit.textContent = `Current temperature: ${roundedTemperatureFarenheit}\xB0F`
            currentTemperatureCelcius.textContent = `Current temperature: ${roundedTemperatureCelcius}\xB0C`
            weatherSectionCol.appendChild(weatherCard)
            weatherCard.appendChild(cardContent)
            weatherCard.appendChild(cardAction)
            cardContent.appendChild(cardTitle)
            cardContent.appendChild(currentForecast)
            cardContent.appendChild(currentTemperatureFarenheit)
            cardAction.appendChild(toggleUnitsButton)
            // convert units
            toggleUnitsButton.addEventListener("click", (e) => {
               if (temperatureUnits === "\xB0F") {
                  temperatureUnits = "\xB0C"
                  cardContent.removeChild(currentTemperatureFarenheit)
                  cardContent.appendChild(currentTemperatureCelcius)
               }
               else if (temperatureUnits === "\xB0C") {
                  temperatureUnits = "\xB0F"
                  cardContent.removeChild(currentTemperatureCelcius)
                  cardContent.appendChild(currentTemperatureFarenheit)
               }
            })
         })
         .catch(function(err) {
            alert("ZIP Code not found. Enter a valid 5 digit ZIP Code.")
            console.log(err)
         })
   }


})
