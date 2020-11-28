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
        }



      })
    } else {
      $("#error").html("field cannot be empty")
    }
      
  });
});