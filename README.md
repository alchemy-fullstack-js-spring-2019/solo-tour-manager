For Weather, use the following endpoint should be used with query lat/lon in dec.
This will return current weather. 

api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial

need to declare units of measure for temperature in query. we need imperial.

use weather[0].description for forecast description.
use main.temp_max.



