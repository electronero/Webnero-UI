$(document).on("click", "#login", function(){
    cleanPinCode();
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});

$(document).on("click", "#pin-code", function(){
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").html("Please provide 5 digits");
        $(".alert-danger").css("display", "block");
    }
    else {
        $(".alert").css("display", "none");
        $("#spinner-modal").modal('show');
        
        PassportPipeline.setCode(pin_code);
        PassportPipeline.setCredentials($("#email").val(), $("#password").val(), true);
        sessionStorage.setItem("fromLogin", true);
        ModelViewController.returnState();
        let coins = ModelViewController.coins.coin; 
        let passport_local = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl : null,
            uid: PassportPipeline.passportParams.uid ? PassportPipeline.passportParams.uid : null,
            email: $("#email").val(),
            password: $("#password").val(),
            pin: pin_code ? pin_code : null,
            method: 'login'
        };
        var count = 0;
        for(count>0; count < coins.length; count++){
            console.log("count before: " + count);
            PassportPipeline.performOperation(coins[count], ModelViewController.initCoin, passport_local)  
            console.log("count after: " + count);
        };
    }
});


