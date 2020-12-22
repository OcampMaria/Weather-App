var apiKey = "c6fd3ae4f6763936ec10d5be134b091f";


$(document).ready(function (){
  $("#search").click(function(){
    
    var cityName = $(".inputCity").val();
    ajaxcall(cityName)

  });
});

// ajaxcall for both weather APIs requiring city name
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
      console.log(cityName);
     
      // One Call API
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=c6fd3ae4f6763936ec10d5be134b091f`,
        method: "GET",
      }).then(function(dataOneCall){
        console.log(dataOneCall);

        // current date using moment
        var mcurrentDate = moment.unix(dataOneCall.current.dt);
        var currentDate = mcurrentDate.format("MM/DD/YYYY");
        

        var fiveDayTitle = document.getElementById("forecast");
        fiveDayTitle.classList.remove("hide")
        
        var currentUV= dataOneCall.current.uvi;
        var array = dataOneCall.daily;
        console.log(array);
        
        $(".cityName").html(
          "<div class='cityInfo sections' id='outputWeather'" +
          "<h1 style='font-weight:bold; font-size:25px'>"+ "<div class= 'cityweather'>" + cityName + currentDate + 
          "<img class='image' src= http://openweathermap.org/img/w/" + dataCurrent.weather[0].icon + ".png>" + "</div>" + "</h1>" +
  
          "<h3> Temperature: " + dataCurrent.main.temp + " &deg;F</h3>" +
          "<h3> Humidity: " + dataCurrent.main.humidity + "%</h3>" +
          "<h3> Wind Speed: " + dataCurrent.wind.speed + " MPH </h3>" +
          "<h3> UV index: " + currentUV + "</h3>" +
          "</div>"
        );

        // var tempForecast= 
        // var humidForecast= 
        // var imageForecast = 
        // var dateWeek= 
          for (var i=0; i<array.length; i++){
            // forecast dates using moment
            var mForecastDate = moment.unix(dataOneCall.daily[i].dt);
            var forecastDate = mForecastDate.format("MM/DD/YYYY");

            $(".wf").html(
              "<div>"+ 
              "<div class= 'card'" +
              "<h2>" +forecastDate + "</h2>" + 
              "<img class='image' src= http://openweathermap.org/img/w/" + dataOneCall.daily[i].weather[0].icon + ".png>" +
              "<h3> Temperature: " + dataOneCall.daily[i].temp.day + " &deg;F</h3>" +
              "<h3> Humidity: " + dataOneCall.daily[i].humidity + "%</h3>" + 
              "</div>" +
              "</div>"
            );

          }
        
      })
    })
    
    // prepend buttons for searched cities
    var newbutton = $( ".prepend" ).prepend ("<div>" + "<li class='button is-fullwidth' >" + cityName + "</li>" + "</div>");

  } else{
    $("#error").html("field cannot be empty")
  }
  
}

$(".prepend").on("click", "li", function(){
  ajaxcall($(this).text ())
});

