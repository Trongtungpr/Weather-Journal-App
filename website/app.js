/* Global Variables */

// const { log } = require("console");

// Create a new date instance dynamically with JS

    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// API key và baseURL
const apiKey = "a2df864d6fbd47e06802cb4cf8fd6f17"; // Thay YOUR_API_KEY bằng API key của bạn từ OpenWeatherMap
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Biến toàn cục để lưu trữ dữ liệu
let weatherData = {};

// Lấy các phần tử DOM
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const generateButton = document.getElementById("generate");
const dateElement = document.getElementById("date");
const tempElement = document.getElementById("temp");
const contentElement = document.getElementById("content");

// Hàm để build URL API từ mã zip
function buildApiUrl(zipCode) {
  return `${baseURL}${zipCode},us&appid=${apiKey}&units=metric`;
}

// Hàm để gọi API OpenWeatherMap
async function getWeatherData(zipCode) {
  const url = buildApiUrl(zipCode);
  console.log(url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Lỗi khi fetch dữ liệu: ${response.status} ${response.statusText}`
    );
  }

  try {
    const data = await response.json();
    weatherData = data;
    return data;
  } catch (error) {
    console.error("Lỗi khi parse JSON:", error);
    throw error; // Ném lỗi lên để xử lý ở cấp cao hơn
  }
}


// Hàm để cập nhật UI với dữ liệu thời tiết và cảm xúc
function updateUI() {
  const date = new Date(weatherData.dt * 1000).toLocaleDateString();
  const temp = weatherData.main.temp;
  const feelings = feelingsInput.value;

  dateElement.textContent = `Ngày: ${newDate}`; // Sử dụng newDate
  tempElement.textContent = `Nhiệt độ: ${temp}°C`;
  contentElement.textContent = `Cảm xúc của bạn: ${feelings}`;
}

// Xử lý sự kiện khi click nút "Generate"
generateButton.addEventListener("click", async () => {
  const zipCode = zipInput.value;
  if (zipCode) {
    try {
      await getWeatherData(zipCode);
      updateUI();
    } catch (error) {
      alert(`Có lỗi xảy ra: ${error.message}`);
    }
  } else {
    alert("Vui lòng nhập mã zip.");
  }
});

