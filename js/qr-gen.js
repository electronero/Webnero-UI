(function() {
	// etnx
	var etnxData = ModelViewController.getCoinData("etnx");
	if(etnxData != null){
    (function() {

        var $value_etnx = etnxData.address;
        var qr = window.qr = new QRious({
            element: document.getElementById('qrious-etnx'),
            size: 250,
            value: $value_etnx
        });
    })();
}
	// etnxp
	var etnxpData = ModelViewController.getCoinData("etnxp");
	if (etnxpData != null) {
    (function() {
        var $value_etnxp = etnxpData.address;

        var qr2 = window.qr2 = new QRious({
            element: document.getElementById('qrious-etnxp'),
            size: 250,
            value: $value_etnxp
        });
    })();
}
	// etnxc
	var etnxcData = ModelViewController.getCoinData("etnxc");
	if (etnxcData != null) {
    (function() {
        var $value_etnxc = etnxcData.address;

        var qr2 = window.qr2 = new QRious({
            element: document.getElementById('qrious-etnxc'),
            size: 250,
            value: $value_etnxc
        });
    })();
}
	// ltnx
	var ltnxData = ModelViewController.getCoinData("ltnx");
	if (ltnxData != null) {
    (function() {
        var $value_ltnx = ltnxData.address;

        var qr2 = window.qr2 = new QRious({
            element: document.getElementById('qrious-ltnx'),
            size: 250,
            value: $value_ltnx
        });
    })();
}
	// gldx
	var gldxData = ModelViewController.getCoinData("gldx");
	if (gldxData != null) {
    (function() {
        var $value_gldx = gldxData.address;

        var qr2 = window.qr2 = new QRious({
            element: document.getElementById('qrious-gldx'),
            size: 250,
            value: $value_gldx
        });
    })();
}
        // crfi
        var crfiData = ModelViewController.getCoinData("crfi");
        if (crfiData != null) {
    (function() {
        var $value_crfi = crfiData.address;

        var qr2 = window.qr2 = new QRious({
            element: document.getElementById('qrious-crfi'),
            size: 250,
            value: $value_crfi
        });
    })();
}
	
	//
})();
