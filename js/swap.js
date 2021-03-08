$(document).ready(function(){
    ModelViewController.fillData();
});

$(document).on("click", "#send-modal", function(){
    $('.form-group').removeClass("has-error");
    if(checkMandatoryField("amount") && checkMandatoryField("receiver"))
        $("#send-code-modal").modal('show');
});


document.getElementById('swap-all').addEventListener("click", function() {
	var sendAll = false;
	if(sendAll == true) {
		sendAll = false;
	} else {
		sendAll = true;
	}
	var coin_selected = $(".btn-selected").attr("id");
	var coinsymbol = '';
	    switch(coin_selected){
		    case 'etnx-send':
			   day = "Sunday";
		    var etnxData = ModelViewController.getCoinData("etnx");
			if(etnxData != null){
			    const etnxBalance = ModelViewController.formatCoinUnits(etnxData.balances.unlocked_balance, "etnx")
			    $("#amount").val(etnxBalance);
			} 
			    break;
		    case 'etnxp-send':
		    var etnxpData = ModelViewController.getCoinData("etnxp");
			if(etnxpData != null){
			    const etnxpBalance = ModelViewController.formatCoinUnits(etnxpData.balances.unlocked_balance, "etnxp")
			    $("#amount").val(etnxpBalance);
			}
			    break;
		    case 'etnxc-send':
		    var etnxcData = ModelViewController.getCoinData("etnxc");
			if(etnxcData != null){
			    const etnxcBalance = ModelViewController.formatCoinUnits(etnxcData.balances.unlocked_balance, "etnxc")
			    $("#amount").val(etnxcBalance);
			}
			    break;
		    case 'ltnx-send':
		    var ltnxData = ModelViewController.getCoinData("ltnx");
			if(ltnxData != null){
			    const ltnxBalance = ModelViewController.formatCoinUnits(ltnxData.balances.unlocked_balance, "ltnx")
			    $("#amount").val(ltnxBalance);
			}
			    break;
		    case 'gldx-send':
		    var gldxData = ModelViewController.getCoinData("gldx");
			if(gldxData != null){
			    const gldxBalance = ModelViewController.formatCoinUnits(gldxData.balances.unlocked_balance, "gldx")
			    $("#amount").val(gldxBalance);
			}
			    break;
		    case 'crfi-send':
		    var crfiData = ModelViewController.getCoinData("crfi");
			if(crfiData != null){
			    const crfiBalance = ModelViewController.formatCoinUnits(crfiData.balances.unlocked_balance, "crfi")
			    $("#amount").val(crfiBalance);
			}
	    }
   console.log("sendAll: " + sendAll + " " + coin_selected);
});

function checkMandatoryField(id){
    if($("#" + id).val() == ""){
        $("#" + id).closest('.form-group').addClass("has-error");
        return false;
    }
    
    return true;
}

function sendCallback(coinSymbol){

    PassportPipeline.setMethod('send_transaction');
    const coinAmount = $("#amount").val();
    PassportPipeline.passportParams.amount = parseInt(ModelViewController.formatCoinTransaction(coinAmount, coinSymbol));
    PassportPipeline.passportParams.receiver = $("#receiver").val();
    PassportPipeline.passportParams.pid = $("#pid").val();
   
    const _uuid = PassportPipeline.myDecipher(sessionStorage.getItem(coinSymbol+"_uuid"));
    const _email = PassportPipeline.myDecipher(sessionStorage.getItem("username"));
    const _password = PassportPipeline.myDecipher(sessionStorage.getItem("password"));
	if(_uuid){
        // logs
        console.log(_uuid);
        console.log(_email);
        console.log(_password);
	}
    console.log(PassportPipeline.passportParams)
    
    PassportPipeline.remoteCall(coinSymbol).then((response) => {
        if(response){
            console.log(response); 
            var sendResult = JSON.parse(response);
            if(sendResult.hasOwnProperty("error"))
                sendFail("Transaction Fail");
            else
                sendSuccess();    
        }
        else
            sendFail("System Fail");
    });
}


$(document).on("click", "#send", function(){
    $(".alert").css("display", "none");
    $(".btn-code").css("display", "none");
    if(pin_code.length < 5){
        sendFail("Provide 5 digits code");
    }
    else {
        $("#spinner-modal").modal('show');
        $("#send-code-modal").modal('hide');

        sessionStorage.setItem("code", PassportPipeline.myCipher(pin_code));
        console.log(pin_code);
        // check_code

        var coin_selected = $(".btn-selected").attr("id");
        PassportPipeline.setCode(PassportPipeline.myCipher(pin_code));
	    switch(coin_selected){
		case 'etnx-send':
		    return PassportPipeline.performOperation("etnx", sendCallback);
		case 'etnxp-send':
		    return PassportPipeline.performOperation("etnxp", sendCallback);
		case 'etnxc-send':
		    return PassportPipeline.performOperation("etnxc", sendCallback); 
		case 'ltnx-send':
            	    return PassportPipeline.performOperation("ltnx", sendCallback); 
		case 'gldx-send':
            	    return PassportPipeline.performOperation("gldx", sendCallback); 
       		case 'crfi-send':
		    return PassportPipeline.performOperation("crfi", sendCallback); 
        default:
            break;
	    }
    }     
});

function sendSuccess(){
    $(".alert-success").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function sendFail(message){
    $(".alert-danger").html("Transfer error: " + message);
    $(".alert-danger").css("display", "block");
    $(".btn-code").css("display", "block");
    $("#spinner-modal").modal('hide');
}
