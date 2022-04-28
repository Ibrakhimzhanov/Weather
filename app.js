const url =
    "https://api.openweathermap.org/data/2.5/weather?&appid=47e9a6f0593acb1eb9453646a55a6d9b"

const root = document.getElementById('root');
const tempteratureUnit = '°';
const humidityUnit = '  %';
const pressureUnit = ' мм. рт. ст.';
const windUnit = `' м/с';`
let dataStore = {
    id: "1484846",
    city: "Andijan",
    feelslike: 0,
    clouds: 0,
    temp: 0,
    humidity: 0, // влажность
    pressure: 0, // давление
    visibility: 0,
    isDay: "yes",
    description: "",
    main: "",
    icon: "",
    wind: 0, // ветер

}

function isDay(data) {
    let sunrise = data.sys.sunrise * 1000;
    let sunset = data.sys.sunset * 1000;

    let now = Date.now();
    return (now > sunrise && now < sunset);
}

function renderDayOrNight(data) {
    let getIsDay = isDay(data) ? 'yes' : 'no';
    return getIsDay;
}

const fetchData = async() => {
    const result = await fetch(`${url}&q=${dataStore.city}`);
    const data = await result.json();

    const {
        main: { feels_like: feelslike, temp, pressure, humidity, },
        clouds,
        dt: isDay,
        visibility,
        weather: [...weather] = { main: wmain, description, icon },
        wind: { speed },
    } = data;


    store = {
        ...dataStore,
        feelslike,
        clouds,
        temp,
        humidity,
        pressure,
        visibility,
        isDay: renderDayOrNight(data),
        description: weather[0].description,
        main: weather[0].wmain,
        icon: weather[0].icon,
        wind: speed,
    }

    renderComponent();
};

const renderComponent = () => {
    root.innerHTML = `${renderTemperature(store.temp)}`
    console.log("temp: ", renderTemperature(store.temp));
    console.log("pres", renderPressure(store.pressure));

}

function getValueWithUnit(value, unit) {
    return `${value}${unit}`
}

function renderTemperature(data) {
    const roundedTemp = data.toFixed();
    return getValueWithUnit(roundedTemp, tempteratureUnit)
}

function convertPressure(value) {
    return (value / 1.33).toFixed();
}

function renderPressure(data) {
    let pressureValue = convertPressure(data);
    return getValueWithUnit(pressureValue, pressureUnit);
}

fetchData();