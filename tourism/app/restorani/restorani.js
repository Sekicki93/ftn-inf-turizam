"use strict"

class Restoran {

    constructor(naziv, opis, tipoviKuhinja) {
        this.naziv = naziv
        this.opis = opis
        this.tipoviKuhinja = tipoviKuhinja
    }


}

let restorani = []

function kreirajRedoveRestorana() {
    let table = document.querySelector("#body-tabeleRestoran")
    table.innerHTML = ''

    for (let i = 0; i < restorani.length; i++) {
        let tr = document.createElement("tr")
        let restoran = restorani[i]
        let naziv = document.createElement("td")
        let opis = document.createElement("td")
        let tipoviKuhinja = document.createElement("td")
        let p = document.createElement("p")
        p.innerHTML = ''
        naziv.textContent = restorani[i].naziv
        opis.textContent = restorani[i].opis
        let tipovi = restoran.tipoviKuhinja
        for (let j = 0; j < tipovi.length; j++) {
            if (j === tipovi.length - 1) {
                p.innerHTML += tipovi[j]
            } else {
                p.innerHTML += tipovi[j] + " "
            }
        }
        tipoviKuhinja.appendChild(p)

        tr.appendChild(naziv)
        tr.appendChild(opis)
        tr.appendChild(tipoviKuhinja)

        tr.addEventListener('click', function () {

            prikaziDetaljeRestorana(restoran)

        })


        table.appendChild(tr)

    }
}

function prikaziDetaljeRestorana(restoran) {
    document.getElementById("detalji-info").style.display = "block";
    let detalji = document.querySelector("#body-tabeleDetalji")
    detalji.innerHTML = ''

    let red = document.createElement("tr")
    let naziv = document.createElement("td")
    let opis = document.createElement("td")
    let tipoviTable = document.createElement("td")

    naziv.textContent = restoran.naziv
    opis.textContent = restoran.opis
    let p = document.createElement("p")
    p.innerHTML = ''
    let tipovi = restoran.tipoviKuhinja
    for (let j = 0; j < tipovi.length; j++) {
        if (j === tipovi.length - 1) {
            p.innerHTML += tipovi[j]
        } else {
            p.innerHTML += tipovi[j] + " "
        }
    }
    tipoviTable.appendChild(p)
    red.appendChild(naziv)
    red.appendChild(opis)
    red.appendChild(tipoviTable)
    detalji.appendChild(red)
}

function inicijalizacijaRestorana() {
    if (localStorage.getItem('restorani') === undefined || localStorage.getItem('restorani') === null) {
        restorani = [
            new Restoran("Taurus", "Restoran sa vrhunskim mesom u Novom Sadu", ["francuska", "domaća", "italijanska"]),
            new Restoran("Kamelot", "Mesto susreta svih pravih vitezova ⚔️🍻", ["španska", "engleska", "domaća"])
        ]
    } else {
        restorani = JSON.parse(localStorage.getItem('restorani'));
    }
    handleFormSubmission()
    kreirajRedoveRestorana()
}

document.addEventListener('DOMContentLoaded', inicijalizacijaRestorana)

function handleFormSubmission() {

    let submitBtn = document.querySelector('#submitBtn')



    submitBtn.addEventListener('click', function () {

        const forma = document.querySelector('#forma')
        const formData = new FormData(forma)

        const naziv = formData.get('naziv')
        const opis = formData.get('opis')
        let tekstTipova = formData.get('tipovi')
        const tipovi = tekstTipova.split(" ")




        const noviRestoran = new Restoran(naziv, opis, tipovi)
        restorani.push(noviRestoran)
        localStorage.setItem('restorani', JSON.stringify(restorani));

        kreirajRedoveRestorana()
    })

}



