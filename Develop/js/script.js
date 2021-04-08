var apiKey = "c6fd3ae4f6763936ec10d5be134b091f";


$(document).ready(function (){
  // click function
  $("#search").click(function(){
    // I am placing cityName value inside the ajaxcall function. 
    var cityName = $(".inputCity").val();
    ajaxcall(cityName);
    
    // I am using JSON.parse to remove strings of array inside storage.
    storage= JSON.parse(localStorage.getItem("item"))||[];

    // pushes cityName into storage array. 
    storage.push(cityName)

    // sets items and adds strings to them inside the array storage. 
    localStorage.setItem("item", JSON.stringify(storage));
  });
  
  
  // Create variable storage outside the click event so I can access it outside and also inside the event. 
  var storage= JSON.parse(localStorage.getItem("item"))||[];
  // I use the forEach loop to loop through the storage array items and place those items as buttons which are prepended on the dashboard 
  storage.forEach(buttons=>{
    newbutton = $( ".prepend" ).prepend ("<div>" + "<li class='button is-fullwidth' >" + buttons + "</li>" + "</div>");

  })
  // call the ajax function and setting storage variable instead of city like in line 8. By adding this code here, displays the first item inside the storage array. ajaxcall is the API call.storage is the cityname array.0 is the first item in the array or the last searched item placed in the array. 
  ajaxcall(storage[0])

});


// ajaxcall for both weather APIs
function ajaxcall(cityName) {
  var WeatherAPI= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  
  if (cityName != ""){
    // current weather API ajax call
    $.ajax({
      url: WeatherAPI,
      method: "GET",
     
    }).then(function(dataCurrent){     
      var lat= dataCurrent.coord.lat;
      var lon= dataCurrent.coord.lon;
      var cityName = dataCurrent.name

      // One Call API ajax call
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=c6fd3ae4f6763936ec10d5be134b091f`,
        method: "GET",
      }).then(function(dataOneCall){
        console.log(dataOneCall);

        // current date using moment
        var mcurrentDate = moment.unix(dataOneCall.current.dt);
        var currentDate = mcurrentDate.format("MM/DD/YYYY");
        // removing the hide class to display the 5-Day title for the forecast section
        var fiveDayTitle = document.getElementById("forecast");
        fiveDayTitle.classList.remove("hide")
        // getting the current uv index from the onecall ajax data
        var currentUV= dataOneCall.current.uvi;

        // array containing the data for each day of the week 
        var array = dataOneCall.daily;

        //clearing the div everytime a new city data is requested. 
        document.querySelector(".columns").innerHTML = ""
        
        // appending the html template literate to the div cityName
        $(".cityName").html(
          "<div class='cityInfo sections' id='outputWeather'" +
          "<h1>"+ "<div class= 'cityweather'>" + cityName + currentDate + 
          "<img class='image' src= http://openweathermap.org/img/w/" + dataCurrent.weather[0].icon + ".png>" + "</div>" + "</h1>" +
  
          "<h3> Temperature: " + dataCurrent.main.temp + " &deg;F</h3>" +
          "<h3> Humidity: " + dataCurrent.main.humidity + "%</h3>" +
          "<h3> Wind Speed: " + dataCurrent.wind.speed + " MPH </h3>" +
          "<h3> UV index: " + currentUV + "</h3>" +
          "</div>"
        );
          // used for loop to go through the array gotten from the oneCall ajax call request. 
          for (var i=0; i<array.length; i++){
            // forecast dates using moment and the onecall api data
            var mForecastDate = moment.unix(dataOneCall.daily[i].dt);
            var forecastDate = mForecastDate.format("MM/DD/YYYY");
            // used the parent div to append other divs containing the forecast data. the for loop creates the divs for each day of the week. 
            $(".columns").append(
              "<div class= 'forecast'>"+ 
              "<div class= 'card'" +
              "<h2>" + forecastDate + "</h2>" + 
              "<img class='image' src= http://openweathermap.org/img/w/" + dataOneCall.daily[i].weather[0].icon + ".png>" +
              "<h3> Temperature: " + dataOneCall.daily[i].temp.day + " &deg;F</h3>" +
              "<h3> Humidity: " + dataOneCall.daily[i].humidity + "%</h3>" + 
              "</div>" +
              "</div>"
            );

          }
        
      })
    })
    
    // prepend buttons for searched cities and add them to the repend div. 
    newbutton = $( ".prepend" ).prepend ("<div>" + "<li class='button is-fullwidth' >" + cityName + "</li>" + "</div>");

  } else{
    $("#error").html("field cannot be empty")
  }

}

$(".prepend").on("click", "li", function(){
    ajaxcall($(this).text ());
  
  });

