// TO-DO: CALCULATE MONTHS

// ------------------------------------ initializing firebase
var config = {
    apiKey: "AIzaSyADTHMraTsMOFcPkDpO6zpfElwEoomUMjI",
    authDomain: "chochotrain-b818c.firebaseapp.com",
    databaseURL: "https://chochotrain-b818c.firebaseio.com",
    projectId: "chochotrain-b818c",
    storageBucket: "",
    messagingSenderId: "133286118381"

  };

firebase.initializeApp(config);
var database = firebase.database();




$("#submit").on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();

    // grabbing user inputs
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var start = $("#start-input").val().trim();
    var freq = $("#freq-input").val().trim();

    // push user inputs to database
    database.ref().push({
        name: name,
        destination: destination,
        start: start,
        freq: freq   
    }), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    };

});




// pulling information from database
database.ref().on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val());
   

    // var x = childSnapshot.val();
    
    // for ( i=0 ; i < x.length[i] ; i++) {
    //     console.log("here" + x.name);

    // }
    
    // creating a new table row and its cells
    var tr = $("<tr>");
    var nametd = $("<td>");
    var destinationtd = $("<td>");
    var starttd = $("<td>");
    var freqtd = $("<td>");
    //var ratetd = $("<td>");
    var minutestd = $("<td>");

    // calculating number of months worked
    //var minutes = moment(childSnapshot.val().start).diff(moment(), "months", true);
    //var minutes = 30;

    ////////////////////////////////////

    var freqX = (childSnapshot.val().freq);
    var startX = (childSnapshot.val().start);
   
    console.log ("frequency + start time " + freqX + ","  +startX);
    //////////////////////////////////////////////////////////////////
    var tFrequency = freqX;

    // Time is 3:30 AM
    var firstTime = startX;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    var minutes = tFrequency - tRemainder;
    
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))












    //////////////////////////////////////////////////////////////////
    




    //////////////////////
    // adding database values to table
    nametd.text(childSnapshot.val().name);
    destinationtd.text(childSnapshot.val().destination);
    starttd.text(childSnapshot.val().start);
    freqtd.text(childSnapshot.val().freq);
    minutestd.text(minutes);


    // var freqX = freqtd.text(childSnapshot.val().freq);

    //ratetd.text(childSnapshot.val().rate);
    //minutes.text(minutes);

    // assembling new table row and adding it to existing table
    // tr.append(nametd).append(roletd).append(starttd).append(monthtd).append(ratetd).append(billtd);
    // $("table").append(tr);

    tr.append(nametd).append(destinationtd).append(starttd).append(freqtd).append(minutestd);
    $("table").append(tr);









    //document.form-group.reset();
    $("#name-input").val('');
    $("#destination-input").val('');
    $("#start-input").val('');
    $("#freq-input").val('');
    
    
    


});