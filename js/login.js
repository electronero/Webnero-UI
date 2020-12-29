
$(document).on("click", "#login", function(){
    cleanPinCode();
    ModelViewController.isLogin = 1;
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
        // loop through coins.coin and login all coins simultaneously
        let coins = ModelViewController.coins.coin;
        ModelViewController.returnState();
        PassportPipeline.performOperation('crfi', ModelViewController.initCoin);
//         for (var k=0;k<coins.length;k++) {
//             const selectCoins = coins[k];
//             // fix login
//             console.log("selectCoins: " + selectCoins);
            
//         };
    }
});


