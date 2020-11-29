var apiKey = "c6fd3ae4f6763936ec10d5be134b091f"

$(document).ready(function (){
  $("#search").click(function(){
    
    var cityName = $(".inputCity").val();
    var WeatherAPI= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric" + "&appid=c6fd3ae4f6763936ec10d5be134b091f";
    var fiveDayAPI= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=c6fd3ae4f6763936ec10d5be134b091f";
        
    if (cityName != ""){
      $.ajax({
        url: WeatherAPI,
        method: "GET",
        success: function (data) {
          console.log(data);  
          
          var current = show(data)
          $("#outputWeather").html(current);
          $("#inputCity").val("")
        }
      });
      // prepend buttons for searched cities
      $( ".prepend" ).append ("<div>" + "<button class='button is-fullwidth' >" + cityName + "</button>" + "</div>");

      
      $.ajax({
        url: fiveDayAPI,
        method: "GET",
        success: function (data) {
          console.log(data);  

          var forecast = display(data)
          $(".forecast").html(forecast);
          
        }
      });

     

    } else{
      $("#error").html("field cannot be empty")
    }

  });
});

function show (data) {
  return "<div class='cityInfo sections' id='outputWeather'" +
  "<h1 style='font-weight:bold; font-size:30px'>"+ "<div class= 'cityweather'>" + data.name + "<img class='image' src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>" + "</div>" + "</h1>" +

    "<h3 class='font'>Temperature: " + data.main.temp + "&deg;C</h3>" +
    "<h3 class='font'>Humidity: " + data.main.humidity + "%</h3>" +
    "<h3 class='font'>Wind Speed: " + data.wind.speed + "m/s</h3>" +
    "<h3 class='font'>UV index: " + "</h3>" +
    "</div>";  
    display(data)
}

function display(data) {

  return "<h3>Temperature: " + "</h3>" 
}


// return "<div class='fiveDay'>" + 
  // "<p><strong>5-Day Forecast</strong> </p>" +
  // "<div class='day day-one is-pulled-left'>uno</div>" +
  // "<div class='day day-two is-pulled-left'>dos</div> " +
  // "<div class='day day-two is-pulled-left'>tres</div> " +
  // "<div class='day day-two is-pulled-left'>cuatro</div> " +
  // "<div class='day day-two is-pulled-left'>cinco</div> " +
  // "</div>"
