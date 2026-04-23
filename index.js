function handleSubmit(event) {
    event.preventDefault();

    let text = document.getElementById("inptxt").value.trim();

    if (text === "") {
        alert("Please enter some text");
        return;
    }

    let qrsrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${text}`;

    let qrimg = document.getElementById("qrimg");
    let downloadBtn = document.getElementById("downloadBtn");

    qrimg.src = qrsrc;
    qrimg.style.display = "block";

    // Set download link
    
    downloadBtn.onclick = function () {
    let format = document.getElementById("format").value;

    fetch(qrsrc)
        .then(res => res.blob())
        .then(blob => {
            let img = new Image();
            img.src = URL.createObjectURL(blob);

            img.onload = function () {
                let canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                let safeText = text.replace(/[^a-z0-9]/gi, "_").toLowerCase();

                let mimeType = format === "png" ? "image/png" : "image/jpeg";

                let link = document.createElement("a");
                link.href = canvas.toDataURL(mimeType);
                link.download = `${safeText}.${format}`;

                link.click();
            };
        });
};
    
    downloadBtn.style.display = "inline-block";
    link.download = `${text}.png`;
}