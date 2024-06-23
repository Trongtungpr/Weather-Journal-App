Weather Journal App
This is a simple web application that allows users to record their feelings about the weather at a specific location. The app uses the OpenWeatherMap API to fetch weather data and stores user data on the server.
Features
Enter the zip code of a location.
Enter your feelings about the current weather.
Click the "Generate" button to:
Fetch weather data from the OpenWeatherMap API.
Store the weather data, date, and user's feelings on the server.
Display the stored data on the user interface.
Installation
Install Node.js and npm: Download and install Node.js from https://nodejs.org/. npm will be installed along with Node.js.
Clone this repository:
git clone https://github.com/Trongtungpr/Weather-Journal-App.git
Use code with caution.
Bash
(Replace your-username with your GitHub username.)
Navigate to the project directory:
cd weather-journal-app
Use code with caution.
Bash
Install the dependencies:
npm install
Use code with caution.
Bash
Get an API key from OpenWeatherMap:
Visit https://openweathermap.org/ and sign up for an account (if you don't have one).
Get your API key from your dashboard.
Replace the API key in server.js:
Open server.js in your editor.
Find the line const apiKey = "a2df864d6fbd47e06802cb4cf8fd6f17";.
Replace a2df864d6fbd47e06802cb4cf8fd6f17 with your actual API key.
Running the app
Start the server:
node server.js
Use code with caution.
Bash
Open the app in your browser:
Open your web browser and go to http://localhost:5000.
Using the app
Enter the zip code of the location for which you want to see the weather.
Enter your feelings about the weather in the text box.
Click the "Generate" button.
The weather data and your feelings will be displayed below.
Notes
Make sure that port 5000 is not blocked by any other application on your computer.
If you encounter CORS errors, adjust the corsOptions configuration in server.js to match the domain of your client.
Technologies used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
API: OpenWeatherMap API
Author
[Your Name]
