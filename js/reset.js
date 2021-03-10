function resetFail(){
    $("#pin-code-container").css("display", "none");
    $("#reset-container").css("display", "block");
    $("#spinner-modal").modal('hide');
    $(".alert-danger").css("display", "block");
}

function resetCodeFail(){
    $(".alert-danger").html("Wrong code");
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function resetSuccess(){
    $("#pin-code-container").css("display", "none");
    $("#reset-container").css("display", "block");
    $(".alert-success").css("display", "block");
    $("#spinner-modal").modal('hide');
}

$(document).on("click", "#resetpwd", function(){
    if($("#pass").val() != $("#repeat").val()){
        let userErr = "Your password does not match. Please correct your password, and try again momentarily.";
        $(".alert-danger").html(userErr)
        resetFail();
        return;
    }
    else {
    PassportPipeline.resetPassword('crfi', $("#email").val(), $("#pass").val(), $("#repeat").val(), true)
    //$("#pin-code-container").css("display", "block");
    //$("#reset-container").css("display", "none");
    }
});

$(document).on("click", "#reset-code", function(){
    hideAlert("success");
    hideAlert("danger");
    var newPin = $("#pin").val();

    if(!Utils.isValidCode(newPin)){
        showAlert("danger", "Invalid code, please provide 5 digit");
        return;
    }

    if($("#confirmpin").val() !== newPin){
        showAlert("danger", "Pincode mismatch");
        return;
    }
    $("#confirm-msg").text("Are you sure you want to update your 5 digit securit pin code?");
    $("#confirm-ok").data("operation", "password");
    $("#confirm-modal").modal();
});

$(document).on("click", "#reset", function(){
    if($("#email").val() != $("#confirm-email").val() || $("#confirm-email").val() != $("#email").val()){
        let userErr = "Your email does not match. Please correct your email, and try again momentarily.";
        $(".alert-danger").html(userErr)
        resetFail();
        return;
    }
    else {
    PassportPipeline.resetPassword('crfi', $("#email").val(), "", "", false)
    //$("#pin-code-container").css("display", "block");
    //$("#reset-container").css("display", "none");
    }
});
