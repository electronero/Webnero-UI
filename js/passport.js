var PassportPipeline = {

    passportParams: { 
                     method: '',
                     username: '',
                     email: '',
                     password: '',
                     code: '',
                     uid: '',
                     unlocked_balance: 0, 
                     balance: 0,
                     locked_balance: 0,
                     telegramID: '',
                     telegramUsername: '',
                     bounty_id: '',
                     address: '',  
                     secret: '',
                     height: 0,
                     top_block_hash: '',
                     status: '',
                     txcount: 0,
                     crfi_address: "",
                     crfi_stake_reward_address: "",
                     crfi_farming_reward_address: "",
                     crfi_unlocked_balance: 0,
                     crfi_balance: 0,
                     etnx_address: "",
                     etnx_stake_reward_address: "",
                     etnx_farming_reward_address: "",
                     etnx_unlocked_balance: 0,
                     etnx_balance: 0,
                     etnxp_address: "",
                     etnxp_stake_reward_address: "",
                     etnxp_farming_reward_address: "",
                     etnxp_unlocked_balance: 0,
                     etnxp_balance: 0,
                     ltnx_address: "",
                     ltnx_stake_reward_address: "",
                     ltnx_farming_reward_address: "",
                     ltnx_unlocked_balance: 0,
                     ltnx_balance: 0,
                     gldx_address: "",
                     gldx_stake_reward_address: "",
                     gldx_farming_reward_address: "",
                     gldx_unlocked_balance: 0,
                     gldx_balance: 0,
                     usdt_address: "",
                     btc_address: "",
                     eth_address: "",
                     ltc_address: "",
                     locked_blocks: 0,
                     usdt_value: 0,
                     btc_value: 0,
                     eth_value: 0,
                     ltc_value: 0,
                     coinAPIurl: "",
                     timestamp: '',
                     date: '',
                     name: '',
                     addr: '',
                     pid: '',
                     receiver: '',
                     txid: '',
                     link: '',
                     notes: '',
                     lost_password: '',
                     telegramID: '',
                     telegram_username: '',
                     telegramUsername: '',
                     bounty_id: '',
                     discord: '',
                     twitter: '',
                     crfi_address: '',
                     crfi_payment_id: '',
                     etnx_address: '',
                     etnx_payment_id: '',
                     etnxp_address: '',
                     etnxp_payment_id: '',
                     ltnx_address: '',
                     ltnx_payment_id: '',
                     gldx_address: '',
                     gldx_payment_id: '',
                     btc_address: '',
                     btc_payment_id: '',
                     eth_address: '',
                     eth_payment_id: '',
                     ltc_address: '',
                     ltc_payment_id: '',
                     usdt_address: '',
                     usdt_payment_id: '',
                     usdc_address: '',
                     usdc_payment_id: '',
                     address: '',
                     secret: '',
                     aindex: 0,
                     beneficiary_name: "",
                     beneficiary_email: "",
                     beneficiary_address: "",
                     beneficiary_aindex: 0,
                     elderid: '',
                     bounty_id: '',
                     verified: '',
                     claimed: '',
                     claims: '',
                     bounty_balance: '',
                     bounty_elderid: '',
                     bounty_title: '',
                     bounty_link: '',
                     bounty_notes: '',
                     bounty_status: '',
                     bounty_reward: '',
                     bounty_address: '',
                     bounty_verified: '',
                     passporturi: '',
                     selfieuri: '',
                     kyc_verified: '',
                     bounty_twitter: '',
                     bounty_telegram: '',
                     bounty_facebook: ''
    },

    myCipher: Crypto.encryptData(Crypto.salt()),
    myDecipher: Crypto.decryptData(Crypto.salt()),

    etnxApi: 'https://pulse.electronero.org/api-etnx/api.php',
    etnxpApi: 'https://pulse.electronero.org/etnxp-api/api.php',
    etnxcApi: 'https://pulse.electronero.org/etnxc-api/api.php',
    ltnxApi: 'https://pulse.electronero.org/ltnx-api/api.php',
    gldxApi: 'https://pulse.electronero.org/gldx-api/api.php',
    crfiApi: 'https://passport.crystaleum.org/crfi-api/api.php',

    etnxExpl: 'blockexplorer.electronero.org',
    etnxpExpl: 'blockexplorer.electroneropulse.org',
    etnxcExpl: 'blockexplorer.electroneroclassic.org',
    ltnxExpl: 'blockexplorer.litenero.org',
    gldxExpl: 'blockexplorer.goldnero.org',
    crfiExpl: 'oracle.crystaleum.org',

    saveParams: function(){
        // Store Session
        sessionStorage.setItem("username", this.myCipher(this.passportParams.username));
        sessionStorage.setItem("password", this.myCipher(this.passportParams.password)); 
        // Then cipher any sensitive data
        this.passportParams.username = sessionStorage.getItem("username");
        this.passportParams.email = sessionStorage.getItem("username");
        this.passportParams.password = sessionStorage.getItem("password");
        console.log(this.passportParams.username)   
        console.log(this.passportParams.password)
    },
    setWalletAindex: function(coinSymbol, aindex){ 
        console.log("setWalletAindex");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        sessionStorage.setItem("aindex", parseFloat(aindex));
        sessionStorage.setItem("beneficiary_aindex", parseFloat(aindex));
        this.passportParams.aindex = parseFloat(sessionStorage.getItem("aindex"));
        this.passportParams.beneficiary_aindex = sessionStorage.getItem("aindex");
        console.log("setWalletAindex to: " + parseFloat(this.passportParams.aindex));
        console.log("setWalletAindex beneficiary to: " + parseFloat(this.passportParams.beneficiary_aindex));
    },    
    getWalletAindex: function(coinSymbol){
        console.log("getWalletAindex");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    this.loadParams();
    this.passportParams.method = 'get_wallet_aindex';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("getWalletAindex init");
                console.log(this.passportParams);
                if(response){
                    let passportGetAindex = JSON.parse(response);
                    if(passportGetAindex.hasOwnProperty("error")){
                        let aindexError = passportGetAindex.error;
                        $(".alert-danger").html(aindexError);
                        console.log(passportGetAindex);
                        return;
                    }   
                        const aindex = parseFloat(passportGetAindex.data);
                        this.passportParams.aindex = aindex;
                        this.setWalletAindex("crfi", aindex);
                        console.log(passportGetAindex);
                        console.log(passportGetAindex.data);
                        return;
                }
            });
    },
    fillBeneficiary: function(coinSymbol, list){
        console.log("fillBeneficiary");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        }
        console.log(list);
        var name = list.name;
        var email = list.email;
        var address = list.address;
        console.log("name: "+name)
        console.log("email: "+email)
        console.log("address: "+address)
    document.getElementById("name_span").innerHTML = name;
        document.getElementById("email_span").innerHTML = email;
        document.getElementById("address_span").innerHTML = address;
    },
    getBeneficiary: function(coinSymbol){
        console.log("getBeneficiary");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    this.loadParams();
    this.passportParams.method = 'get_beneficiary';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    this.passportParams.aindex = parseFloat(this.passportParams.aindex);
    this.passportParams.beneficiary_aindex = parseFloat(this.passportParams.beneficiary_aindex);
    this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("getBeneficiary init");
                console.log(this.passportParams);
                if(response){
                    let passportGetBeneficiary = JSON.parse(response);
                    if(passportGetBeneficiary.hasOwnProperty("error")){
                        let aindexError = passportGetBeneficiary.error;
                        $(".alert-danger").html(aindexError);
                        console.log(passportGetBeneficiary);
                        return;
                    }   
                        const list = passportGetBeneficiary.data;
                        //this.passportParams.list = list;
                        this.fillBeneficiary("crfi", list);
                        console.log(passportGetBeneficiary);
                        console.log(passportGetBeneficiary.data);
                        return;
                }
            });
    },
    setBountyId: function(coinSymbol, bounty_id){ 
        console.log("setBountyId");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    var crfiData = ModelViewController.getCoinData("crfi"); 
    let bounty_address = crfiData.address;
    document.getElementById("elder_address_span").innerHTML = bounty_address;
        sessionStorage.setItem("bounty_id", bounty_id)
    sessionStorage.setItem("bounty_address", bounty_address);
        this.passportParams.bounty_id = sessionStorage.getItem("bounty_id");
        this.passportParams.bounty_address = sessionStorage.getItem("bounty_address");
        console.log("setBountyId to: " + this.passportParams.bounty_id);
        console.log("bounty_address to: " + this.passportParams.bounty_address);
    },
    storeElderHash: function(coinSymbol, elder_hash){ 
        console.log("storeElderHash");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    document.getElementById("elder_bounty_id").innerHTML = elder_hash;
        sessionStorage.setItem("elder_hash", elder_hash)
        this.passportParams.bounty_elderid = sessionStorage.getItem("elder_hash");
        this.passportParams.elderid = sessionStorage.getItem("elder_hash");
        console.log("bounty_elderid set to: " + this.passportParams.bounty_elderid);
    },
    hasBountyId: function(coinSymbol){
        console.log("hasBountyId");
    if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        return sessionStorage.getItem("bounty_id");
    },
    hasElderBountyId: function(coinSymbol){
        console.log("hasBountyId");
    if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        return sessionStorage.getItem("bounty_elderid");
    },
    getBountyID: function(coinSymbol){
        console.log("getBountyID");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    this.loadParams();
    this.passportParams.method = 'get_bounty_id';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("getBountyID init");
                console.log(this.passportParams);
                if(response){
                    let passportGetBountyID = JSON.parse(response);
                    if(passportGetBountyID.hasOwnProperty("error")){
                        let bountyIdErr = passportGetBountyID.error;
                        $(".alert-danger").html(bountyIdErr);
                        console.log(passportGetBountyID);
                        return;
                    }   
                        const bounty_id = passportGetBountyID.data.bountyid;
                        this.passportParams.bounty_id = bounty_id;
                        PassportPipeline.setBountyId("crfi", bounty_id);
                        console.log(passportGetBountyID);
                        console.log(passportGetBountyID.data);
                        return;
                }
            });
    },
    fillFoundlings: function(coinSymbol, foundlings){
        console.log("fillFoundlings");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        }
        console.log(foundlings);
        
    var session_bounty_elderid = sessionStorage.getItem("bounty_elderid");  
    var session_bounty_id = sessionStorage.getItem("bounty_id");    

    var i;
    for(i = 0; i < foundlings.length; i++){
    var address = foundlings[i].address;
    console.log(foundlings[i]);
    var tbody = $("#bounty-history").find('tbody');
    var bounty_id = foundlings[i].bounty_id;
    var bounty_elderid = foundlings[i].bounty_elderid;
        if(address == null || address == "null" || address == '' || address == undefined){
            address = 'Private';
           }
      var tr;
      tr = $('<tr/>');
      tr.append("<td>" + bounty_id + "</td>");
      tr.append("<td>" + address + "</td>");
      $(tbody).append(tr);
    }
        console.log("address: "+address)
        console.log("session_bounty_elderid: "+session_bounty_elderid)
        console.log("session_bounty_id: "+session_bounty_id)
    },
    
    monitorFoundlings: function(coinSymbol, bounty_id, data){
        console.log("monitorFoundlings");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    this.loadParams();
    this.passportParams.method = 'monitor_foundlings';
    console.log("bounty_id at monitor_foundlings: "+bounty_id);
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    this.passportParams.bounty_id = bounty_id;
    this.passportParams.bounty_elderid = bounty_id;
    console.log(this.passportParams.bounty_elderid)
    this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("monitorFoundlings init");
                console.log(this.passportParams);
                if(response){
                    let passportMonitorFoundlings = JSON.parse(response);
                    if(passportMonitorFoundlings.hasOwnProperty("error")){
                        let foundlingError = passportMonitorFoundlings.error;
                        $(".alert-danger").html(foundlingError);
                        console.log(passportMonitorFoundlings);
                        return;
                    }   
                        let bounty_elderid = PassportPipeline.hasElderBountyId("crfi");
                        var foundlings = passportMonitorFoundlings.data.foundlings;
                        PassportPipeline.fillFoundlings("crfi", foundlings);
                        console.log(passportMonitorFoundlings);
                        console.log(passportMonitorFoundlings.data);
                        return;
                }
            });
    },
    
    setElderHash: function(coinSymbol, elder_hash){
        console.log("setElderHash");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    this.loadParams();
    this.passportParams.method = 'charge_elder_hash';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    this.passportParams.bounty_elderid = elder_hash;
    var crfiData = ModelViewController.getCoinData("crfi"); 
    let bounty_address = crfiData.address;
    this.passportParams.address = bounty_address;
    this.passportParams.bounty_address = bounty_address;
    this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("setElderHash init");
                console.log(this.passportParams);
                if(response){
                    let passportAddElder = response;
                    if(passportAddElder.hasOwnProperty("error")){
                        let beneError = passportAddElder.error;
                        $(".alert-danger").html(beneError);
                        console.log(passportAddElder);
                        return;
                    }   
                        //this.saveParams();
            PassportPipeline.storeElderHash("crfi", elder_hash);
                        console.log(passportAddElder);
                        return;
                }
            });
    },
    setBeneficiary: function(coinSymbol, bene_name, bene_email, bene_address){
        console.log("setBeneficiary");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        if(!bene_name || !bene_email || !bene_address){
            return;
        } 
    this.loadParams();
    this.passportParams.method = 'add_beneficiary';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    this.passportParams.aindex = parseFloat(this.passportParams.aindex);
    this.passportParams.beneficiary_aindex = parseFloat(this.passportParams.beneficiary_aindex);
    this.passportParams.beneficiary_name = bene_name;
    this.passportParams.beneficiary_email = bene_email;
    this.passportParams.beneficiary_address = bene_address;
    this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("setBeneficiary init");
                console.log(this.passportParams);
                if(response){
                    let passportAddBene = JSON.parse(response);
                    if(passportAddBene.hasOwnProperty("error")){
                        let beneError = passportAddBene.error;
                        $(".alert-danger").html(beneError);
                        console.log(passportAddBene);
                        return;
                    }   
                        //const aindex = passportAddBene.data;
                        //this.passportParams.aindex = aindex;
                        this.saveParams();
                        console.log(passportAddBene);
                        return;
                }
            });
    },
    
    saveHash: function(key_set){   
        console.log("saveHash");
        if(key_set != undefined || key_set != null){
            sessionStorage.setItem("key_hash", key_set);
            this.passportParams.lost_password = sessionStorage.getItem("key_hash");
           }
        else {
            sessionStorage.setItem("key_hash", this.passportParams.lost_password);
            this.passportParams.lost_password = sessionStorage.getItem("key_hash");
        }
        console.log(this.passportParams.lost_password);    
        return(sessionStorage.getItem("key_hash"));
    },
    logUU: function(){
        console.log("logUU");
        console.log(this.passportParams);
    },
    hasValidSession: function(){
        return sessionStorage.hasOwnProperty("username")
                && sessionStorage.hasOwnProperty("password")
                && sessionStorage.hasOwnProperty("code")
    },
    loadParams: function(){
        // Read only persistent data needed
        this.passportParams.username = this.myDecipher(sessionStorage.username);
        this.passportParams.email = this.myDecipher(sessionStorage.username);
        this.passportParams.password = this.myDecipher(sessionStorage.password);
    },
    remoteCall: function(coinSymbol){
        return $.ajax({
                    url: this.getPassportApi(coinSymbol),
                    type: 'POST',
                    cache: false,
                    data: this.passportParams
                });
    },   
    setUUkey: function(coinSymbol){
        console.log("setUUkey");
        if(!coinSymbol){
    coinSymbol = 'crfi'; // default crfi
    };
    this.loadParams();
    this.passportParams.method = 'set_uu_key';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("set_uu_key init");
                if(response){
                    console.log(response)
                    let passportSetUU = JSON.parse(response);
                    if(passportSetUU.hasOwnProperty("error")){
                        let resetError = passportSetUU.error;
                        $(".alert-danger").html(resetError);
                        console.log(passportSetUU);
                        //resetFail();
                        return;
                    }   
                        this.passportParams.lost_password = passportSetUU.data;
                        this.saveHash();
                        console.log("SET UU");
                        console.log(passportSetUU);
                        console.log("GET UU .DATA");
                        console.log(passportSetUU.data);
                        console.log(this.passportParams);
                        //resetSuccess();
                        return;
                }
            });
    },
    getUUkey: function(coinSymbol){
        console.log("getUUkey");
        if(!coinSymbol){
    coinSymbol = 'crfi'; // default crfi
    };
    this.loadParams();
    this.passportParams.method = 'get_uu_key';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("get_uu_key init");
                console.log(this.passportParams);
                if(response){
                    let passportGetUU = JSON.parse(response);
                    if(passportGetUU.hasOwnProperty("error")){
                        let resetError = passportGetUU.error;
                        $(".alert-danger").html(resetError);
                        console.log(passportGetUU);
                        //resetFail();
                        return;
                    }                           
                        this.passportParams.lost_password = passportGetUU.data;
                        this.saveHash();
                        console.log("GET UU");
                        console.log(passportGetUU);
                        console.log("GET UU .DATA");
                        console.log(passportGetUU.data);
                        //resetSuccess();
                        return;
                }
            });
    },
    simulateRemoteCall: function(coinSymbol){
         return Passport.simulate(this.passportParams);
     },
    setCredentials: function(email, password, save){
        // maybe cipher the data, but it's done elsewhere
        this.passportParams.username = this.myDecipher(email);
        this.passportParams.email = this.myDecipher(email);
        this.passportParams.password = this.myDecipher(password);
        if(save)
        {
            return this.saveParams();
        }
    },
    setMethod: function(method){
        return this.passportParams.method = method;
    },
    setCode: function(code){
        // We needed it for refresh data
        this.passportParams.code = code; 
        return sessionStorage.setItem("code", code);
    },
    loadCode: function(){
        return this.passportParams.code = this.myDecipher(sessionStorage.code);
    },
    setCoinUUID: function(coinSymbol, passportLogin){
        return sessionStorage.setItem(coinSymbol+"_uuid", this.myCipher(passportLogin.data.uid));
    },
    getCoinUUID: function(coinSymbol){
        return this.myDecipher(sessionStorage.getItem(coinSymbol+"_uuid"));
    },
    performOperation: function(coinSymbol, operationCallback){
        console.log("performOperation");
        this.loadParams();        
        this.passportParams.method = 'login';
        this.setMethod('login');
        this.passportParams.coinAPIurl = this.getPassportApi(coinSymbol);
        this.passportParams.uid = null;
        console.log("1");
        console.log(this.passportParams);
        this.remoteCall(coinSymbol,this.passportParams).then((response) => {
            console.log(this.passportParams);
            if(response){
                console.log(response);
                let passportLogin = JSON.parse(response);
                if(passportLogin.hasOwnProperty("error")){
                    loginFail();
                    return;
                }

                this.setCoinUUID(coinSymbol, passportLogin);
                this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
                console.log("UUID log")
                console.log(this.passportParams.uid)
                this.passportParams.code = parseInt(this.loadCode());
                this.passportParams.method = 'check_code';
                this.setMethod('check_code');
                console.log("2");
                console.log(this.passportParams);
                this.remoteCall(coinSymbol, this.passportParams).then((response) => {
                    if(response){
                        console.log(response); 
                        let passportCheckCode = JSON.parse(response);
                        if(passportCheckCode.hasOwnProperty("error")){
                            let checkError = passportCheckCode.hasOwnProperty("error");
                            console.log(checkError);
                            loginCodeFail();
                            return;
                        }
                        if(ModelViewController.coinState){
                            console.log("MVC.coinState:")
                           console.log(ModelViewController.coinState)
                           }
                        console.log("3");
                        console.log(this.passportParams);
                        operationCallback(coinSymbol);
                    }
                });
            }
        });
    },
    registerOperation: function(coinSymbol, operationCallback){
        this.loadParams();        
        this.passportParams.method = 'register';
        this.passportParams.coinAPIurl = this.getPassportApi(coinSymbol);
        this.passportParams.uid = null;
        console.log("1");
        console.log(this.passportParams);
        this.remoteCall(coinSymbol,this.passportParams).then((response) => {
            if(response){
                let passportLogin = JSON.parse(response);
                if(passportLogin.hasOwnProperty("error")){
                    loginFail();
                    return;
                }
                this.setCoinUUID(coinSymbol, passportLogin);
                this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
                this.passportParams.code = parseInt(this.loadCode());
                this.passportParams.method = 'add_code';
                console.log("2");
                console.log(this.passportParams);
                this.remoteCall(coinSymbol,this.passportParams).then((response) => {
                    if(response){
                        console.log(response); 
                        let passportCheckCode = JSON.parse(response);
                        if(passportCheckCode.hasOwnProperty("error")){
                            loginCodeFail();
                            return;
                        }
                        ModelViewController.coinState++
                        if(ModelViewController.coinState>=4){
                           location.href = "verify.html";
                           }
                        console.log("3");
                        console.log(this.passportParams);
                        operationCallback(coinSymbol);
                    }
                });
            }
        });
    },
    getPassportApi: function(coinSymbol){
        switch(coinSymbol){
            case 'etnx':
                return this.etnxApi;
            case 'etnxp':
                return this.etnxpApi;
            case 'etnxc':
                return this.etnxcApi;
            case 'ltnx':
                return this.ltnxApi;
            case 'gldx':
                return this.gldxApi;
            case 'crfi':
                return this.crfiApi;
            default:
                break;
        };
    },
    getBlockchainLink: function(coinSymbol){
        switch(coinSymbol){
            case 'etnx':
                return this.etnxExpl;
            case 'etnxp':
                return this.etnxpExpl;
            case 'etnxc':
                return this.etnxcExpl;
            case 'ltnx':
                return this.ltnxExpl;
            case 'gldx':
                return this.gldxExpl;
            case 'crfi':
                return this.crfiExpl;
            default:
                break;
        };
    }
};

var jsonLogin = {"status":"success","data":{"uid":"1","password":"test"}};

var jsonLoginError = {"error": "fail"};

var jsonGetAddr = {
        "address":"88owYM3JXB5i8zT9pzcNGkhC3LmFCehSsdnnLZi995cSTeRPzHwXoXgdKD39NpErU8E2zmNjyoK7BV7DQ4e8ntm17UsNw1W",
        "balances":
            {"balance":123456789, "multisig_import_needed":false, "unlocked_balance":4567890
        },
        "txs":{
            "in": [ { "amount" : 1200,
                        "height" : 1234561,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234562,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234563,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" } ],
            "out": [ { "amount" : 1200,
                        "height" : 1234564,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234565,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234566,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" }],
        },"imports":[],"contracts":[]};

var Passport = {
    simulate: function(data){
        if(data.method == 'login'){
            if(data.password != "qwerty")
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLoginError)); }, 1000);
                });
            else
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
                });
        }
        else if(data.method == 'check_code'){
            if(data.code != "12345")
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLoginError)); }, 1000);
                });
            else
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
                });
        }
        else if(data.method == 'getaddr')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonGetAddr)); }, 250);
            });
        else if(data.method == 'add_code')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonGetAddr)); }, 250);
            });
        else if(data.method == 'register')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
            });
        else if(data.method == 'send_transaction')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
            });
        
        return new Promise((resolve, reject) => {
            reject("Method not supported");
        });
    }
};
