const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Khởi tạo projectData với một mảng rỗng
let projectData = { data: [] };

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Cho phép yêu cầu từ mọi nguồn gốc

app.use(express.static('website')); 

// Routes
app.get('/all', (req, res) => {
  res.send(projectData);
  console.log("Gửi dữ liệu về client");
});

app.post('/addProjectData', (req, res) => {
  try {
    const newProjectData = {
      temperature: req.body.temperature,
      date: req.body.date,
      userResponse: req.body.userResponse,
    };
    projectData.data.push(newProjectData);
    console.log("Thêm dữ liệu vào projectData:");
    console.log(projectData);
    res.send(projectData); 
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu:', error);
    res.status(500).send({ error: error.message }); 
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng: ${port}`);
});