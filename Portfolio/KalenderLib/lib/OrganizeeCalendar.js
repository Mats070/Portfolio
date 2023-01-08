//Globale Variabeln
let CalendarEntryPoint = new Date();
let nav = 0;
let View = "Month";
let CalendarOptions;
let Timezone;
let allowMobileMonthView = false;
let WEEKDAYS = 7;

//DOM-Elemente
let CalendarDOM;
let WholeCalendar;
let calendar;
let defaultViews = ['Month', 'Week', '3-Days', 'Day'];
let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let hours = ['all-day','12am','1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
let DateDisplay; 

//Events
let events = [];

//Month View
function loadMonthView(){
    //Monats Ansicht des Kalendars
    //Neues Date
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
      }

      const currentday = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();

      //console.log(day + "  " + month + "  "+year)

      const firstDayOfMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInFormerMonth = new Date(year, month , 0).getDate();
      
      //console.log(firstDayOfMonth + "       " + daysInMonth)

      //Padding Days
      const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      // => z.B.: Monday, 8/1/2022 (1.8.2022)
      const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
      //=> schaut an welcher Stelle des Arrays weekdays sich der Name des ersten Tages befindet (z.B. Mittwoch = 2 Paddingdays)

      //Monat im Kalender anzeigen
      DateDisplay.innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;



      //Tage rendern und gerenderte Tage mitzählen
      let SquareCounter = 0;
      for(let i = 1; i <= paddingDays + daysInMonth; i++) {
          //Lokale Datums-Variablen
          let day;
          let SquareMonth; 
          let SquareYear;
          let dayFormated;
          let monthFormated

          //rendern von Padding Days und normalen Days
          const daySquare = document.createElement('div');
          daySquare.classList.add('day');
          

          if (i - paddingDays === currentday && nav === 0) {
            daySquare.classList.add("currentDay")
          }

          if (i <= paddingDays){
              daySquare.classList.add("padding-day");
              const MinusValue = i - paddingDays;
              day = daysInFormerMonth + MinusValue;
              SquareMonth = month -1;
              //schauen ob ein Jahreswechsel stattfindet
              if (SquareMonth == -1){
                  SquareMonth=11;
                  SquareYear= year-1;
              }else{
                  SquareYear = year;
              }

              daySquare.innerHTML = '<div class="dayHeaderInfos"><span>'+day+'</span></span>';
          }else{
              day = i - paddingDays;
              SquareMonth = month;
              SquareYear = year;
              daySquare.innerHTML = '<div class="dayHeaderInfos"><span>'+day+'</span></span>';
          }

           //Date Variablen Formatieren
           if(SquareMonth < 9){
            monthFormated = "0"+(month+1)
        }else{
            monthFormated = month +1
        }

        if (day < 10){
            dayFormated = "0"+day;
        }else{
            dayFormated = day;
        }

        //Events suchen, die an dem Tag liegen
        const formatedDate =SquareYear+"/"+monthFormated+"/"+dayFormated


          //Event div hinzufügen
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('Events');
          if(CalendarOptions.overlays.DefaultShowEventsOverlay){
            eventDiv.addEventListener('click', function(){
                openAllEventModal(formatedDate)
              })
          }
          daySquare.appendChild(eventDiv);


         
          //5 event divs rendern
          for (let eventnumber=1; eventnumber<=5; eventnumber++){
              const event = document.createElement('div');
              event.classList.add("event");
              event.setAttribute("data-event-number", eventnumber)

              eventDiv.appendChild(event)
          }

          daySquare.setAttribute("data-date", formatedDate);
          calendar.appendChild(daySquare);
          SquareCounter++;
      }

      if (SquareCounter < 42){
          const renderDays = 42 - SquareCounter;
          for (i=1; i<renderDays +1; i++){
              let SquareMonth;
              let SquareYear;
              let day = i;

              //Variablen deklarieren
              if (month <= 10){
                  SquareMonth = month + 2;
                  SquareYear = year;
              }else{
                  SquareMonth = 1;
                  SquareYear = year + 1;
              }


            //Padding Days rendern
            const formatedDate =SquareYear+"/"+SquareMonth+"/"+day
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');
            daySquare.classList.add("padding-day");
            daySquare.innerHTML = '<div class="dayHeaderInfos"><span>'+day+'</span></span>';
            daySquare.setAttribute("data-date", formatedDate);

            //Event div hinzufügen
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('Events');
            if(CalendarOptions.overlays.DefaultShowEventsOverlay){
                eventDiv.addEventListener('click', function(){
                    openAllEventModal(formatedDate)
                  })
              }
            daySquare.appendChild(eventDiv);

            //5 event divs rendern
            for (let eventnumber=1; eventnumber<=5; eventnumber++){
               const event = document.createElement('div');
               event.classList.add("event");
               event.setAttribute("data-event-number", eventnumber)

               eventDiv.appendChild(event)
            }


            calendar.appendChild(daySquare);
        }
      }
      renderEventsMonth();
} 

//Day View
function loadDayView(){
    const dt = new Date();

    if (nav !== 0) {
        dt.setDate(new Date().getDate() + nav);
    }else{
        document.getElementById("calendar-main-content-day").style.backgroundColor = "beige"
    }

    const currentday = dt.getDate();
    const today = new Date().getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    let MonthFormated;
    let DayFormated;

    if(month<9){
        MonthFormated = "0"+(month+1)
    }else{
        MonthFormated = month+1
    }

    if(currentday<10){
        DayFormated = "0"+currentday;
    }else{
        DayFormated = currentday;
    }

    const DateFormated = year+"/"+MonthFormated+"/"+DayFormated;

    //Datum im Kalender anzeigen
    DateDisplay.innerText = `${currentday}. ${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    //Grundegerüst Kalender rendern
    for(i=0; i<25; i++){
        //Stunde formatieren
        let HourFormated;

        if(i<11){
            HourFormated = "0"+(i-1);
        }else{
            HourFormated = i-1;
        }

        //Für jede Stunde eine Spalte rendern
        const HourRow = document.createElement('div');
        HourRow.classList.add('hour-row');
        HourRow.setAttribute("data-date-hour", HourFormated);

        //Stunde in jeder Reihe anzeigen
        const VisualizeHour = document.createElement('div');
        VisualizeHour.classList.add('hour-display');
        VisualizeHour.innerText = hours[i];

        //EventDiv erstellen + Zwei Divs für je eine halbe Stunde anzeigen
        const EventDiv = document.createElement('div');
        EventDiv.classList.add('event-section');

        if(i==0){
            HourRow.classList.add("all-day")
        }else{
            //Zwei verschiedene Divs rendern, jedes für eine halbe Stunde
            const EventHour1 = document.createElement('div');
            const EventHour2 = document.createElement('div');

        //Klassen hinzufügen
        EventHour1.classList.add('event-first-hour-half');
        EventHour2.classList.add('event-second-hour-half');

        //Attributen setzen
        EventHour1.setAttribute('data-event-section-StartTime', HourFormated + ':00');
        EventHour1.setAttribute('data-event-section-EndTime', HourFormated + ':30');
        EventHour2.setAttribute('data-event-section-StartTime', HourFormated + ':30');
        EventHour2.setAttribute('data-event-section-EndTime', (parseInt(HourFormated) +1) + ':00');

        //In das EventDiv hinzufügen
        EventDiv.appendChild(EventHour1);
        EventDiv.appendChild(EventHour2);
        }

        //Uhrzeitsanzeige und Event-Div in die HourRow rendern
        HourRow.appendChild(VisualizeHour);
        HourRow.appendChild(EventDiv);

        //HourRow zum Calendar hinzufügen
        calendar.appendChild(HourRow);
    }

    const scrollEl = document.querySelectorAll(".hour-row");
    scrollEl[7].scrollIntoView(true);
    
    renderEventsDay(DateFormated);
}

function getWeek(){
    let dt = new Date();
    dt.setDate(new Date().getDate());
    let Week = [];
    if (nav !== 0) {
        dt.setDate(new Date().getDate() + nav );
    };

    if (WEEKDAYS == 3){
        //3-Tage ansicht
        Week.push(dt);
        for (wd = 1; wd < 4; wd++){
            const newnav = nav +wd;
            let nextdate = new Date();
            nextdate.setDate(new Date().getDate() +newnav);
            Week.push(nextdate);
        }
    }else{
        //7-Tage Ansicht
        if (CalendarOptions.startSunday){
            //Woche beginnt Sonntags
            const diff = dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 0);
      
            const firstday = new Date(dt.setDate(diff));
            Week.push(firstday);
    
            for(wd = 1; wd < 7; wd++){
                let nextDate = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate())
                nextDate.setDate(nextDate.getDate() + wd)
                Week.push(nextDate);
            }
        }else{
            //Woche beginnt montags
            const diff = dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1);
                        
            const firstday = new Date(dt.setDate(diff));
            Week.push(firstday);
    
            for(wd = 1; wd < 7; wd++){
                let nextDate = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate())
                nextDate.setDate(nextDate.getDate() + wd)
                Week.push(nextDate);
            }
        }
    } 
    return Week;
}

//Week View
function loadWeekView(){
    const Week = getWeek();

    if (window.screen.availWidth > 650){
        calendar.style.gridTemplateColumns = `6% repeat(${WEEKDAYS}, calc(94% / ${WEEKDAYS}))`
    }else{
        calendar.style.gridTemplateColumns = `10% repeat(${WEEKDAYS}, calc(90% / ${WEEKDAYS}))`
    }

    //Datum anzeigen
    const DateDisplayText = Week[0].toLocaleDateString(Timezone,{
        day: "2-digit",
        month: "2-digit"
    })+"-"+Week[WEEKDAYS-1].toLocaleDateString(Timezone,{
        day: "2-digit",
        month: "2-digit",
        year: 'numeric'
    });
    DateDisplay.innerText = DateDisplayText;

    //Grundgerüst bauen
    //Zeiten anzeigen
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('timeDiv');

    //Padding Div welches als platzhalter dient. Gleicht die Weekdays aus
    const paddingDiv = document.createElement('div');
    paddingDiv.classList.add('paddingdiv');
    paddingDiv.innerText = "Time";

    timeDiv.appendChild(paddingDiv)

    for (hour = 0; hour < 25; hour++){
        //Stundenanzeige rendern
        const hourDiv = document.createElement('div');
        hourDiv.innerText = hours[hour];
        hourDiv.classList.add('hour-display');

        if (hour == 0){
           hourDiv.classList.add('all-day');
        }

        timeDiv.appendChild(hourDiv)
    }

    calendar.appendChild(timeDiv);

    //Tage hinzufügen
    for (day=0; day < WEEKDAYS; day++){
        const DayColumn = document.createElement('div');
        DayColumn.classList.add('DayColumn');
        const dayDisplay = Week[day].toLocaleDateString(Timezone, {
            weekday: "short",
            day: '2-digit',
            month: '2-digit'
        });

        const DateNormal = Week[day].toLocaleDateString('de',{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const DateSplit = DateNormal.split('.');
        const DateFormated = DateSplit[2]+"/"+DateSplit[1]+"/"+DateSplit[0];

        DayColumn.setAttribute('data-date', DateFormated);
        const showDateDiv = document.createElement('div');
        showDateDiv.classList.add('date-display');
        showDateDiv.innerText = dayDisplay;

        const today = new Date().toLocaleDateString(Timezone, {
            weekday: "short",
            day: '2-digit',
            month: '2-digit'
        });

        if (today == dayDisplay){
            DayColumn.classList.add('today');
        }


        //Elemente zur Spalte hinzufügen
        DayColumn.appendChild(showDateDiv);

        for(hour=0; hour<25; hour++){
            const hourRow = document.createElement('div');
            hourRow.classList.add('hour-row');
            //Hour Dataset einstellen
            let hourformated = hour-1;

            if(hour < 10){
               hourformated = "0"+(hour-1)
            }

            if(hour == 0){
                hourRow.classList.add('all-day')
            }else{
                //Event-section
                const eventSection1 = document.createElement('div');
                const eventSection2 = document.createElement('div');
                eventSection1.classList.add('event-section-first-half');
                eventSection2.classList.add('event-section-second-half')

                //Attributen setzen
                eventSection1.setAttribute('data-event-section-StartTime', hourformated + ':00');
                eventSection1.setAttribute('data-event-section-EndTime', hourformated + ':30');
                eventSection2.setAttribute('data-event-section-StartTime', hourformated + ':30');
                eventSection2.setAttribute('data-event-section-EndTime', (parseInt(hourformated) +1) + ':00');

                hourRow.setAttribute("data-date-hour", hourformated);
                hourRow.appendChild(eventSection1);
                hourRow.appendChild(eventSection2);
            };

            DayColumn.appendChild(hourRow);
        }

        // Day Spalte in den Kalendar hinzufügen
        calendar.appendChild(DayColumn);
        renderEventsWeek(DateFormated)
    }

    const scrollEl = document.querySelectorAll('.hour-display');
    scrollEl[7].scrollIntoView(true);
}

//List View 
function LoadListView(){
    const Week = getWeek();

    //Datum anzeigen
    const DateDisplayText = Week[0].toLocaleDateString(Timezone,{
        day: "2-digit",
        month: "2-digit"
    })+"-"+Week[WEEKDAYS-1].toLocaleDateString(Timezone,{
        day: "2-digit",
        month: "2-digit",
        year: 'numeric'
    });
    DateDisplay.innerText = DateDisplayText;
}

function today(){
    //Aktuelles Datum rendern
    nav = 0;
    init();
}

function back(){
    //Eine Zeiteinheit vor
    if (View == "Week" || View =='3-Days'){
        // 7 Tage zurück
        nav -= WEEKDAYS;
    }else{
        nav--;
    } 
    init();
}

function next(){
    //Eine Zeiteinheit vor
    if (View == "Week" || View == '3-Days'){
        // 7 Tage vor
        nav += WEEKDAYS;
    }else{
        nav++;
    } 
    init();
}

//Funktion zum Suchen für Events an einem bestimmten Tag
function searchEventsforDay(day){
    const eventsForDay = events.filter(e => e.days.includes(day))
    return eventsForDay;
}


function renderEventsMonth(){
    const DayList = document.querySelectorAll(".day");
    DayList.forEach(e => {
        //Vorgefertigte EventSlots und das aktuelle Date
        const EventSlots = e.children[1].children
        const actualDate = e.dataset.date;

        //Events, die an dem Tag stattfinden
        const eventsfortheday = searchEventsforDay(actualDate);
    
        if (eventsfortheday.length > 0){
            let TakenPlaces = [];
            //Belegte Event Slots direkt in TakenPlaces hinzufügen
            for (let sl = 0; sl < 5; sl++){
                if (EventSlots[sl].children.length > 0){
                    //Belegt daher in TakenPlaces Array hinzufügen
                    TakenPlaces.push(sl);
                }
            }   


            //Am Tag ist mindestens 1 Event vorhanden
            //Alle MultipleDay-Events rendern
            eventsfortheday.forEach(event => {
                    ////Wenn der aktuelle Tag der Starttag und es sich um ein Mehrtagiges Event handelt ist schauen ob eine Reihe frei ist bzw. eine auswählen
                    if (actualDate == event.startDate && event.days.length > 1){
                       //Rausfinden welche reihe frei ist
                        let Place;
                        for (let slot=0; slot < 5; slot++){
                            if (EventSlots[slot].children.length == 0){
                               Place = slot;
                               break;
                            }
                        }
                        const Slot = EventSlots[Place];
                        TakenPlaces.push(Place);

                        //Neues Element erstellen und in das entsprechende event div einfügen
                        const SlotEvent = document.createElement('div');
                        SlotEvent.innerText = event.title;
                        SlotEvent.style.color = event.textColor;
                        SlotEvent.style.backgroundColor = event.backgroundColor;
                        SlotEvent.style.width = "100%";
                        Slot.appendChild(SlotEvent);

                        //Dauer des Events
                        const Duration = event.days.length;
                        //Für jeden weiteren Tag den selben Plats "reservieren"
                        for (let d=1; d<Duration; d++){
                            const Date = event.days[d];
                            DayList.forEach(day => {
                                const actualDate = day.dataset.date;
                                if (actualDate == Date){
                                    //Neues Element hinzufügen
                                    const DayEventSlots = day.children[1].children
                                    const DaySlot = DayEventSlots[Place];
                                    const DaySlotEvent = document.createElement('div');
                                    DaySlotEvent.innerText = ".";
                                    DaySlotEvent.style.userSelect = "none";
                                    DaySlotEvent.style.color = event.backgroundColor;
                                    DaySlotEvent.style.backgroundColor = event.backgroundColor;
                                    DaySlotEvent.style.width = "100%";
                                    DaySlot.appendChild(DaySlotEvent);
                                }
                            })
                        }
                }
            })

            //Alle OneDay-AllDay Events rendern
            eventsfortheday.forEach(event => {
                if (event.days.length == 1 && event.alldays.includes(event.startDate)){
                    //=> AllDay Event, welches nicht über mehrere Tage geht
                    let Place;
                    for (let slot=0; slot < 5; slot++){
                        if (EventSlots[slot].children.length == 0){
                            Place = slot;
                            break;
                        }
                    }
                    const Slot = EventSlots[Place];
                    TakenPlaces.push(Place);

                    //Neues Element rendern und hinzufügen
                    const SlotEvent = document.createElement('div');
                    SlotEvent.innerText = event.title;
                    SlotEvent.style.color = event.textColor;
                    SlotEvent.style.backgroundColor = event.backgroundColor;
                    SlotEvent.style.width = "100%";
                    Slot.appendChild(SlotEvent);
                }
            })

            //Alle OneDay Elements rendern, die nicht AllDay sind
            eventsfortheday.forEach(event =>{
                if (event.days.length == 1 && !event.alldays.includes(event.startDate)){
                    //=> Element, was nicht allDay ist und nicht über mehrere Tage geht
                    let Place;
                    for (let slot=0; slot < 5; slot++){
                        if (EventSlots[slot].children.length == 0){
                            Place = slot;
                            break;
                        }
                    }
                    const Slot = EventSlots[Place];
                    TakenPlaces.push(Place);

                    //Neue Elemene rendern und hinzufügen
                    const DisplayBGC = document.createElement("div");
                    DisplayBGC.classList.add("MonthViewShowColor");
                    DisplayBGC.style.backgroundColor = event.backgroundColor;
                    
                    const SlotEvent = document.createElement('span');
                    SlotEvent.innerHTML = '<span class="lightgrey">'+event.startTime + ': </span><span>' +event.title+'</span>';
                    SlotEvent.style.paddingLeft = "2px";
                    SlotEvent.style.overflowX = 'visible';

                    Slot.classList.add('aligncenter')
                    Slot.appendChild(DisplayBGC);
                    Slot.appendChild(SlotEvent);


                }
            })

            if (TakenPlaces.length >= 5){
                const lastSlot = EventSlots[4];
                lastSlot.innerHTML = "";
                const tooMuch = eventsfortheday.length - 4;
                const El = document.createElement('div');
                El.style.backgroundColor = "lightgrey";
                El.innerText = "View "+tooMuch+" more"
                lastSlot.appendChild(El)
            }
        }
    })
}


//1. Funktion Day Events anzeigen
function renderEventsDay(Day){
    //Events für den Tag bekommen
    const EventsForTheDay = searchEventsforDay(Day);
    const EventSections = document.querySelectorAll('.event-section');

    const sortedEventsArray = EventsForTheDay.sort(({ startTime: a }, {startTime: b }) => a > b ? 1 : a < b ? -1 : 0);
    //Events rendern
    if (EventsForTheDay.length > 0){
        const AllDayEventSectionDOM = document.querySelector('.all-day .event-section')
        sortedEventsArray.forEach(event => {
            if (event.alldays.includes(Day)){
                //All day event
                if(event.startDate == Day){
                    //Aktueller Tag ist der Start Tag des Events
                    if (event.startTime == "00:00"){
                        //All Day Event
                        //All day Event
                        const eventDOM = document.createElement('div');
                        eventDOM.classList.add('day-event-all-day');
                        eventDOM.innerText = event.title;
                        eventDOM.style.backgroundColor = event.backgroundColor;
                        eventDOM.style.color = event.textColor;

                        AllDayEventSectionDOM.appendChild(eventDOM)
                    }else{
                        //Kein All Day Event
                        let newEvent;
                        newEvent = event;
                        newEvent.endTime = "23:59";
                        renderDayEvent(newEvent, EventSections)
                       // console.log(newEvent);
                    }
                }else if(event.endDate == Day){
                    //Aktueller Tag ist der End Tag des Events
                    if (event.endTime == "23:59"){
                        //All Day Event
                        //All day Event
                        const eventDOM = document.createElement('div');
                        eventDOM.classList.add('day-event-all-day');
                        eventDOM.innerText = event.title;
                        eventDOM.style.backgroundColor = event.backgroundColor;
                        eventDOM.style.color = event.textColor;

                        AllDayEventSectionDOM.appendChild(eventDOM)
                    }else{
                        //Kein AllDay Event
                        const eventstartTime = event.startTime;
                        console.log(eventstartTime);
                        let newEvent = event;
                        newEvent.startTime = "00:00";
                        renderDayEvent(newEvent, EventSections)
                        event.startTime = eventstartTime;
                        console.log(event.startTime)
                    }
                }else{
                    //Komplettes All-Day Event
                    //All day Event
                    const eventDOM = document.createElement('div');
                    eventDOM.classList.add('day-event-all-day');
                    eventDOM.innerText = event.title;
                    eventDOM.style.backgroundColor = event.backgroundColor;
                    eventDOM.style.color = event.textColor;

                    AllDayEventSectionDOM.appendChild(eventDOM)
                }
            }else{
                //Kein All-Day Event
                renderDayEvent(event ,EventSections);
            }
        })
    }

}

//Day Events anzeigen 2. Funktion (Nicht all-Day Events rendern);
function renderDayEvent(event , EventSections){
    //Globale Arrays
    let Entrys = [];
    let Results = [];

    //Start- und Endzeit in Millisekunden berechnen
    const start = event.startTime.split(":");
    const end = event.endTime.split(":");
    let startdate = new Date();
    let enddate = new Date();

    if (nav !== 0) {
        startdate.setDate(new Date().getDate() + nav);
        enddate.setDate(new Date().getDate() + nav);
    }

    startdate.setHours(start[0], start[1], 0, 0);
    enddate.setHours(end[0], end[1], 0, 0);

    const START = startdate.getTime();
    const END = enddate.getTime();
    const startDisplay = startdate.toLocaleString(Timezone, {
        //options
        hour: "numeric",
        minute: "numeric"
    });
    const endDisplay = enddate.toLocaleString(Timezone, {
        //options
        hour: "numeric",
        minute: "numeric"
    });

    //Event Slots zum Globalen Array hinzufügen
    EventSections.forEach(eventSection => {
        if (eventSection.classList.contains('hour-row') || eventSection.classList.contains('date-display')){
            if(eventSection.classList.contains('hour-row')){
                //AllDay-Hour Row + Die normalen Hour Rows
                const children = eventSection.children
                Entrys.push(children[0]);
                Entrys.push(children[1]);
            }
        }else{
            const children = eventSection.children
            Entrys.push(children[0]);
            Entrys.push(children[1]);
        }
    })
    //all-day entfernen
    const entrys = Entrys.slice(2, 50);
    entrys.forEach(e =>{
        //Die Anzahl der Millisekunden von jedem Feld (start, ende) berechnen
        const timeStart = e.dataset.eventSectionStarttime;
        const timeEnd = e.dataset.eventSectionEndtime;
        const TimeStart = timeStart.split(":");
        const TimeEnd = timeEnd.split(":");
        let dt1 = new Date();
        let dt2 = new Date();
        if (nav !== 0) {
            dt1.setDate(new Date().getDate() + nav);
            dt2.setDate(new Date().getDate() + nav);
        }
        dt1.setHours(TimeStart[0], TimeStart[1], 0, 0);
        dt2.setHours(TimeEnd[0], TimeEnd[1], 0, 0);

        const dtStart = dt1.getTime();
        const dtEnd = dt2.getTime();

        //Überprüfen welche slots in der Zeit liegen
        if (dtEnd > START && dtStart < END){
            Results.push(e);
        }
    })

     //Globale Variablen 
     let Placeholder = 0;
     let PlaceholderEl = false;

    for(i=0; i<Results.length; i++){

        //In jedem El das Event rendern
        const EVENT = document.createElement('div');
        EVENT.classList.add('day-event');
        EVENT.style.backgroundColor = event.backgroundColor;
        EVENT.style.color = event.textColor;

        if (i == 0){
            //Erstes Element
            EVENT.innerText = startDisplay + ' - ' + endDisplay + ':   ' +event.title;
            EVENT.style.borderTop = "1px solid";
            //EVENT.style.borderTopLeftRadius = "10px";
            //EVENT.style.borderTopRightRadius = "10px";
            EVENT.style.position = "relative";
            const heightPercentage = getheightPercentage(start[1]);
            EVENT.style.height = heightPercentage[0]+"%";
            EVENT.style.top = heightPercentage[1] +"%";

            //Für eine gute Formatierung sorgen
            //Wieviel Elemente gibt es bis jetzt in der halben Stunde
            const takenSlots = Results[i].children;
            if (takenSlots.length > 0){
                //Es befindet sich bereits ein element in der halben Stunde Spalte;
                for (TS = 0; TS < takenSlots.length; TS++){
                    if(takenSlots[TS].classList.contains("placeholder") && !takenSlots[TS].innerHTML){
                        //Freies placeholder feld gefunden
                        PlaceholderEl = takenSlots[TS];
                        break;
                    }
                }

                //Checken ob ein freies Placeholder Element gefunden wurder
                if (PlaceholderEl){
                    //Das PlaceholderEL umkonfigurieren
                    PlaceholderEl.classList.remove('placeholder');
                    PlaceholderEl.classList.add('day-event');
                }else{
                    //Neues Element anlegen
                    Placeholder = takenSlots.length;
                }
            }
        }else{
            const NeededPlaceholder = Placeholder - Results[i].children.length
            if (NeededPlaceholder > 0){
                //Man muss mindestens einen Placeholder rendern
                for (F = 0; F < NeededPlaceholder; F++ ){
                    //Placeholder rendern
                    const Placeholder = document.createElement('div');
                    Placeholder.classList.add('placeholder');

                    Results[i].appendChild(Placeholder);
                }
            }
        }
        
        if(i == (Results.length - 1)){
            //Letztes Element;
            EVENT.style.borderBottom = "1px solid";
            //EVENT.style.borderBottomLeftRadius = "10px";
            //EVENT.style.borderBottomRightRadius = "10px";
            EVENT.style.position = "relative";
            const heightPercentage = getheightPercentage(end[1]);
            EVENT.style.height = heightPercentage[0]+"%";
            Placeholder = 0;
        }


        EVENT.style.borderRight = "1px solid";
        EVENT.style.borderLeft = "1px solid";
        EVENT.style.borderColor = event.textColor;



        if (!PlaceholderEl){
                Results[i].appendChild(EVENT);
                Results[i].style.border = "none";
                if((Results[i].classList.contains("event-first-hour-half")|| Results[i].classList.contains("event-section-first-half") )&& i!== 0){
                    //Erste halbe Stunde und nicht die erste halbe stunde =>  Obere Border entfernen
                    Results[i].parentElement.style.borderColor = event.backgroundColor;
                }
        }else{
            //Element hinzufügen
            if (i == 0){
                //Erstes Element
                PlaceholderEl.appendChild(EVENT);
            }else{
                const children = Results[i].children
                if (children.length == 0){
                    Results[i].appendChild(EVENT);
                }else{
                    //Alle Children nach einem freien Placeholder element durchsuch
                    for (ts = 0; ts < children.length; ts++){
                        //Jedes Children durchsuchen
                        if(children[ts].classList.contains('placeholder') && !children[ts].innerHTML){
                            //Freies Placeholder Element gefunden
                            const EL = children[ts];
                            EL.classList.remove('placeholder');
                            EL.classList.add('day-event');
                            if (i !== (Results.length - 1)){
                                EVENT.style.height = "100%"
                            }
                            EL.appendChild(EVENT);
                        }
                    }
                }
                //Border entfernen
                Results[i].parentElement.style.borderColor = event.backgroundColor;
            }
            
        }
    }
    return Results;
}

//Aus der Uhrzeit die Höher des ersten und letzten elementes bestimmen
function getheightPercentage(minutes){
    //Ausrechnen wie hoch das Element ist und wieviel abstand es zum Top halten soll;
    const Minuten = parseInt(minutes);
    let height;
    if (Minuten <= 30){
       //Erste halbe Stunde 
       height = (Minuten / 30)*100;
    }else if (Minuten <= 60){
        //Zweite halbe Stunde
        height = ((Minuten-30) / 30)*100;
    }

    if (height == 0){
        height = 100;
    }

    const difference = 100 - height;
    return [height, difference]
}

//WeekView-Events rendern
function renderEventsWeek(Day){
    const EventsForTheDay = searchEventsforDay(Day)
    const sortedEventsArray = EventsForTheDay.sort(({ startTime: a }, {startTime: b }) => a > b ? 1 : a < b ? -1 : 0);

    let EventSections = [];
    const eventSections = document.querySelector('[data-date="'+ Day +'"]').children;

    for(i = 0; i < eventSections.length; i++){
        EventSections.push(eventSections[i])
    }
       
    if(EventsForTheDay.length > 0){
        //An dem Tag gibt es mindestens ein Event
        const AllDayEventSectionDOM = document.querySelector('[data-date="'+ Day +'"] .hour-row.all-day');
        
        sortedEventsArray.forEach(event => {
            //Überprüfen, ob es sich um ein All-Day Event handelt
            if (event.alldays.includes(Day)){
                //All Day Event
                if(event.startDate == Day){
                    //Aktueller Tag ist der Start Tag des Events
                    if (event.startTime == "00:00"){
                        //All Day Event
                        const eventDOM = document.createElement('div');
                        eventDOM.classList.add('day-event-all-day');
                        eventDOM.innerText = event.title;
                        eventDOM.style.backgroundColor = event.backgroundColor;
                        eventDOM.style.color = event.textColor;

                        AllDayEventSectionDOM.appendChild(eventDOM)
                    }else{
                        //Kein All Day Event
                        let newEvent;
                        newEvent = event;
                        newEvent.endTime = "23:59";
                        renderDayEvent(newEvent, EventSections)
                       // console.log(newEvent);
                    }
                }else if(event.endDate == Day){
                    //Aktueller Tag ist der End Tag des Events
                    if (event.endTime == "23:59"){
                        //All Day Event
                        const eventDOM = document.createElement('div');
                        eventDOM.classList.add('day-event-all-day');
                        eventDOM.innerText = event.title;
                        eventDOM.style.backgroundColor = event.backgroundColor;
                        eventDOM.style.color = event.textColor;

                        AllDayEventSectionDOM.appendChild(eventDOM)
                    }else{
                        //Kein AllDay Event
                        const eventstartTime = event.startTime;
                        let newEvent = event;
                        newEvent.startTime = "00:00";
                        renderDayEvent(newEvent, EventSections)
                        event.startTime = eventstartTime;
                    }
                }else{
                    //Komplettes All-Day Event
                    //All day Event
                    const eventDOM = document.createElement('div');
                    eventDOM.classList.add('day-event-all-day');
                    eventDOM.innerText = event.title;
                    eventDOM.style.backgroundColor = event.backgroundColor;
                    eventDOM.style.color = event.textColor;

                    AllDayEventSectionDOM.appendChild(eventDOM)
                }
            }else{
                //Kein All-Day Event
                renderDayEvent(event, EventSections)
            }
        })
    }
}

//Event Modal öffnen
function openAllEventModal(date){
    //Events für den Tag finden
    const eventstoday = searchEventsforDay(date);
    //sort events and format Date
    const eventsToday = eventstoday.sort(({ startTime: a }, {startTime: b }) => a > b ? 1 : a < b ? -1 : 0);
    const formatedDate = new Date(date).toLocaleDateString();

    //Overlay anzeigen
    const overlay = document.getElementById('calendarOverlay');
    overlay.style.display = 'inline-block';
    overlay.style.textAlign = 'center';

    //CloseBtn
    const closeBtn = document.createElement('a');
    closeBtn.classList.add('CalendarCloseBtn');
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener('click', defaultCloseOverlay);

    //Heading
    const heading = document.createElement('h2');
    heading.innerText = "Events "+formatedDate+ ":";

    //Event Div
    const EventDiv = document.createElement('div');
    EventDiv.classList.add('event-container');

    //Events in das Event Div hinzufügen
    if(eventsToday.length == 0){
        //Keine Einträge vorhanden
        EventDiv.classList.add("empty")
        EventDiv.innerText = "No Events yet"
    }else{
        //Einträge anzeigen
        eventsToday.forEach(event =>{
            const eventEl = document.createElement('div');
            eventEl.classList.add('eventEl');

            //Ist es ein AllDayEvent
            if (event.alldays.length > 0 && event.startDate != date){
                //All Day Event
                eventEl.innerHTML = "<div>all-day: "+event.title+'</div><div></div>';
            }else if(event.alldays.length > 0){
                //All Day Event aber dies ist der Starttag
                if (event.startTime != "00:00"){
                    //Nicht der komplette Tag ist abgedeckt
                    eventEl.innerHTML = '<div> <span class="gray">'+event.startTime+"-23:59:</span><span> "+event.title+'</span></div><div></div>';
                }else{
                    //Der komplette Tag ist abgedeckt
                    eventEl.innerHTML = "<div>all-day: "+event.title+'</div><div></div>';
                }

            }else{
                //"normales" Event
                eventEl.innerHTML = '<div> <span class="gray">'+event.startTime+"-"+event.endTime+":</span><span> "+event.title+'</span></div><div></div>';
            }

            EventDiv.appendChild(eventEl)
        })
    }

    //Alle Elemente zum Overlay hinzufügen
    overlay.appendChild(closeBtn);
    overlay.appendChild(heading);
    overlay.appendChild(EventDiv);
}

//Tage von einem Event hinzufügen
function getEventDays(start, end, index) {
    for(var DayList=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        const day = new Date(dt).toLocaleDateString('en-us',{
            year: 'numeric',
            month: '2-digit',
            day : '2-digit'
        });
        const year = day.slice(day.length-4, day.length);
        const month = day.slice(day.length-10, day.length-8)
        const date = day.slice(day.length-7, day.length-5)
        DayList.push(year+'/'+month+'/'+date)
    }
    //Events anpassen
    let AllDays = [];
    if (DayList.length > 1){
        //Alle Tage sind AllDays
        AllDays = DayList;
    }
    const event = events[index];
    event.days = DayList;
    event.alldays = AllDays;
    return DayList;
};


//Funktion, um Events zu konfigurieren
function ConfigEvents(events){
    //Jedes Event konfigurieren
    if (events.length > 0){
        let counter = 0;
        events.forEach(event => {
            if (event.startDate && event.endDate && event.startTime && event.endTime){
                //Alle Infos vorgegeben
                getEventDays(event.startDate, event.endDate, counter)
            }else if(event.startDate && !event.startTime && !event.endDate && !event.endTime){
                //nur das startDate vorgegeben
                event.days = [event.startDate];
                event.alldays = [event.startDate];
                event.startTime = "00:00";
            }else if(event.startDate && event.startTime){
                //Event StartDate und Time vorgegeben
                if(!event.endDate || !event.endTime){
                    const startDateSplit = event.startDate.split('/');
                    const startTimeSplit = event.startTime.split(':');
                    let availStartDate = new Date(startDateSplit[0], startDateSplit[1], startDateSplit[2], startTimeSplit[0], startTimeSplit[1]);
                    let newEndDate = availStartDate;
                    newEndDate.setHours(availStartDate.getHours()+1)

                    //Formatieren
                    const newEndYear = newEndDate.getFullYear();
                    const newEndMonth = newEndDate.getMonth();
                    const newEndDay = newEndDate.getDate();
                    const newEndDateFormat = newEndYear+"/"+newEndMonth+"/"+newEndDay;
                    
                    let newEndHours = newEndDate.getHours();
                    let newEndMinutes = newEndDate.getMinutes();

                    if(newEndHours < 10){
                        newEndHours = "0"+newEndHours;
                    }
                    if(newEndMinutes < 10){
                        newEndMinutes= "0"+newEndMinutes
                    }
                    const newEndTimeFormat = newEndHours+":"+newEndMinutes

                    //Im Event objekt speichern und 
                    event.endDate = newEndDateFormat;
                    event.endTime = newEndTimeFormat;
                    
                    getEventDays(event.startDate, newEndDateFormat, counter)
                }
            }else if(event.startDate && event.endDate){
                //Start und EndDate vorgegeben
                if(!event.startTime){
                    event.startTime = "00:00";
                }
                if(!event.endTime && event.startDate != event.endDate){
                    event.endTime = "23:59";
                }else{
                    if (!event.endTime){
                        event.endTime = "01:00";
                    }
                    
                }
                getEventDays(event.startDate, event.endDate, counter)
            }else if(event.startDate && event.endTime){
                //Start Datum und Endzeit gerendert
                event.days = [event.startDate];
                event.alldays = [event.startDate];
                event.endTime = "";
                event.startDate = "00:00";
            }
            
            counter++;
        })
    }
}

function changeCalendarView(newView){
    if (View != newView){
        if (nav != 0){
            //Von month zu ...
            if (View == "Month" && (newView == "Day" || newView == "3-Days")){
                let date = new Date();
                date.setMonth(new Date().getMonth() + nav);
                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                const sD = firstDay.getTime()
                const difference = sD - Date.now();
                nav = Math.round((difference / 1000 / 60 /60 / 24));
            };

            if (View == "Month" && newView == "Week"){
                let date = new Date();
                date.setMonth(new Date().getMonth() + nav);
                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                const difference = firstDay.getTime() - Date.now();
                const rounded = Math.round((difference / 1000 / 60 / 60 / 24));
                nav = (Math.floor(rounded / 7))*7
            }

            //Von Day zu ...
            if ((View == "Day" || View=="Week" || View == "3-Days") && newView == "Month"){
                let date = new Date();
                date.setDate(new Date().getDate() + nav);
                const today = new Date();
                let diff = date.getMonth() - today.getMonth();
                const yearDiff = date.getFullYear() - today.getFullYear();
                diff += (yearDiff * 12);
                nav = diff;
            }

            if (View == "Day" && newView == "Week"){
                let date = new Date();
                date.setDate(date.getDate()+nav);
                
                const difference = date.getTime() - Date.now();
                const rounded = Math.round((difference / 1000 / 60 / 60 / 24));
                nav = (Math.floor(rounded / 7))*7
            }

            //Von Week zu ...
            if (View == "Week" && newView == "Day"){
                nav = nav
            }
            
        }
        View = newView;
        init();
    }
}

function init(){
    //Globale Variablen initialisieren
    ConfigEvents(events);
    WholeCalendar = document.getElementById("calendar-main");
    DateDisplay = document.getElementById("date-display");
    //Kalendar clearen
    WholeCalendar.innerHTML = "";

    //Kalendar rendern 
    if (View == "Month"){
        //Überprüfen, ob MonthView für diese Bildschirmgröße supported wird
        if (!allowMobileMonthView){
            if (window.screen.availWidth < 1000){
                View = 'Day';
                document.getElementById('CalendarViewSelect').value = 'Day';
                init();
                return;
            }
        }
        //Weekdays rendern
        //Weekdays hinzufügen
        const weekdaysDOM = document.createElement('div');
        weekdaysDOM.id = 'weekdaysMonth';
    
        if (CalendarOptions.startSunday){
            //Kalendar soll am Sonntag anfangen
            weekdaysDOM.innerHTML = '<div class="weekday">Sun</div><div class="weekday">Mon</div><div class="weekday">Tue</div><div class="weekday">Wed</div><div class="weekday">Thu</div><div class="weekday">Fri</div><div class="weekday">Sat</div>';
        }else{
            //Kalendar soll Montags anfangen
            weekdaysDOM.innerHTML = '<div class="weekday">Mon</div><div class="weekday">Tue</div><div class="weekday">Wed</div><div class="weekday">Thu</div><div class="weekday">Fri</div><div class="weekday">Sat</div><div class="weekday">Sun</div>';
        }

        //Content div hinzufügen
        const CalendarDisplay = document.createElement('div');
        CalendarDisplay.id = "calendar-main-content-month";

        //Elemente in calendar-main hinzufügen
        WholeCalendar.appendChild(weekdaysDOM);
        WholeCalendar.appendChild(CalendarDisplay);

        //Globale variable zum calendar content definieren
        calendar = document.getElementById("calendar-main-content-month")

        //View Laden
        loadMonthView();
    }else if (View == "Week" || View=="3-Days"){
        //Content div hinzufügen
        if((window.screen.availWidth < 650 && !CalendarOptions.useMobileWeekView)|| View=="3-Days"){
            WEEKDAYS = 3
        }else{
            WEEKDAYS = 7
        }

        const CalendarDisplay = document.createElement('div');
        CalendarDisplay.id = "calendar-main-content-week";
        WholeCalendar.appendChild(CalendarDisplay);

        //Globale variable zum calendar content definieren
        calendar = document.getElementById("calendar-main-content-week")


        loadWeekView();
    }else if(View == "Day"){
        //Content div hinzufügen
        const CalendarDisplay = document.createElement('div');
        CalendarDisplay.id = "calendar-main-content-day";
        WholeCalendar.appendChild(CalendarDisplay);

        //Globale variable zum calendar content definieren
        calendar = document.getElementById("calendar-main-content-day")

        loadDayView();
    }else if (View == "List"){
        WEEKDAYS = 7;

        const CalendarDisplay = document.createElement('div');
        CalendarDisplay.id = "calendar-main-content-list";
        WholeCalendar.appendChild(CalendarDisplay);

        //Globale variable zum calendar content definieren
        calendar = document.getElementById("calendar-main-content-list")

        LoadListView();
    }else{
      console.error("This view is not available. Check for spelling mistakes");
    }

    //Buttons aktivieren
    document.getElementById("backBtn").addEventListener("click", back);
    document.getElementById("nextBtn").addEventListener("click", next);
    document.getElementById("todayBtn").addEventListener("click", today);
    document.getElementById("CalendarViewSelect").addEventListener("input", function(){
        changeCalendarView(document.getElementById("CalendarViewSelect").value)
    })
};

function renderCalendar(elementID, options){
    //Funktion die von außerhalb gecallt werden kann
    //Kalender Element definieren
    CalendarDOM = document.getElementById(elementID);
    document.getElementById(elementID).classList.add('organizee-calendar');
    document.getElementById(elementID).setAttribute("translate", "no")

    
    
    //header hinzufügen
    const header = document.createElement('div');
    header.id = 'calendar-header';
    header.innerHTML = '<div id=header-date-section ><span id="backBtn">&#171;</span><div id="date-display"></div><span id="nextBtn">&#187;</span></div></div><div id="buttonsection"><button id="todayBtn">Today</button></div>'

    
    //Leeres Calendar-Main Div erstellen
    const CalendarMain = document.createElement('div');
    CalendarMain.id = 'calendar-main'

    //Leeres Calendar-Footer Div erstellen
    const CalendarFooter = document.createElement('div');
    CalendarFooter.id = 'calendar-footer';
    CalendarFooter.innerHTML = '<div class=calendar-footer-credits>Provided by <a href="http://mpvdr.selfhost.me:3000/">Organizee</a></div>'

    //+Button erstellen
    const PlusButton = document.createElement('button');
    PlusButton.classList.add('AddBtn');
    PlusButton.innerText = "+"
   
    //Options
    if (options){
        CalendarOptions = options;
        if (options.events){
            events = options.events;
        }

        if(options.View){
            View = options.View;
        }

        if(options.availableViews){
            const availViews = options.availableViews;
            let availableViews = defaultViews.filter(v => availViews.includes(v));

            if (window.screen.width < 650 && !options.allowMobileMonthView){
                const index = availableViews.indexOf("Month")
                availableViews.splice(index, 1)
            }

            if (window.screen.width < 650 && !options.useMobileWeekView){
                //Week View nicht anbieten
                if(availableViews.includes('3-Days')){
                    //3 Tage Ansicht schonVorhanden
                    const index = availableViews.indexOf("Week")
                    availableViews.splice(index, 1)
                }else{
                    const index = availableViews.indexOf("Week")
                    availableViews.splice(index, 1, "3-Days")
                }
            }

            defaultViews = availableViews;
        }


        if (options.startSunday){
            weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }

        if (options.TimeDisplay == "EU"){
            //EU TimeDisplay
            hours = ['all-day', '0:00','1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
            Timezone = "de";
        }else if (options.TimeDisplay == "EN"){
            Timezone = "en";
        }else{
            console.error("This time-display option is not available. Check for spelling mistakes.")
        }

        if (options.allowMobileMonthView){
            allowMobileMonthView = true;
        }

        
        if(options.AddBtn){
            //Einstellungen sind vorhanden
            //Mögliche Einstellungen Clicked, BackgroundColor, TextColor, Border, Size, hiding, positionRight, positionTop
            if(options.AddBtn.clicked){
                PlusButton.addEventListener('click', options.AddBtn.clicked)
            }else if(options.overlays.DefaultAddOverlay){
                PlusButton.addEventListener('click', defaultOpenAddOverlay)
            }

            if (options.AddBtn.backgroundColor){
                PlusButton.style.backgroundColor = options.AddBtn.backgroundColor;
            }

            if (options.AddBtn.textColor){
                PlusButton.style.color = options.AddBtn.textColor
            }

            if (options.AddBtn.border){
                PlusButton.style.border = options.AddBtn.border
            }

            if (options.AddBtn.Size){
                PlusButton.style.fontSize = options.AddBtn.Size;
            }

            if (options.AddBtn.positionRight){
                PlusButton.style.right = options.AddBtn.positionRight;
            }

            if (options.AddBtn.positionTop){
                PlusButton.style.top = options.AddBtn.positionTop;
            }

           // CalendarDOM.appendChild(PlusButton)
        }
    }else{
        CalendarOptions = {};
    }

    //Elemente hinzufügen
    CalendarDOM.appendChild(header);
    CalendarDOM.appendChild(CalendarMain);
    CalendarDOM.appendChild(CalendarFooter);

    //View Options rendern
    const buttonsection = document.getElementById('buttonsection');

    const selectdiv = document.createElement('div');
    selectdiv.classList.add('selectdiv');

    const selectlabel = document.createElement('label');

    const CalendarViewSelect = document.createElement('select');
    CalendarViewSelect.id = "CalendarViewSelect";

    defaultViews.forEach(view => {
        const option = document.createElement('option');
        option.value = view;
        option.textContent = view;

        if(view == View){
            option.selected = true;
        }

        CalendarViewSelect.appendChild(option);
    })
    
    selectlabel.appendChild(CalendarViewSelect);
    selectdiv.appendChild(selectlabel);

    buttonsection.appendChild(selectdiv);


    //Overlay Einstellungen
    if (options.overlays){
        //Overlay Hinzufügen
        //Mögliche Objekte DefaultAddOverlay, DefaultShowEventsOverlay
        const overlay = document.createElement('div');
        overlay.id = 'calendarOverlay';
        CalendarDOM.appendChild(overlay)
    }

    const selectOptions = document.getElementById("CalendarViewSelect").options;
    for (sO = 0; sO < selectOptions.length; sO++){
        if(selectOptions[sO].text == View){
            selectOptions[sO].selected = true;
            break;
        }
    }
    init();
    
}


//Sonstige Funktionen

function Ganztag(){
    const StartTime = document.getElementById("StartTime").style;
    if (StartTime.display == "none"){
        StartTime.display = "";
        document.getElementById("EndDate").style.display = "";
        document.getElementById("EndTime").style.display = "";
        document.getElementById("HeaderEnd").style.display = "";
    }else{
        //Werden noch angezeigt
        StartTime.display = "none";
        document.getElementById("EndDate").style.display = "none";
        document.getElementById("EndTime").style.display = "none";
        document.getElementById("HeaderEnd").style.display = "none";
    }
}

function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
    
        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));
    
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );
    
    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {
    
        return 'light';
    } 
    else {
    
        return 'dark';
    }
}

//Input Daten sammeln
function collectNewEventData(){
    //Div Variablen 
    const OverlayStartDateInput = document.getElementById('OverlayEventStartDate')
    const OverlayStartTimeInput = document.getElementById("OverlayEventStartTime");
    const OverlayEndTimeInput = document.getElementById("OverlayEventEndTime");
    const OverlayEndDateInput = document.getElementById('OverlayEventEndDate');
    const CalendarOverlayGanztagBtn = document.getElementById('CalendarAddTimeGanztag');
    const OtherTypeRadio = document.getElementById('Otherradio');
    const CalendarOverlayEventRepeatDIV = document.getElementById('CalendarRepeatEventDIV');
    const CalendarOverlayDescriptionTextarea = document.getElementById('CalendarAddDescription');
    const CalendarAddBGColorInput = document.getElementById('CalendarAddBGColorInput')

    //Infos zum sammeln: Titel, Location, StartDate, StartTime, EndDate, EndTime, SchedulingType, SchedulingDuration, Type, BackgroundColor, TextColor ,Description
    let Title; 
    let Location;
    let StartDate;
    let StartTime;
    let EndDate;
    let EndTime;
    let SchedulingType;
    let SchedulingDuration;
    let EventType;
    let BGColor;
    let Color;
    let Description;

    //Titel
    if(document.getElementById('OverlayEventTitleInput').value){
        Title = document.getElementById('OverlayEventTitleInput').value;
    }else{
        Title = 'No Title'
    }

    //Location
    const LocationDIV = document.getElementById('AddLocationInput');
    if(LocationDIV){
        if(LocationDIV.value){
            Location = LocationDIV.value;
        }
    }

     //Start-Date
     if (OverlayStartDateInput.value){
            const DateStart = OverlayStartDateInput.value.split('-');
            const DateS = new Date(DateStart[0], DateStart[1]-1, DateStart[2]);

            StartDate = DefaultFormatDate(DateS);
        }else{
            //Den aktuellen Tag als Start nehmen
            const DateS = new Date();

            StartDate = DefaultFormatDate(DateS)
        }
        
        let plus = 0;
        if (CalendarOverlayGanztagBtn.checked){
            plus = 1;
        }

        //End-Date
        if(OverlayEndDateInput.value){
            const EndS = OverlayEndDateInput.value.split('-');
            const DateE = new Date(EndS[0], parseInt(EndS[1])-1,parseInt( EndS[2])+plus);

            EndDate = DefaultFormatDate(DateE);
        }else{
            //Start-Date +1 nehmen
            const StartS = StartDate.split('/');
            const DateE = new Date(parseInt(StartS[0]), parseInt(StartS[1])-1, parseInt(StartS[2])+plus);

            EndDate = DefaultFormatDate(DateE);
        }

    //Ganztag
    if (CalendarOverlayGanztagBtn.checked){
        //Ganztag
        //Times
        StartTime = "00:00";
        EndTime = "00:00";
    }else{
        //Kein Ganztag
        //Startzeit
        if (OverlayStartTimeInput.value){
            //Zeit übernehmen
            StartTime = OverlayStartTimeInput.value;
        }else{
            //00:00 Uhr
            StartTime = "00:00";
        }

        //Endzeit
        if (OverlayEndTimeInput.value){
            EndTime = OverlayEndTimeInput.value;
        }else{
            if (StartDate == EndDate){
                //Start Time +1
                const StartD = StartDate.split('/');
                const StartT = StartTime.split(":");

                const newEnd = new Date(StartD[0], parseInt(StartD[1])-1, StartD[2], parseInt(StartT[0])+1, StartT[1]);
                EndDate = DefaultFormatDate(newEnd);

                let hours = newEnd.getHours();
                let minutes = newEnd.getMinutes();

                if(hours < 10){
                    hours = "0"+hours
                }

                if(minutes <10){
                    minutes = "0"+minutes
                }

                EndTime = hours+':'+minutes
            }else{
                //End Zeit auf 00:00
                EndTime = "00:00"
            }
        }
    }

    //SchedulingType
    if (document.getElementById('CalendarEventRepeat')){
        SchedulingType =document.getElementById('CalendarEventRepeat').value;;

        if (SchedulingType != "Never"){
            //Scheduling Duration
            let NumberInput;
            const NumberInputValue = document.getElementById('CalendarEventRepeatDurationInput').value;
            if (parseInt(NumberInputValue) > 0){
                NumberInput = NumberInputValue;
            }else{
                NumberInput = "1";
            }
            const RepeatDurationType = document.getElementById('CalendarEventRepeatDurationType').value;
            SchedulingDuration = NumberInput+"*"+RepeatDurationType;
        }
    }

    //Type
    if (document.getElementById('Workradio').checked){
        EventType = "Work"
    }else if(document.getElementById('Freeradio').checked){
        EventType = "Free"
    }else{
        EventType = "Other"
    }

    //BackgroundColor
    BGColor = CalendarAddBGColorInput.value;

    //TextColor
    const checkBGColor = lightOrDark(BGColor);
    if (checkBGColor == "light"){
        Color = "black"
    }else{
        Color = "white"
    };

    //Description
    Description = CalendarOverlayDescriptionTextarea.value;

    //Event-Objekt erstellen
    const Event = {
        title: Title,
        location: Location,
        startDate: StartDate,
        startType: StartTime,
        endDate: EndDate,
        endTime: EndTime,
        schedulingType: SchedulingType,
        schedulingDuration: SchedulingDuration,
        backgroundColor: BGColor,
        textColor: Color,
        type: EventType,
        description: Description
    }

    return Event;
}



// OVERLAY IN DER AKTUELLEN VERSION NOCH NICHT SUPPORTET
//Overlay schließen
function defaultCloseOverlay(){
    //Overlay-Inhalte löschen und es nicht mehr anzeigen
    const overlay = document.getElementById('calendarOverlay');
    overlay.innerHTML = '';
    overlay.style.display = 'none';
}

//Add Overlay öffnen
function defaultOpenAddOverlay(){
    //Default Daten berechnen
    let actualDate = new Date();

    //Start: Nächste Stunde
    actualDate.setHours(actualDate.getHours()+1);
    let hours1 = actualDate.getHours();
    if(hours1 < 10){
        hours1 = "0"+hours1
    }
    const StartTime = hours1+":00";

    let month1 = actualDate.getMonth();
    if(month1 < 9){
        month1 = "0"+(month1+1)
    }else{
        month1 = month1+1;
    }

    let date1 = actualDate.getDate();
    if(date1 < 10){
        date1 = "0"+date1;
    }
    const StartDate = actualDate.getFullYear()+"-"+month1+"-"+date1;


    //Ende: Nächste Stunde +1 
    actualDate.setHours(actualDate.getHours()+1);
    let hours2 = actualDate.getHours();
    if(hours2 < 10){
        hours2 = "0"+hours2
    }
    const EndTime = hours2+":00";

    let month2 = actualDate.getMonth();
    if(month2 < 9){
        month2 = "0"+(month2+1)
    }else{
        month2 = month2+1;
    }

    let date2 = actualDate.getDate();
    if(date2 < 10){
        date2 = "0"+date2;
    };

    const EndDate = actualDate.getFullYear()+"-"+month2+"-"+date2;

    //Overlay anzeigen
    const overlay = document.getElementById('calendarOverlay');
    overlay.style.display = 'inline-block';
    overlay.style.textAlign = 'center';

    //AddOverlay rendern
    const closeBtn = document.createElement('a');
    closeBtn.classList.add('CalendarOverlayCloseBtn');
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener('click', defaultCloseOverlay);

    //Heading
    const header = document.createElement('h2');
    header.innerText = "New Event";

    //Title Input
    const TitleInput = document.createElement('input');
    TitleInput.type = "text";
    TitleInput.id = "OverlayEventTitleInput";
    TitleInput.classList.add('EventInfoInput');
    TitleInput.placeholder = "Enter Title";
    TitleInput.autocomplete = "off";

    //Location Div
    const LocationDiv = document.createElement('div');
    LocationDiv.id = 'CalendarDOMAddLocationDIV';
    LocationDiv.classList.add('addLocation');

    const LocationClickable = document.createElement('p');
    LocationClickable.innerText = '+ Add Location';
    LocationClickable.addEventListener('click', function(){
        document.getElementById('CalendarDOMAddLocationDIV').innerHTML = '<input type="text" id="AddLocationInput" class="EventInfoInput" placeholder="Location (optional)" autocomplete="off">'
    })

    LocationDiv.appendChild(LocationClickable);

    //AddDateTimeDiv
    const DateTimeDiv = document.createElement('div');
    DateTimeDiv.id = "CalendarDOMAddTimeDiv";

      //Slider
      const SliderDiv = document.createElement('div');
      SliderDiv.classList.add('all-day-slider');
      SliderDiv.innerHTML = '<span class="dateHeading">Date/Time: </span><div id="AllDaySwitch"><label class="switch"><input type="checkbox" id="CalendarAddTimeGanztag"><span class="slider round"></span></label>'

      
      DateTimeDiv.appendChild(SliderDiv);

      //StartEndDiv
      const StartEndDiv = document.createElement('div');
      StartEndDiv.classList.add('CalendarstartEndInputs');

      //Start
      const StartDiv = document.createElement('div');

      //Start-Date
      const StartDateInput = document.createElement('input');
      StartDateInput.id = "OverlayEventStartDate";
      StartDateInput.classList.add('OverlayDateTimeInputs');
      StartDateInput.type = "date";
      StartDateInput.required = "required";
      StartDateInput.value = StartDate;
      StartDateInput.min = StartDate;
      StartDateInput.addEventListener('change', (e)=>{
        const OverlayEndDateInput = document.getElementById('OverlayEventEndDate');
        const OverlayStartTimeInput = document.getElementById('OverlayEventStartTime');
        const OverlayEndTimeInput = document.getElementById('OverlayEventEndTime');
        if (e.target.value){
        const ValuesStart = e.target.value.split('-');
        const ValuesEnd = OverlayEndDateInput.value.split('-');

        let DateStart = new Date(ValuesStart[0], ValuesStart[1]-1, ValuesStart[2]);
        let DateEnd = new Date(ValuesEnd[0], ValuesEnd[1]-1, ValuesEnd[2]);

        if(DateEnd < DateStart){
            //EndDatum muss angepasst werden
            OverlayEndDateInput.value = e.target.value;
            OverlayEndDateInput.min = e.target.value;

            DateEnd = new Date(ValuesStart[0], ValuesStart[1]-1, ValuesStart[2]);

            //Stundenanzeige optimieren
            const timesStart = OverlayStartTimeInput.value.split(":");
            const timesEnd = OverlayEndTimeInput.value.split(":");

            DateStart.setHours(timesStart[0], timesStart[1]);
            DateEnd.setHours(timesEnd[0], timesEnd[1]);

            if(DateEnd < DateStart){
                let newHours = DateStart.getHours()+1;
                if(newHours != 24){
                    if(newHours < 10){
                        newHours = "0"+newHours;
                    }
                    OverlayEndTimeInput.value = newHours+":00"
                }else{
                    DateEnd.setDate(DateEnd.getDate()+1);
                    let day = DateEnd.getDate();
                    let month = DateEnd.getMonth()+1;

                    if(day < 10){
                        day = "0"+day
                    }

                    if(month < 10){
                        month = "0"+month;
                    }

                    DateEnd.setHours(0, 0);
                    OverlayEndTimeInput.value = "00:00";
                    OverlayEndDateInput.value = DateEnd.getFullYear()+'-'+month+'-'+day;
                }
            }
        }
        }
      })

      StartDiv.appendChild(StartDateInput);

      //StartTime
      const StartTimeInput = document.createElement('input');
      StartTimeInput.id = 'OverlayEventStartTime';
      StartTimeInput.type = "time";
      StartTimeInput.required = "required";
      StartTimeInput.classList.add('OverlayDateTimeInputs');
      StartTimeInput.value = StartTime;
      StartTimeInput.addEventListener('change', (e)=>{
        //
      })

      StartDiv.appendChild(StartTimeInput);
      StartEndDiv.appendChild(StartDiv);

      //End
      const EndDiv = document.createElement('div');

      //End-Date
      const EndDateInput = document.createElement('input');
      EndDateInput.classList.add('OverlayDateTimeInputs');
      EndDateInput.id = 'OverlayEventEndDate';
      EndDateInput.type = "date";
      EndDateInput.required = "required";
      EndDateInput.value = EndDate;
      EndDateInput.min = EndDate;
      EndDateInput.addEventListener('change', (e)=>{
        //
      })

      EndDiv.appendChild(EndDateInput);

      //End-Time
      const EndTimeInput = document.createElement('input');
      EndTimeInput.id = 'OverlayEventEndTime';
      EndTimeInput.type = "time";
      EndTimeInput.classList.add('OverlayDateTimeInputs');
      EndTimeInput.required = "required";
      EndTimeInput.value = EndTime;
      EndTimeInput.addEventListener('change', (e)=>{
        //
      });

      EndDiv.appendChild(EndTimeInput);

      //BR
      const br = document.createElement('br');

      StartEndDiv.appendChild(br)
      StartEndDiv.appendChild(EndDiv);
      DateTimeDiv.appendChild(StartEndDiv);

    //Alle Elemente zum Overlay hinzufügen
    overlay.appendChild(closeBtn);
    overlay.appendChild(header);
    overlay.appendChild(TitleInput);
    overlay.appendChild(LocationDiv);
    overlay.appendChild(DateTimeDiv);

    //Ganztag Check Event Listener
    document.getElementById('CalendarAddTimeGanztag').addEventListener('click', function(){
        const CalendarOverlayGanztagBtn = document.getElementById('CalendarAddTimeGanztag');
        //Ganztag an oder aus überprüfen
        if(CalendarOverlayGanztagBtn.checked){
            //Beide TimeInput-Felder nicht mehr anzeigen
            setTimeout(function(){
                OverlayStartTimeInput.style.display = "none";
                OverlayEndTimeInput.style.display = "none";
                OverlayEndDateInput.value = OverlayStartDateInput.value;
            }, 175)
        }else{
            //Beide TimeInput-Felder wieder anzeigen
            setTimeout(function(){
                OverlayStartTimeInput.style.display = "inline";
                OverlayEndTimeInput.style.display = "inline";
            },175)
        }
      })
}



