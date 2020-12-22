var apiKey = "c6fd3ae4f6763936ec10d5be134b091f"

$(document).ready(function (){
  $("#search").click(function(){
    
    var cityName = $(".inputCity").val();
    ajaxcall(cityName)

  });
});

// ajaxcall for both weather APIs requiring city name
function ajaxcall(cityName) {
  var WeatherAPI= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
  var fiveDayAPI= `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
  
  // var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=c6fd3ae4f6763936ec10d5be134b091f`;
  
  if (cityName != ""){
    // current weather API ajax call
    $.ajax({
      url: WeatherAPI,
      method: "GET",
      success: function (data) {
        console.log(data);  
        
        var lat= data.coord.lat;
        var lon= data.coord.lon;
        console.log(lat,lon);
        var current = show(data)
        
        $("#outputWeather").html(current);
        $("#inputCity").val("")
      }
    });
    // prepend buttons for searched cities
    var newbutton = $( ".prepend" ).prepend ("<div>" + "<li class='button is-fullwidth' >" + cityName + "</li>" + "</div>");


    // Five Day forecast API ajax call
    $.ajax({
      url: fiveDayAPI,
      method: "GET",
      success: function (data) {
        console.log(data);  
        var forecast = display(data) 
        $(".forecast").html(forecast);
        // $("#inputCity").val("")
      
      }
    });

  } else{
    $("#error").html("field cannot be empty")
  }
  
}

$(".prepend").on("click", "li", function(){
  console.log($(this).text ());
  ajaxcall($(this).text ())
});



function show (data) {
  return "<div class='cityInfo sections' id='outputWeather'" +
  "<h1 style='font-weight:bold; font-size:25px'>"+ "<div class= 'cityweather'>" + data.name + "<img class='image' src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>" + "</div>" + "</h1>" +

  "<h3 class='secondaryfont'>Temperature: " + data.main.temp + " &deg;F</h3>" +
  "<h3 class='secondaryfont'>Humidity: " + data.main.humidity + "%</h3>" +
  "<h3 class='secondaryfont'>Wind Speed: " + data.wind.speed + " MPH </h3>" +
  "<h3 class='secondaryfont'>UV index: " + "</h3>" +
  "</div>";  
}


function display(data) {
  console.log('forecast',data);
  return "<div class= 'message is-info'>" + 
  "<h3 class='secondaryfont'> Temperature: " + data.list[0].main.temp + " &deg;F</h3>" +
  "<h3 class='secondaryfont'> Humidity: " + data.list[0].main.humidity + "%</h3>" + 
  "</div>" +
  "</div>"; 
}





// I need to display every day of the week into the screen. 
// 


