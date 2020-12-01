var apiKey = "c6fd3ae4f6763936ec10d5be134b091f"

$(document).ready(function (){
  $("#search").click(function(){
    
    var cityName = $(".inputCity").val();

    ajaxcall(cityName)

  });
});

function ajaxcall(cityName) {
  var WeatherAPI= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric" + "&appid=c6fd3ae4f6763936ec10d5be134b091f";
  var fiveDayAPI= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" +"&appid=c6fd3ae4f6763936ec10d5be134b091f";
  

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
    var newbutton = $( ".prepend" ).prepend ("<div>" + "<li class='button is-fullwidth' >" + cityName + "</li>" + "</div>");
    
    $.ajax({
      url: fiveDayAPI,
      method: "GET",
      success: function (data) {
        console.log(data);  
        var forecast = display(data) 
        $(".forecast").html(forecast);
        $("#inputCity").val("")
      
      }
    });

  } else{
    $("#error").html("field cannot be empty")
  }
  
}

$(".button").on("click", function(){
  console.log($(this).text ());
  ajaxcall($(this).text ())

 
});


function show (data) {
  return "<div class='cityInfo sections' id='outputWeather'" +
  "<h1 style='font-weight:bold; font-size:25px'>"+ "<div class= 'cityweather'>" + data.name + "<img class='image' src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>" + "</div>" + "</h1>" +

  "<h3 class='secondaryfont'>Temperature: " + data.main.temp + "&deg;C</h3>" +
  "<h3 class='secondaryfont'>Humidity: " + data.main.humidity + "%</h3>" +
  "<h3 class='secondaryfont'>Wind Speed: " + data.wind.speed + "m/s</h3>" +
  "<h3 class='secondaryfont'>UV index: " + "</h3>" +
  "</div>";  
}

function display(data) {
 console.log(data);
  return "<div class='fiveDay'>"  + 
  "<div class= 'message is-info'>" +
  "<h3 class='font'><strong>5-Day Forecast</strong> </h3>" +
  "<h3 class='secondaryfont'> Temperature: " + data.list[0].main.temp + "</h3>" +
  "<h3 class='secondaryfont'> Humidity: " + "</h3>" + 
  "</div>" +
  
  "</div>"
}


