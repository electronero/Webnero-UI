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
        
        PassportPipeline.setCode(PassportPipeline.myCipher(pin_code));
        PassportPipeline.setCredentials(PassportPipeline.myCipher($("#email").val()), PassportPipeline.myCipher($("#password").val()), true);
        sessionStorage.setItem("fromLogin", true);
        ModelViewController.returnState();
            var coins = {
                crfi: 'crfi',
                etnx: 'etnx',
                etnxp: 'etnxp',
                ltnx: 'ltnx',
                gldx: 'gldx'
            }
            PassportPipeline.performOperation(coins, ModelViewController.initCoin);
    }
});


