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
  // var fiveDayAPI= `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
  
  // var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=c6fd3ae4f6763936ec10d5be134b091f`;
  
  if (cityName != ""){
    // current weather API ajax call
    $.ajax({
      url: WeatherAPI,
      method: "GET",
     
      


    }).then(function(data){     
      var lat= data.coord.lat;
      var lon= data.coord.lon;

      var current = show(data)
      $(".cityName").html(current);
     
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=c6fd3ae4f6763936ec10d5be134b091f`,
        method: "GET",
      }).then(function(data){
        var forecast = display(data) 
        var fiveDayTitle = document.getElementById("forecast");
        fiveDayTitle.classList.remove("hide")
        $(".wf").html(forecast);
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



function show (data) {
  console.log(data);
  return "<div class='cityInfo sections' id='outputWeather'" +
  "<h1 style='font-weight:bold; font-size:25px'>"+ "<div class= 'cityweather'>" + data.name + "<img class='image' src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>" + "</div>" + "</h1>" +

  "<h3> Temperature: " + data.main.temp + " &deg;F</h3>" +
  "<h3> Humidity: " + data.main.humidity + "%</h3>" +
  "<h3> Wind Speed: " + data.wind.speed + " MPH </h3>" +
  "<h3> UV index: " + data + "</h3>" +
  "</div>";  
}

function display(data) {
  console.log(data);
  return "<div>"+ 
  "<div class= 'card'" +
  "<h3> Temperature: " + data.daily[0].temp.day + " &deg;F</h3>" +
  "<h3> Humidity: " + data.daily[0].humidity + "%</h3>" + 
  "</div>" +
  "</div>"; 
}






