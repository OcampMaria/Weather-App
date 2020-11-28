$(document).ready(function (){
  $("#search").click(function(){
    
    var cityName = $(".inputCity").val();
    var WeatherAPI= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units" + "&appid=c600d0cc510e3815c07a6df7cf76f58e";
    
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
  "<h2 class= 'title'>" +  data.name + "</h2>" +
  "<h3><strong>Temperature</strong>: " + data.main.temp + "&deg;C</h3>" +
  "<h3><strong>Humidity</strong>: " + data.main.humidity + "</h3>" +
  "<h3><strong>Wind Speed</strong>: " + data.wind.speed + "</h3>" +
  "<h3><strong>UV index</strong>: " + "</h3>" +
  
  
  "</div>"

}

