$(document).ready(function (){
  $("#search").click(function(){
    
    var cityName = $(".inputCity").val();
    var WeatherAPI= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units" + "&appid=c6fd3ae4f6763936ec10d5be134b091f";
  
    
    
    if (cityName != ""){
      $.ajax({
        url: WeatherAPI,
        method: "GET",
        success: function (data) {
          console.log(data);  
          
          var widget = show(data)
          $("#outputWeather").html(widget);
          $("#inputCity").val("")
        }    
      });

      // prepend buttons for searched cities
      $( ".prepend" ).append ("<div>" + "<button class='button is-fullwidth' >" + cityName + "</button>" + "</div>");

    } else{
      $("#error").html("field cannot be empty")
    }
      











  });
});

function show (data) {
  return "<div class='cityInfo sections' id='outputWeather'" +
  "<h1 style='font-weight:bold;'> <img class='image is-48x48' src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>" + data.name + "</h1>" +

    "<h3>Temperature: " + data.main.temp + "&deg;C</h3>" +
    "<h3>Humidity: " + data.main.humidity + "%</h3>" +
    "<h3>Wind Speed: " + data.wind.speed + "m/s</h3>" +
    "<h3>UV index: " + "</h3>" +
    "</div>" 
}

// "<div class='fiveDay'>" + 
//     "<p><strong>5-Day Forecast</strong> </p>" +
//     "<div class='day day-one is-pulled-left'>uno</div>" +
//     "<div class='day day-two is-pulled-left'>dos</div> " +
//     "<div class='day day-two is-pulled-left'>tres</div> " +
//     "<div class='day day-two is-pulled-left'>cuatro</div> " +
//     "<div class='day day-two is-pulled-left'>cinco</div> " +
//     "</div>"