let slider = document.querySelector(".slider");

document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault();
    let y = new Date().getFullYear() - 18;
    document.querySelector("[type='date']").setAttribute("max", `${y}-12-31`)
    document.querySelector("#radioNext").addEventListener("click", function() {
        if (document.querySelectorAll("[type='radio']:checked").length == 3) {
            slider.style = 'transform: translateX(-33.333%)'
        }

    });
    document.querySelector("#geoNext").addEventListener("click", function(e) {
        e.preventDefault();
        let errors = false;
        if (document.querySelector("[name='postal']").value.length < 3 || document.querySelector("[name='postal']").value.length > 10) {
            errors = true;
            alert("Enter correct postal code.");
        }
        if (document.querySelector("[name='street']").value.length < 2) {
            errors = true;
            alert("Enter correct street.");
        }
        if (document.querySelector("[name='city']").value.length < 2) {
            errors = true;
            alert("Enter correct city.");
        }
        if (!errors) {
            slider.style = 'transform: translateX(-66.666%)'
        }

    });
    document.querySelector("#send").addEventListener("click", async function(e) {

        e.preventDefault();
        let rQ = document.querySelectorAll("[type='radio']:checked");

        let owner = rQ[0].value;
        let home_type = rQ[1].value;
        let professional_status = rQ[2].value;

        let firstname = document.querySelector("[name='name']").value;
        let secondname = document.querySelector("[name='secondeName']").value;
        let phone1 = document.querySelector("[name='phone']").value;
        let postcode = document.querySelector("[name='postal']").value;
        let date = document.querySelector("[name='date']").value;

        let email = document.querySelector("[name='email']").value;
        let towncity = document.querySelector("[name='city']").value;
        let street = document.querySelector("[name='street']").value;
        // let subid = document.querySelector("[name='subid']").value;
        let ip = document.querySelector("[name='ip']").value;

        let error = false
        if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            alert("Enter valid email");
            error = true;
        } else if (firstname.length < 2 && secondname < 2) {
            alert("Enter valid name or surname");
            error = true;
        } else if (date == "") {
            alert("Enter date")
            error = true;
        }


        if (!error) {


            date = date.split("-").reverse().join('/');
            let data = {

                'firstname': firstname,
                'lastname': secondname,
                'dob': date,
                'email': email,
                'street1': street,
                'ipaddress': ip,
                'towncity': towncity,
                'postcode': postcode,
                'phone1': phone1,
                'owner': owner,
                'home-type': home_type,
                'professional-status': professional_status,

                // sub1: subid,
            };
            console.log(data);
            let response = await fetch("https://vmpleads.leadbyte.co.uk/restapi/v1.3/leads", {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X_KEY': "7530f7faa0d8578d069d0710efba3320",
                },
                body: JSON.stringify(data),
            })
            let result = await response.json();
            console.log(response);
            console.log(result);
        }
    });
});
// $(document).ready(function() {
//     $(".owl-carousel").owlCarousel({
//         loop: false,
//         nav: true,
//         navText: ["<button type='button' class='owlBack'>Back</button>", "<button type='button' class='owlNext'>Next</button>"],
//         items: 1,
//         margin: 20,
//     });
// });

document.addEventListener("DOMContentLoaded", async function() {
    let ips = document.querySelectorAll("#ip");
    console.log(ips);
    let res = await fetch('https://api.ipify.org/?format=json');
    let data = await res.json();
    console.log(data.ip);
    ips.forEach((ipfild) => {
        ipfild.value = data.ip;
    })

})