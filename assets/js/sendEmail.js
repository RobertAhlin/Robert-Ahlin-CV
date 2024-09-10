function sendMail(contactForm) {
    emailjs.init("sKLGmElmQrqhdKkiF");
    emailjs.send("service_ipclfkf", "rahlin_cv-site", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "message": contactForm.messagelines.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                alert(`Thank you ${contactForm.name.value}. Email has been sent successfully. I will reply as soon as possible to ${contactForm.emailaddress.value}!`);
            },
            function (error) {
                console.log("FAILED", error);
                alert("Failed to send email. Please try again later.");
            }
        );
    return false;  // To block from loading a new page
}
