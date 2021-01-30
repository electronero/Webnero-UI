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
        this.loadParams();    
        
        
        this.passportParams.method = 'login';
        this.setMethod('login');
        this.passportParams.coinAPIurl = this.getPassportApi(coinSymbol);
        this.passportParams.uid = null;
        console.log("1");
        console.log(this.passportParams);
        this.remoteCall(coinSymbol).then((response) => {
            console.log(this.passportParams);
            if(response){
                let passportLogin = JSON.parse(response);
                if(passportLogin.hasOwnProperty("error")){
                    loginFail();
                    return;
                }

                this.setCoinUUID(coinSymbol, passportLogin);
                this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
                this.passportParams.code = parseInt(this.loadCode());
                this.passportParams.method = 'check_code';
                this.setMethod('check_code');
                console.log("2");
                console.log(this.passportParams);
                this.remoteCall(coinSymbol).then((response) => {
                    if(response){
                        console.log(response); 
                        let passportCheckCode = JSON.parse(response);
                        if(passportCheckCode.hasOwnProperty("error")){
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
        this.remoteCall(coinSymbol).then((response) => {
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
                this.remoteCall(coinSymbol).then((response) => {
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
