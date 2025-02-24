new Vue({
    el: '#app',
    data: {
        qrInput: '',
        qrImage: null,
        copyText: "Copy to Clipboard",
        downloadText: "Download QR Code"
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
            this.copyText = "Copy to Clipboard";
            this.downloadText = "Download QR Code";
        },
        copyToClipboard: function() {
            if (!this.qrImage) return;

            let imgTag = this.$refs.qrContainer.querySelector('img');
            if (!imgTag) return;

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            let img = new Image();
            img.crossOrigin = "Anonymous"; 
            img.src = imgTag.src;

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                    if (!blob) return;

                    const item = new ClipboardItem({ "image/png": blob });
                    navigator.clipboard.write([item]).then(() => {
                        this.copyText = "Copied!";
                        setTimeout(() => {
                            this.copyText = "Copy to Clipboard";
                        }, 5000);
                    }).catch(() => {
                        this.copyText = "Failed!";
                        setTimeout(() => {
                            this.copyText = "Copy to Clipboard";
                        }, 5000);
                    });
                }, "image/png");
            };
        },
        downloadQRCode: function() {
            if (!this.qrImage) return;

            let imgTag = this.$refs.qrContainer.querySelector('img');
            if (!imgTag) return;

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            let img = new Image();
            img.crossOrigin = "Anonymous"; 
            img.src = imgTag.src;

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                let link = document.createElement('a');
                link.href = canvas.toDataURL("image/png");
                link.download = 'QRCode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                this.downloadText = "Saved!";
                setTimeout(() => {
                    this.downloadText = "Download QR Code";
                }, 5000);
            };
        }
    }
});
