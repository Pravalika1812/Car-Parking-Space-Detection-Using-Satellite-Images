# 🚗 Car Parking Space Detection Using Satellite Images  
Using YOLOv11 & YOLO-NAS for Smart Parking Slot Detection  
*University of Maryland, Baltimore County (UMBC)*

---

## 📌 Overview
Urban areas—including UMBC—face ongoing challenges with limited parking availability, causing delays, congestion, and unnecessary fuel consumption.  
This project provides an AI-powered **parking slot detection system** that analyzes **satellite images** to identify:

- 🚗 Occupied parking spaces  
- 🅿️ Empty parking spaces  

The solution combines **Google Earth Engine imagery**, **Roboflow annotations**, and **YOLO-based deep learning models**, wrapped in a modern **React + Flask** application for real-time detection.

---

## 🎯 Key Features
- 🛰️ Detection using high-resolution satellite imagery  
- 🤖 YOLOv11 + YOLO-NAS object detection models  
- 🧩 901-image annotated and augmented dataset  
- 📊 Evaluation using Precision, Recall, and mAP  
- 🌐 Real-time UI built with React.js  
- ⚡ Flask API backend for deep learning inference  
- 📱 Responsive and easy-to-use web interface  

---

## 🏗️ System Architecture
End-to-end pipeline includes:

1. **Data Collection** – Satellite images of UMBC parking lots  
2. **Preprocessing** – Resizing, tiling, filtering, augmentation  
3. **Model Training** – YOLOv11 (accuracy) & YOLO-NAS (speed)  
4. **Backend** – Flask API processing image uploads  
5. **Frontend** – React.js displaying detection results  
6. **Visualization** – Bounding boxes + available slot count  

---

## 📚 Dataset

- **Source:** Google Earth Engine & LCMS  
- **Original images:** 150  
- **Final dataset:** 901 images  
- **Labels:** `Car`, `Empty`  
- **Annotated using:** Roboflow  

### **Data Augmentation Applied**
- Horizontal & vertical flips  
- Rotation (±15°, 90°)  
- Brightness and exposure shifts  
- Gaussian blur  
- Small random noise  

---

## 🧠 Models Used

### **1️⃣ YOLOv11**
- High accuracy for small-object detection  
- Attention-enhanced architecture  
- Best overall performer  

### **2️⃣ YOLO-NAS**
- Lightweight model optimized via NAS  
- Great for real-time inference on limited hardware  

---

## 📈 Model Performance

| Model     | mAP (%) | Precision (%) | Recall (%) |
|-----------|---------|----------------|-------------|
| YOLOv11   | **83.6** | **82.5**        | **78.2**     |
| YOLO-NAS  | 76.2    | 81.4           | 72.9        |

➡️ **YOLOv11 achieved the best accuracy**, making it suitable for deployment.

---

## 🖥️ User Interface (React + Flask)
The UI supports:

- Drag-and-drop or file-upload  
- “Detect Parking Spaces” button  
- Bounding box overlays (Car / Empty)  
- Counts for total and available spaces  
- Error handling + loading indicators  
- Responsive design for mobile & desktop  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- HTML5 / CSS3  
- JavaScript  

### **Backend**
- Flask (Python)  
- REST API endpoints  

### **Other Tools**
- Roboflow  
- Google Earth Engine  
- LCMS  
- FileReader & FormData APIs  

---
## 🚀 How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
npm start
```

## 🅿️ Detect Parking Spaces
Open the UI in your browser, upload a satellite parking image, and view the real-time parking slot detection.

## 📌 Future Enhancements
- Real-time video stream detection
- Mobile app integration
- Edge deployment for faster inference
- GPS routing to nearest empty parking spot
- Larger multi-campus dataset

## 📝 Credits
**Developed by:**
- Maitri Mistry
- Manogna Lakkadasu
- Pravalika Papasani

Department of CSEE, UMBC.

## 📄 Full Report
The complete project report is included in this repository:  
`Car_Parking_Spaces_Detection_Using_Satellite_Images.pdf`
