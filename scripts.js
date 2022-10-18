"use strict";

let menu;
let menyGrupp;
let filter = "";
let allergiFilter = "";
let sorteringStigande = false;

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function getData() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        menu = response.menu;

        createButtons();
        createNewMenu();
    }
};
xhttp.open("GET", "data.json", true);
xhttp.send();

function createButtons() {
    const btnKött = document.createElement("button");
    btnKött.setAttribute("id", "btnKött");
    btnKött.innerHTML = "Visa kötträtter";
    document.getElementsByClassName("mainCourses")[0].append(btnKött);

    btnKött.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "kött";
        createNewMenu();
    });

    // //skapar testknapp - checkbox
    // const checkbox = document.createElement("input");
    // checkbox.type = "checkbox";
    // checkbox.name = "laktos";
    // checkbox.value = "laktos";
    // checkbox.id = "id";

    // const label = document.createElement("label");
    // label.htmlFor = "id";
    // label.appendChild(document.createTextNode("laktos"));

    // container.appendChild(checkbox);
    // container.appendChild(label);

    // function checkBoxFunction() {
    //     let checkBox = document.getElementById("myCheck");
    //     let text = document.getElementById("text");
    //     if (checkBox.checked == true) {
    //         text.style.display = "block";
    //     } else {
    //         text.style.display = "none";
    //     }
    // }

    // checkBoxFunction();

    const btnFisk = document.createElement("button");
    btnFisk.setAttribute("id", "btnFisk");
    btnFisk.innerHTML = "Visa fiskrätter";
    document.getElementsByClassName("mainCourses")[0].append(btnFisk);

    btnFisk.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "fisk";
        createNewMenu();
    });

    const btnVego = document.createElement("button");
    btnVego.setAttribute("id", "btnVego");
    btnVego.innerHTML = "Visa vegorätter";
    document.getElementsByClassName("mainCourses")[0].append(btnVego);

    btnVego.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "vegetariskt";
        createNewMenu();
    });

    const btnLaktos = document.createElement("button");
    btnLaktos.setAttribute("id", "btnLaktos");
    btnLaktos.innerHTML = "Visa laktosfria rätter";
    document.getElementsByClassName("mainCourses")[0].append(btnLaktos);

    btnLaktos.addEventListener("click", function () {
        menyGrupp.remove();
        allergiFilter = "laktos";
        createNewMenu();
    });

    const btnGluten = document.createElement("button");
    btnGluten.setAttribute("id", "btnGluten");
    btnGluten.innerHTML = "Visa glutenfria rätter";
    document.getElementsByClassName("mainCourses")[0].append(btnGluten);

    btnGluten.addEventListener("click", function () {
        menyGrupp.remove();
        allergiFilter = "gluten";
        createNewMenu();
    });

    const btnPris = document.createElement("button");
    btnPris.setAttribute("id", "btnPris");
    btnPris.innerHTML = "Sortera efter pris";
    document.getElementsByClassName("mainCourses")[0].append(btnPris);

    btnPris.addEventListener("click", function () {
        menyGrupp.remove();

        sorteringStigande = !sorteringStigande;

        if (sorteringStigande) {
            btnPris.innerHTML = "Sortera efter fallande pris";
        } else {
            btnPris.innerHTML = "Sortera efter stigande pris";
        }

        createNewMenu();
    });

    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("id", "btnDelete");
    btnDelete.innerHTML = "Ta bort filter";
    document.getElementsByClassName("mainCourses")[0].append(btnDelete);

    btnDelete.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "";
        allergiFilter = "";
        createNewMenu();
    });
}

function createNewMenu() {
    menyGrupp = document.createElement("div");
    menyGrupp.classList.add("meny-grupp");
    document.getElementById("container").append(menyGrupp);

    let visaMaträtter;

    if (filter === "") {
        visaMaträtter = menu;
    } else {
        visaMaträtter = menu.filter((maträtt) => maträtt.typ === filter);
    }

    if (allergiFilter != "") {
        visaMaträtter = visaMaträtter.filter(function (maträtt) {
            let antalAllergierMaträtter = 0;

            maträtt.allergi.forEach((kontrollMaträtt) => {
                if (kontrollMaträtt === allergiFilter) {
                    antalAllergierMaträtter = antalAllergierMaträtter + 1;
                }
            });

            if (antalAllergierMaträtter > 0) {
                return false;
            } else {
                return true;
            }
        });
    }

    if (!sorteringStigande) {
        visaMaträtter.sort((a, b) => (a.pris < b.pris ? 1 : -1));
    } else {
        visaMaträtter.sort((a, b) => (a.pris > b.pris ? 1 : -1));
    }

    visaMaträtter.forEach((menyData) => {
        const artiklar = document.createElement("div");
        artiklar.classList.add("artiklar");

        let artikelImg = document.createElement("img");
        artikelImg.classList.add("artikel-img");
        artikelImg.src = menyData.imgSrc;
        artikelImg.alt = menyData.alt;
        artiklar.append(artikelImg);

        let artikelText = document.createElement("div");
        artikelText.classList.add("artikel-text");
        artiklar.append(artikelText);

        //ändrade även i CSS till txt -> text
        let menyText = document.createElement("h3");
        menyText.classList.add("meny-text");
        artikelText.append(menyText);

        let artikelNamn = document.createElement("span");
        artikelNamn.classList.add("artikel-namn");
        artikelNamn.innerHTML = menyData.maträtt;
        let artikelPris = document.createElement("span");
        artikelPris.classList.add("artikel-pris");
        artikelPris.innerHTML = menyData.artikelPris;
        menyText.append(artikelNamn, artikelPris);

        let descriptionSwedish = document.createElement("p");
        descriptionSwedish.classList.add("description-swedish");
        descriptionSwedish.innerHTML = menyData.beskrivining;
        artikelText.append(descriptionSwedish);

        let descriptionTitle = document.createElement("span");
        descriptionTitle.classList.add("description-title");
        descriptionTitle.innerHTML = menyData.course;
        artikelText.append(descriptionTitle);

        let descriptionEnglish = document.createElement("p");
        descriptionEnglish.classList.add("description-english");
        descriptionEnglish.innerHTML = menyData.beskrivining;
        artikelText.append(descriptionEnglish);

        menyGrupp.append(artiklar);
    });
}
