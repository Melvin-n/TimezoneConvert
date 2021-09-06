//declare arrays of timezones and timezone offsets
let timezoneArr = [
'GMT - Greenwich Mean Time', 
'UTC - Universal Coordinated Time', 
'ECT - European Central Time', 
'EET - Eastern European Time', 
'ART - (Arabic) Egypt Standard Time', 
'EAT - Eastern African Time', 
'MET - Middle East Time', 
'NET - Near East Time', 
'PLT - Pakistan Lahore Time', 
'IST - India Standard Time', 
'BST - Bangladesh Standard Time', 
'VST - Vietnam Standard Time', 
'CTT - China Taiwan Time', 
'JST - Japan Standard Time', 
'ACT - Australia Central Time', 
'AET - Australia Eastern Time', 
'SST - Solomon Standard Time', 
'NZST - New Zealand Standard Time', 
'MIT - Midway Islands Time', 
'HST - Hawaii Standard Time', 
'AST - Alaska Standard Time', 
'PST - Pacific Standard Time', 
'PNT - Phoenix Standard Time', 
'MST - Mountain Standard Time', 
'CST - Central Standard Time', 
'EST - Eastern Standard Time', 
'IET - Indiana Eastern Standard Time', 
'PRT - Puerto Rico and US Virgin Islands Time', 
'CNT - Canada Newfoundland Time', 
'AGT - Argentina Standard Time', 
'BET - Brazil Eastern Time', 
'CAT - Central African Time', 
]

 
let timeOffsets = {
    'GMT': 0,
    'UTC': 0,
    'ECT': 1,
    'EET': 2,
    'ART': 2,
    'EAT': 3,
    'MET': 3.5,
    'NET': 4,
    'PLT': 5,
    'IST': 5.5,
    'BST': 6,
    'VST': 7,
    'CTT': 8,
    'JST': 9,
    'ACT': 9.5,
    'AET': 10,
    'SST': 11,
    'NST': 12,
    'MIT': -11,
    'HST': -10,
    'AST': -9,
    'PST': -8,
    'PNT': -7,
    'MST': -7,
    'CST': -6,
    'EST': -5,
    'IET': -5,
    'PRT': -4,
    'CNT': -3.5,
    'AGT': -3,
    'BET': -3,
    'CAT': -1,
}

function reload() {
  document.location.reload();
}

//populate drop down list
let dropdownto = document.getElementById("timezoneinputto")
function populateDropDown(){
    for(let i = 0; i < timezoneArr.length; i++){ //loop through entire array
        let timezone = timezoneArr[i] 
        let el = document.createElement("option") //create new element named el
        el.textContent = timezone 
        el.value = timezone //add content to new element
        dropdownto.appendChild(el) //append dropdown list with new element
    }
}

populateDropDown()


//display current time
const myDate = new Date
console.log(myDate + 'mydate')
let localtime = myDate.getTime() //gets local time in ms
let lnd = new Date(localtime) //sets to readable time
let offset = myDate.getTimezoneOffset() * 60000 //offset my timezone to return UTC time, multiply by 60000 to convert ms to hours
let UTC = localtime + offset //add offset to local time, giving utc time in ms
let utctime = new Date(UTC)


let local24 = lnd.toString().substr(16, 2)

let timeformatlocal
let currentTime = formatTimeDisplay(local24, lnd)

let current = document.getElementById("current") 

current.innerHTML = currentTime 





//DOM for date and time input
let dateinput = document.getElementById("dateinput")
let timeinput = document.getElementById("timeinput")

//function for converting user input time or current time from chosen timezone
function convertTime(){
    //if no date has been input, convert current local time
    let inputDate
    if(dateinput.value == "" && timeinput.value == ""){
        inputDate = new Date()
    } else {
        inputDate = new Date(`${dateinput.value} ${timeinput.value}`)

    }

    //get unix timestamp without local time offset
    let inputDateTimeStamp = inputDate.getTime()
    let offsettime = inputDate.getTimezoneOffset() 
    let offsetms = ((offsettime / 60) + (timeOffsets[dropdownto.value.substr(0, 3)])) * 3600000
    let UTCinput = inputDateTimeStamp - offsettime
    let finalUTC = UTCinput + offsetms
    let nd = new Date(finalUTC)
    let newtime = document.getElementById("newtime")
    
   
    //format time layout
    let time24 = nd.toString().substr(16, 2)
    let newtimedisplay = formatTimeDisplay(time24, nd)
    newtime.innerHTML = newtimedisplay + " Local time"
    
 }

//function for setting format for time being shown
 function formatTimeDisplay(hours, time){
    
    if(hours > 12){
        hours = hours - 12
        return hours + time.toString().substr(18, 3) + " PM " + time.toString().substr(0, 4) + time.toString().substr(8, 3) + time.toString().substr(4, 3)
        
    } else if(hours == 12){
        return hours + time.toString().substr(18, 3) + " PM " + time.toString().substr(0, 4) + time.toString().substr(8, 3) + time.toString().substr(4, 3)
    } else if(hours < 12){
        return hours + time.toString().substr(18, 3) + " AM " + time.toString().substr(0, 4) + time.toString().substr(8, 3) + time.toString().substr(4, 3)
    }
}

