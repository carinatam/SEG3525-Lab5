function validatePhone(txtPhone) {
    var a = document.getElementById(phoneNumber).value;
    var filter = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/;
    if(filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

function getUnavailableDates() {
    if(!$("input[name='desiredPhysician']:checked").val()) {
        return [0,1,2,3,4,5,6];
    }
    if($("input[name='desiredPhysician']:checked").val() === "Lynette Blanchard"){
        return [4];
    }
    if($("input[name='desiredPhysician']:checked").val() === "Kent Jarvis"){
        return [2,3];
    }
    if($("input[name='desiredPhysician']:checked").val() === "Taddeo Grant"){
        return [1,5];
    }
}
function disableDates(date){
    day = date.getDay();
    if(day === 0 || date.getDay() === 6) return [false];
    return [getUnavailableDates().indexOf(day) === -1];
    
}

const setDateFormat = "mm-dd-yy";
$(document).ready(function() {
    $("#phoneNumber").mask("(000) 000-0000");
    $("#cardNumber").mask("0000-0000-0000-0000");
    $("#cvv").mask("000");

    $("#lynetteButton").click(function(){
        $("#lynetteInfo").toggle();
    });
    $("#kentButton").click(function(){
        $("#kentInfo").toggle();
    })
    $("#taddeoButton").click(function(){
        $("#taddeoInfo").toggle();
    })
    $("#lynetteShowAvail").click(function(){
        $("#lynetteAvail").toggle();
    })
    $("#kentShowAvail").click(function(){
        $("#kentAvail").toggle();
    })
    $("#taddeoShowAvail").click(function(){
        $("#taddeoAvail").toggle();
    })

    $("#dateInput").datepicker({
        dateFormat: setDateFormat,
        minDate: "+1",
        maxDate: "+4M",
        beforeShowDay: $.datepicker.noWeekends,
        beforeShowDay: disableDates,
    });

    $(".expertSelect").on("change", function() {
        if(!$("input[name='desiredPhysician']:checked").val()){
            $("input[name='desiredPhysician']").addClass('is-invalid');
            $("#invalidPhysician").show();
            $("#validPhysician").hide();
        }
        else{
            $("input[name='desiredPhysician']").removeClass('is-invalid');
            $("#invalidPhysician").hide();
            $("#validPhysician").show();
            $("#dateInput").val("");
        }
    });

    $("#firstName").on("focusout", function() {
        if($("#firstName").val().length < 2){
            $("#validFirstName").hide();
            $("#invalidFirstName").show();
        }
        else{
            $("#validFirstName").show();
            $("#invalidFirstName").hide();
        }
    })

    $("#lastName").on("focusout", function() {
        if($("#lastName").val().length < 2){
            $("#validLastName").hide();
            $("#invalidLastName").show();
        }
        else{
            $("#validLastName").show();
            $("#invalidLastName").hide();
        }
    })

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      }

    $("#email").on("focusout", function() {
        if(!isEmail($("#email").val())){
            $("#validEmail").hide();
            $("#invalidEmail").show();
        }
        else{
            $("#validEmail").show();
            $("#invalidEmail").hide();
        }
    })

    $("#phoneNumber").on("focusout", function() {
        if(!(($("#phoneNumber").val()).match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im))){
            $("#validPhone").hide();
            $("#invalidPhone").show();
        }
        else{
            $("#validPhone").show();
            $("#invalidPhone").hide();
        }
    })

    $("#dateInput").on("change", function() {
        if($("#dateInput").val()){
            $("#validDate").show();
            $("#invalidDate").hide();
        }
        else{
            $("#validDate").hide();
            $("#invalidDate").show();
        }
    })

    $("#timeInput").on("change", function() {
        if($("#timeInput").val()){
            $("#validTime").show();
            $("#invalidTime").hide();
        }
        else{
            $("#validTime").hide();
            $("#invalidTime").show();
        }
    })

    $("#cardNumber").on("focusout", function() {
        if($("#cardNumber").val().length == 19){
            $("#validCard").show();
            $("#invalidCard").hide();
        }
        else{
            $("#validCard").hide();
            $("#invalidCard").show();
        }
    })

    $("#expirationMonth").on("change", function() {
        if($("#expirationMonth").val()){
            $("#validExpMonth").show();
            $("#invalidExpMonth").hide();
        }
        else{
            $("#validExpMonth").hide();
            $("#invalidExpMonth").show();
        }
    })

    $("#expirationYear").on("change", function() {
        if($("#expirationYear").val()){
            $("#validExpYear").show();
            $("#invalidExpYear").hide();
        }
        else{
            $("#validExpYear").hide();
            $("#invalidExpYear").show();
        }
    })

    $("#cvv").on("focusout", function(){
        if($("#cvv").val().length === 3){
            $("#validCvv").show();
            $("#invalidCvv").hide();
        }
        else{
            $("#validCvv").hide();
            $("#invalidCvv").show();
        }
    })

    $("#timeInput").timepicker({
        interval: 30,
        minTime: "8:30am",
        maxTime: "5:30pm",
        defaultTime: "8:30am",
        startTime: "8:30am",
    })

    $("#services").on("change", function() {
        if(!$("input[name='selectedService']:checked").val()){
            $("input[name='selectedService']").addClass('is-invalid');
            $("#invalidService").show();
            $("#validService").hide();
        }
        else {
            $("input[name='selectedService']").removeClass('is-invalid');
            $("#invalidService").hide();
            $("#validService").show();
        }
    })

    $("#submitAppointment").click(function(e){
        $("#submitButton").empty().hide();
        e.preventDefault();
        if(!hasErrors()){
            $("#submitButton").show();
            $("#submitButton").append('<img src="https://img.icons8.com/officel/38/26e07f/checkmark--v1.png" />')
            $("#submitButton").append("Appointment successfully submitted for ");
            $("#submitButton").append($("input[name='selectedService']:checked").val());
            $("#submitButton").append(" with ");
            $("#submitButton").append($("input[name='desiredPhysician']:checked").val());
            $("#submitButton").append(" on ");
            $("#submitButton").append($("#dateInput").val());
            $("#submitButton").append(" at ");
            $("#submitButton").append($("#timeInput").val());
            $("#submitButton").append(".");
    
            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn-close");
            button.setAttribute("data-bs-dismiss", "alert");
            button.setAttribute("aria-label", "Close");
            $("#submitButton").append(button);
            $("#bookingForm").trigger("reset");
        }
    })
    
    function hasErrors(){
        //check service is chosen
        var hasError = false;
        if(!$("input[name='selectedService']:checked").val()){
            $("input[name='selectedService']").addClass('is-invalid');
            $("#invalidService").show();
            $("#validService").hide();
            hasError = true;
        }
        else {
            $("input[name='selectedService']").removeClass('is-invalid');
            $("#invalidService").hide();
            $("#validService").show();
        }
        //check physician is chosen
        if(!$("input[name='desiredPhysician']:checked").val()){
            $("input[name='desiredPhysician']").addClass('is-invalid');
            $("#invalidPhysician").show();
            $("#validPhysician").hide();
            hasError = true;
        }
        else{
            $("input[name='desiredPhysician']").removeClass('is-invalid');
            $("#invalidPhysician").hide();
            $("#validPhysician").show();
        }

        //check first name
        if($("#firstName").val().length < 2){
            $("#validFirstName").hide();
            $("#invalidFirstName").show();
            hasError = true;
        }
        else{
            $("#validFirstName").show();
            $("#invalidFirstName").hide();
        }

        //check last name
        if($("#lastName").val().length < 2){
            $("#validLastName").hide();
            $("#invalidLastName").show();
            hasError = true;
        }
        else{
            $("#validLastName").show();
            $("#invalidLastName").hide();
        }

        //check email
        if(!isEmail($("#email").val())){
            $("#validEmail").hide();
            $("#invalidEmail").show();
            hasError = true;
        }
        else{
            $("#validEmail").show();
            $("#invalidEmail").hide();
        }

        //check phone number
        if(!(($("#phoneNumber").val()).match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im))){
            $("#validPhone").hide();
            $("#invalidPhone").show();
            hasError = true;
        }
        else{
            $("#validPhone").show();
            $("#invalidPhone").hide();
        }

        //check date
        if($("#dateInput").val()){
            $("#validDate").show();
            $("#invalidDate").hide();
        }
        else{
            $("#validDate").hide();
            $("#invalidDate").show();
            hasError = true;
        }

        //check time
        if($("#timeInput").val()){
            $("#validTime").show();
            $("#invalidTime").hide();
        }
        else{
            $("#validTime").hide();
            $("#invalidTime").show();
            hasError = true;
        }

        //check card number
        if($("#cardNumber").val().length == 19){
            $("#validCard").show();
            $("#invalidCard").hide();
        }
        else{
            $("#validCard").hide();
            $("#invalidCard").show();
            hasError = true;
        }

        //check exp month
        if($("#expirationMonth").val()){
            $("#validExpMonth").show();
            $("#invalidExpMonth").hide();
        }
        else{
            $("#validExpMonth").hide();
            $("#invalidExpMonth").show();
            hasError = true;
        }

        //check exp year
        if($("#expirationYear").val()){
            $("#validExpYear").show();
            $("#invalidExpYear").hide();
        }
        else{
            $("#validExpYear").hide();
            $("#invalidExpYear").show();
            hasError = true;
        }

        //check cvv
        if($("#cvv").val().length === 3){
            $("#validCvv").show();
            $("#invalidCvv").hide();
        }
        else{
            $("#validCvv").hide();
            $("#invalidCvv").show();
            hasError = true;
        }

        if(hasError){
            $('html,body').animate({
                scrollTop: $("#appointmentSection").offset().top
            }, 'fast');
            return true;
        }
        return false;
    }

    $("#firstName").tooltip({})
    $("#lastName").tooltip({})
    $("#email").tooltip({})
    $("#phoneNumber").tooltip({})
    $("#cardNumber").tooltip({})
    $("#cvv").tooltip({})
})