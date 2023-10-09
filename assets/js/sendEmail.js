function sendMail(contactForm) {
    emailjs.send("service_ipclfkf", "rahlin_cv-site", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "message": contactForm.messagelines.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                // Show a success message in a popup including from_name and from_email
                alert(`Thank you ${contactForm.name.value}. Email has been sent successfully. I will reply as soon as possible to ${contactForm.emailaddress.value}!`);
            },
            function (error) {
                console.log("FAILED", error);
                // Show an error message in a popup
                alert("Failed to send email. Please try again later.");
            }
        );
    return false;  // To block from loading a new page
}