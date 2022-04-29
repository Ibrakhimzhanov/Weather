const url =
    "http://api.weatherstack.com/current?access_key=3d31f7d02a8a028e2e3dc073e005e9ad"

const root = document.getElementById('root');

let store = {
    city: "Minsk",
    temperature: 0,
    observationTime: "00:00 AM",
    isDay: "yes",
    description: "",
    properties: {
        cloudcover: {},
        humidity: {},
        windSpeed: {},
        pressure: {},
        uvIndex: {},
        visibility: {},
    },
};


const fetchData = async() => {
    const result = await fetch(`${url}&query=${store.city}`);
    const data = await result.json();

    const {
        current: {
            cloudcover,
            temperature,
            humidity,
            observation_time: observationTime,
            pressure,
            uv_index: uvIndex,
            visibility,
            is_day: isDay,
            weather_descriptions: description,
            wind_speed: windSpeed,
        },
        location: { name },
    } = data;


    store = {
        ...store,
        isDay,
        city: name,
        temperature,
        observationTime,
        description: description[0],
        properties: {
            cloudcover: {
                title: "cloudcover",
                value: `${cloudcover}%`,
                icon: "cloud.png",
            },
            humidity: {
                title: "humidity",
                value: `${humidity}%`,
                icon: "humidity.png",
            },
            windSpeed: {
                title: "wind speed",
                value: `${windSpeed} km/h`,
                icon: "wind.png",
            },
            pressure: {
                title: "pressure",
                value: `${pressure} %`,
                icon: "gauge.png",
            },
            uvIndex: {
                title: "uv Index",
                value: `${uvIndex} / 100`,
                icon: "uv-index.png",
            },
            visibility: {
                title: "visibility",
                value: `${visibility}%`,
                icon: "visibility.png",
            },
        },
    };
    renderComponent();
};

const markup = () => {
    const { city, description, observationTime, temperature, isDay, properties } =
    store;
    const containerClass = isDay === "yes" ? "is-day" : "";

    return `<div class="container ${containerClass}">
              <div class="top">
                <div class="city">
                  <div class="city-subtitle">Weather Today in</div>
                    <div class="city-title" id="city">
                    <span>${city}</span>
                  </div>
                </div>
                <div class="city-info">
                  <div class="top-left">
                  <img class="icon" src="./img/" alt="" />
                  <div class="description">${description}</div>
                </div>
              
                <div class="top-right">
                  <div class="city-info__subtitle">as of ${observationTime}</div>
                  <div class="city-info__title">${temperature}°</div>
                </div>
              </div>
            </div>
          <div id="properties"></div>
        </div>`;
};
const renderComponent = () => {
    root.innerHTML = markup();
}




fetchData();