$(document).ready(function(){
    ModelViewController.fillData();
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else {
        sessionStorage.setItem("fromLogin", false);
        ModelViewController.fillHistory();
    };
});


var coin_checked = {
	coin: null
};
var etnx = {
	balance: null,
	coin: 'etnx'
};
var etnx_checked = false;
var etnxp = {
	balance: null,
	coin: 'etnxp'
};
var etnxp_checked = false;
var ltnx = {
	balance: null,
	coin: 'ltnx'
};
var ltnx_checked = false;
var gldx = {
	balance: null,
	coin: 'gldx'
};
var gldx_checked = false;
var crfi = {
	balance: null,
	coin: 'crfi'
};
var crfi_checked = false;
document.getElementById('etnx-send').addEventListener("click", function() {
	console.log("etnx-send");
	var etnxBalance = $('#etnx-unlocked-balance').text();
	console.log(etnxBalance);
	etnx_checked = true;
	coin_checked.coin = 'etnx';
	etnx.balance = etnxBalance;
	console.log(coin_checked);
});

document.getElementById('etnxp-send').addEventListener("click", function() {
	console.log("etnxp-send");
	var etnxpBalance = $('#etnxp-unlocked-balance').text();
	console.log(etnxpBalance);
	etnxp_checked = true;
	coin_checked.coin = 'etnxp';
	etnxp.balance = etnxpBalance;
	console.log(coin_checked);
});

document.getElementById('ltnx-send').addEventListener("click", function() {
	console.log("ltnx-send");
	var ltnxBalance = $('#ltnx-unlocked-balance').text();
	console.log(ltnxBalance);
	ltnx_checked = true;
	coin_checked.coin = 'ltnx';
	ltnx.balance = ltnxBalance;
	console.log(coin_checked);
});

document.getElementById('gldx-send').addEventListener("click", function() {
	console.log("gldx-send");
	var gldxBalance = $('#gldx-unlocked-balance').text();
	console.log(gldxBalance);
	gldx_checked = true;
	coin_checked.coin = 'gldx';
	gldx.balance = gldxBalance;
	console.log(coin_checked);
});

document.getElementById('crfi-send').addEventListener("click", function() {
	console.log("crfi-send");
	var crfiBalance = $('#crfi-unlocked-balance').text();
	console.log(crfiBalance);
	crfi_checked = true;
	coin_checked.coin = 'crfi';
	crfi.balance = crfiBalance;
	console.log(coin_checked);
});
document.getElementById('send-all').addEventListener("click", function() {
	var sendAll = false;
	if(sendAll == true) {
		sendAll = false;
	} else {
		sendAll = true;
	}
	if(coin_checked.coin === 'etnx'){
		console.log("ETNX");
	}
	else if(coin_checked.coin === 'etnxp'){
		console.log("ETNXP");
	}
	else if(coin_checked.coin === 'ltnx'){
		console.log("LTNX");
	}
	else if(coin_checked.coin === 'gldx'){
		console.log("GLDX");
	} 
	else if(coin_checked.coin === 'crfi'){
		console.log("CRFI");
	} else {
		console.log("ERROR");
	}
	
	console.log(Object.values(coin_checked)[0]);
	var coin_selected = coin_checked.coin;
	var coinsymbol = '';
	    switch(coin_selected){
		    case 'etnx':
			    $("#amount").val(etnx.balance);
			    break;
		    case 'etnxp':
			    $("#amount").val(etnxp.balance);
			    break;
		    case 'ltnx':
			    $("#amount").val(ltnx.balance);
			    break;
		    case 'gldx':
			    $("#amount").val(gldx.balance);
			    break;
		    case 'crfi':
			    $("#amount").val(crfi.balance);
			    break;
		    default:
			    break;
	    }
   console.log("sendAll: " + sendAll + " " + coin_selected);
});


$(document).on("click", "#send-modal", function(){
    $('.form-group').removeClass("has-error");
    if(checkMandatoryField("amount") && checkMandatoryField("receiver"))
        $("#send-code-modal").modal('show');
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
   
//     const _uuid = PassportPipeline.myDecipher(sessionStorage.getItem(coinSymbol+"_uuid"));
//     const _email = PassportPipeline.myDecipher(sessionStorage.getItem("username"));
//     const _password = PassportPipeline.myDecipher(sessionStorage.getItem("password"));
	const _uuid = sessionStorage.getItem(coinSymbol+"_uuid");
    	const _email = sessionStorage.getItem("username");
    	const _password = sessionStorage.getItem("password");
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

        sessionStorage.setItem("code", pin_code);
        console.log(pin_code);
        // check_code

        //var coin_selected = $(".btn-selected").attr("id");
	var coin_selected = coin_checked.coin;
        PassportPipeline.setCode(pin_code);
	    switch(coin_selected){
		    case 'etnx':
			    return PassportPipeline.performOperation("etnx", sendCallback);
			    break;
		    case 'etnxp':
			    return PassportPipeline.performOperation("etnxp", sendCallback);
			    break;
		    case 'ltnx':
			    return PassportPipeline.performOperation("ltnx", sendCallback); 
			    break;
		    case 'gldx':
			    return PassportPipeline.performOperation("gldx", sendCallback);
			    break;
		    case 'crfi':
			    return PassportPipeline.performOperation("crfi", sendCallback);
			    break; 
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
