url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-A523E2DD-3CF3-4628-A2AF-31A366CDA998'
const weatherCard = document.querySelector('.weatherCard');
const allBtn = document.querySelector('.allBtn');
const chooseBtn = document.querySelectorAll('.chooseBtn');
const firTime = document.querySelector('.firTime');
const secTime = document.querySelector('.secTime');
const tirTime = document.querySelector('.tirTime');
const timeNow = document.querySelector('.timeNow');
const setTime = document.querySelectorAll('.setTime');
const allData = [[5, 1, 18, 13, 3, 4, 7], [8, 11, 20, 14, 9], [2, 0, 6, 15, 17], [10, 12], [19, 16, 21]];
const myData = allData.flat(Infinity);
let locaName = [];
let Wx = [];
let icon = [];
let Pop = [];
let MinT = [];
let Ci = [];
let MaxT = [];
let DataArr;
let timeSelect = 0;

function getData() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        findLocation(data)
    })
    .catch(error => {
        alert('無法取得資料，請聯絡開發人員')
    });
};


function findLocation(data) {
    DataArr = data.records.location;
    firTime.textContent = `${DataArr[0].weatherElement[0].time[0].startTime} ~ ${DataArr[0].weatherElement[0].time[0].endTime}`
    secTime.textContent = `${DataArr[0].weatherElement[0].time[1].startTime} ~ ${DataArr[0].weatherElement[0].time[1].endTime}`
    tirTime.textContent = `${DataArr[0].weatherElement[0].time[2].startTime} ~ ${DataArr[0].weatherElement[0].time[2].endTime}`
    timeNow.textContent = `${DataArr[0].weatherElement[0].time[timeSelect].startTime} ~ ${DataArr[0].weatherElement[0].time[timeSelect].endTime}`
    for (let i = 0; i < DataArr.length; i++) {
        locaName.push(DataArr[myData[i]].locationName);
        icon.push(DataArr[myData[i]].weatherElement[0].time[timeSelect].parameter.parameterValue);
        Wx.push(DataArr[myData[i]].weatherElement[0].time[timeSelect].parameter.parameterName);
        Pop.push(DataArr[myData[i]].weatherElement[1].time[timeSelect].parameter.parameterName);
        MinT.push(DataArr[myData[i]].weatherElement[2].time[timeSelect].parameter.parameterName);
        Ci.push(DataArr[myData[i]].weatherElement[3].time[timeSelect].parameter.parameterName);
        MaxT.push(DataArr[myData[i]].weatherElement[4].time[timeSelect].parameter.parameterName);
        inHtml();
    };
};

function inHtml() {
    weatherCard.innerHTML = '';
    for (i = 0; i < locaName.length; i++) {
        weatherCard.innerHTML += `<div class="col">
                                    <div class="mycard" style="background-image: url(./img/locationImg/${locaName[i]}.jpg)">
                                        <div class="content">
                                            <h3 class="title">${locaName[i]}</h3>
                                            <div class="copy">
                                                <span class="text-info">${MinT[i]}度</span>-<span class="text-danger">${MaxT[i]}度</span>
                                                <div>${Wx[i]}</div>
                                                <div><i class="fa-solid fa-umbrella"></i>&nbsp;${Pop[i]}%</div>
                                                <div>${Ci[i]}</div>
                                                <img src="./img/weatherIcon/${icon[i]}.svg" alt="" style="width: 80px; height: 80px;">
                                            </div>
                                        </div>
                                    </div>
                                </div>`
    };
};

function resetData() {
    locaName = [];
    Wx = [];
    Pop = [];
    MinT = [];
    Ci = [];
    MaxT = [];
    icon = [];
};

function btnArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        locaName.push(DataArr[arr[i]].locationName);
        Wx.push(DataArr[arr[i]].weatherElement[0].time[timeSelect].parameter.parameterName);
        icon.push(DataArr[arr[i]].weatherElement[0].time[timeSelect].parameter.parameterValue);
        Pop.push(DataArr[arr[i]].weatherElement[1].time[timeSelect].parameter.parameterName);
        MinT.push(DataArr[arr[i]].weatherElement[2].time[timeSelect].parameter.parameterName);
        Ci.push(DataArr[arr[i]].weatherElement[3].time[timeSelect].parameter.parameterName);
        MaxT.push(DataArr[arr[i]].weatherElement[4].time[timeSelect].parameter.parameterName);
        inHtml();
    };
};

getData();

allBtn.addEventListener('click', function() {
    resetData();
    getData();
});

for (let i = 0; i < chooseBtn.length; i++) {
    chooseBtn[i].addEventListener('click', function() {
        let arr = allData[i]
        resetData();
        btnArr(arr);
    })
}

for (let i = 0; i < setTime.length; i++) {
    setTime[i].addEventListener('click', function() {
        let arr = myData
        timeSelect = i;
        timeNow.textContent = `${DataArr[0].weatherElement[0].time[timeSelect].startTime} ~ ${DataArr[0].weatherElement[0].time[timeSelect].endTime}`
        resetData();
        btnArr(arr);
    })
}







