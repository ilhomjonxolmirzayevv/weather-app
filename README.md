---

# 🌦 Weather App

Bu loyiha oddiy va amaliy **Weather App** bo‘lib, foydalanuvchi shahar nomini kiritishi yoki joylashuviga asoslangan ob-havo ma'lumotlarini ko‘rishi mumkin. Loyihaning asosiy funksionalligi va tuzilishi haqida batafsil:

---

## 📋 Asosiy funksiyalar

1. **Shahar bo‘yicha ob-havo ma'lumotlarini qidirish**  
   - Foydalanuvchi shahar nomini qidiruv maydoniga kiritadi va 🔍 **Qidiruv tugmasi** orqali ob-havo ma'lumotlarini oladi.
   - Agar shahar nomi kiritilmasa, foydalanuvchiga xato xabari ko‘rsatiladi.

2. **GPS orqali foydalanuvchi joylashuviga asoslangan ob-havo**  
   - 🗺️ Maxsus **joylashuv ikonkasini** bosish orqali foydalanuvchi GPS orqali o‘z joylashuvini aniqlab, ob-havo ma'lumotlarini oladi.
   - Agar foydalanuvchi brauzer orqali joylashuvga ruxsat bermasa, xato xabari chiqadi.

3. **Toza va sodda dizayn**  
   - Ob-havo piktogrammalari (ikonka) va asosiy ko‘rsatkichlar: harorat, namlik, shamol tezligi kabi ma'lumotlar ko‘rsatiladi.

---

## 🛠 Texnik xususiyatlar

1. **React**  
   Loyihaning asosiy frontend freymvorki.
   
2. **OpenWeather API**  
   Ob-havo ma'lumotlarini olish uchun ishlatiladi.

3. **React Hot Toast**  
   Foydalanuvchiga xabarlar va xatolarni ko‘rsatish uchun ishlatilgan.

4. **MUI Skeleton**  
   Yuklanish holatini ko‘rsatish uchun ishlatiladi.

5. **CSS**  
   Dizaynni tartibga solish va komponentlarni chiroyli ko‘rsatish uchun.

---

## 📂 Loyihaning tarkibi

- **Komponentlar**:  
  `Weather.js` - asosiy komponent bo‘lib, qidiruv, GPS joylashuv va ob-havo ma'lumotlarini ko‘rsatadi.
  
- **Resurslar**:  
  `assets/` papkasida qidiruv, joylashuv va ob-havo ikonkalari joylashgan.

---

## 📄 Kodimizdagi asosiy qismlar va ularning vazifalari

### 🔍 Qidiruv funksiyasi

```javascript
const search = async (city) => {
    if (city === "") {
        toast.error("Enter City Name");
        return;
    }
    fetchWeatherByCity(city);
};
```

- Foydalanuvchi shahar nomini qidiradi.  
- Bo‘sh qoldirilsa, xato xabari chiqariladi.  
- Ma’lumot OpenWeather API orqali olinadi.  

---

### 🗺️ Joylashuvni aniqlash

```javascript
const getUserLocation = () => {
    if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
            toast.error("Unable to retrieve your location.");
            console.error(error);
        }
    );
};
```

- Foydalanuvchi GPS orqali o‘z joylashuvini aniqlaydi.  
- Joylashuvga ruxsat berilmasa, foydalanuvchiga xato xabari chiqariladi.  

---

### 🌦 Ob-havo ma'lumotlarini olish

```javascript
const fetchWeatherByCity = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

    const response = await fetch(url);
    const data = await response.json();
    ...
};
```

- Shahar nomiga asoslangan holda OpenWeather API orqali ma'lumot olinadi.  

```javascript
const fetchWeatherByLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

    const response = await fetch(url);
    const data = await response.json();
    ...
};
```

- Latitude va Longitude orqali API orqali ob-havo olinadi.  

---

### 📊 Ob-havo ko‘rsatkichlari

```javascript
{weatherData && (
    <>
        <img src={weatherData.icon} alt="weather_icon" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="humidity_icon" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="wind_icon" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </>
)}
```

- Harorat, joylashuv, namlik va shamol tezligi ma'lumotlari chiroyli ko‘rinishda chiqariladi.

---

## 🎯 Loyihani ishga tushirish

1. **Kodni yuklab oling** yoki klon qiling.  
2. OpenWeather API uchun API kalitini oling va `.env` fayliga qo‘shing:  
   ```env
   VITE_APP_ID=your_api_key
   ```
3. Loyihani ishga tushirish:  
   ```bash
   npm install
   npm run dev
   ```

Endi sizning Weather App ishlashga tayyor! 🚀

--- 