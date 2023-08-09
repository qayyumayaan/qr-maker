new Vue({
    el: '#app',
    data: {
        qrInput: '',
        qrImage: null
    },
    methods: {
        generateQRCode: function() {
            let qr = qrcode(0, 'L');
            qr.addData(this.qrInput);
            qr.make();
            this.qrImage = qr.createImgTag(4);
        },
        reset: function() {
            this.qrInput = '';
            this.qrImage = null;
        }
    }
});