// Tạo một instance Date mới một cách linh động bằng JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear(); 

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
    throw error; 
  }
}

// Hàm để POST dữ liệu lên server
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.error('Lỗi khi POST dữ liệu:', error);
    throw error; 
  }
}

// Hàm để GET dữ liệu từ server
async function retrieveData() {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);
    return allData; 
  } catch (error) {
    console.log("Lỗi khi GET dữ liệu:", error);
    throw error; 
  }
}

// Hàm để cập nhật UI với dữ liệu thời tiết và cảm xúc
function updateUI(data) {
  dateElement.textContent = `Ngày: ${data.date}`; 
  tempElement.textContent = `Nhiệt độ: ${data.temp}°C`;
  contentElement.textContent = `Cảm xúc của bạn: ${data.feelings}`;
}

// Xử lý sự kiện khi click nút "Generate"
generateButton.addEventListener("click", async () => {
  const zipCode = zipInput.value;
  const feelings = feelingsInput.value;

  if (zipCode && feelings) {
    try {
      await getWeatherData(zipCode); 

      const dataToPost = {
        date: newDate,
        temp: weatherData.main.temp,
        feelings: feelings,
      };

      await postData('/addProjectData', dataToPost); 

      const projectData = await retrieveData();
      updateUI(projectData); 

    } catch (error) {
      alert(`Có lỗi xảy ra: ${error.message}`);
    }
  } else {
    alert("Vui lòng nhập mã zip và cảm xúc của bạn.");
  }
});