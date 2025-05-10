class Tura {
    constructor(naziv, opis, duzinaKm, tagovi) {
        this.naziv = naziv;
        this.opis = opis;
        this.duzinaKm = duzinaKm;
        this.tagovi = tagovi;
    }
}

let ture = [];

// Inicijalizacija aplikacije
function inicijalizujTure() {
    // Učitavanje iz localStorage ako postoji
    const sacuvaneTure = localStorage.getItem("ture");
    if (sacuvaneTure) {
        ture = JSON.parse(sacuvaneTure).map(t => new Tura(t.naziv, t.opis, t.duzinaKm, t.tagovi));
    } else {
        // Podrazumevani podaci ako nema localStorage       
        sacuvajTureULocalStorage();
    }
    kreirajRedoveTura();
    posaljiUnosForme();
}

// Čuvanje tura u localStorage
function sacuvajTureULocalStorage() {
    localStorage.setItem("ture", JSON.stringify(ture));
}

// Kreiranje redova u tabeli
function kreirajRedoveTura() {
    let tabela = document.querySelector("#body-tabeleTura");
    tabela.innerHTML = '';
    
    ture.forEach((tura, index) => {
        let tr = document.createElement("tr");
      
        let naziv1 = document.createElement("td");
        let duzinaKm1 = document.createElement("td");

        naziv1.textContent = tura.naziv;
        duzinaKm1.textContent = tura.duzinaKm;
      
        tr.appendChild(naziv1);
        tr.appendChild(duzinaKm1);
        
        tr.addEventListener('click', function() {
            prikaziDetaljeTure(tura);
        });
      
        tabela.appendChild(tr);
    });
}

// Prikaz detalja ture
function prikaziDetaljeTure(tura) {
    document.getElementById("detalji-info").style.display = "block";
    document.getElementById("nazivTure").textContent = tura.naziv;
    let detaljiRedovi = document.querySelector("#body-tabeleDetalji");
    detaljiRedovi.innerHTML = '';
    
    // Dodavanje dužine
    let duzinaTr = document.createElement("tr");
    let duzinaTd1 = document.createElement("td");
    let duzinaTd = document.createElement("td");    
    duzinaTd.textContent = tura.duzinaKm;
    duzinaTd1.setAttribute("class", "detalji-prva-kolona");
    duzinaTd1.textContent = "Dužina puta";
    duzinaTr.appendChild(duzinaTd1);    
    duzinaTr.appendChild(duzinaTd);    
    detaljiRedovi.appendChild(duzinaTr);  

    // Dodavanje opisa sa textarea
    let opisTr = document.createElement("tr");
    let opisTd1 = document.createElement("td");    
    let opisTd = document.createElement("td");
    
    let opisTextarea = document.createElement("textarea");
    opisTextarea.textContent = tura.opis;
    opisTextarea.readOnly = true;
    opisTextarea.className = "details-textarea";
    
    opisTd.appendChild(opisTextarea);
    opisTd1.setAttribute("class", "detalji-prva-kolona");
    opisTd1.textContent = "Opis:";
    opisTr.appendChild(opisTd1);  
    opisTr.appendChild(opisTd);    
    detaljiRedovi.appendChild(opisTr);  

    // Dodavanje tagova sa textarea
    let tagTr = document.createElement("tr");
    let tagTd1 = document.createElement("td");
    let tagTd = document.createElement("td");
    
    tagTd1.setAttribute("class", "detalji-prva-kolona");
    tagTd1.textContent = "Tagovi:";
    tagTr.appendChild(tagTd1);
    
    // Kreiranje textarea za tagove
    const tagTextarea = document.createElement("textarea");
    tagTextarea.textContent = tura.tagovi.join(", ");
    tagTextarea.readOnly = true;
    tagTextarea.className = "details-textarea";
    
    tagTd.appendChild(tagTextarea);
    tagTr.appendChild(tagTd);
    detaljiRedovi.appendChild(tagTr);
}

// Podešavanje forme
function posaljiUnosForme() {
    const forma = document.getElementById("ture-forma");
    forma.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Dobijanje vrednosti iz forme
        const naziv = document.getElementById("name").value;
        const opis = document.getElementById("opis").value;
        const duzinaKm = document.getElementById("duzinaTure").value;
        
        // Dobijanje tagova

        const elementiTagova = document.querySelectorAll(".tag");
        const tagovi = Array.from(elementiTagova).map(tag => 
            tag.textContent.replace("x", "").trim()
        );
        
        // Kreiranje nove Ture
        const novaTura = new Tura(naziv, opis, duzinaKm, tagovi);
        ture.push(novaTura);
        
        // Čuvanje i osvežavanje prikaza
        sacuvajTureULocalStorage();
        kreirajRedoveTura();
        
        // Resetovanje forme
        forma.reset();
        document.getElementById("tagContainer").innerHTML = `
            <input type="text" class="tag-input" id="tagInput" placeholder="Dodaj tag" onkeydown="obradiTaster(event)">
        `;
        
        // Sakrivanje detalja ako su prikazani
        document.getElementById("detalji-info").style.display = "none";
    });
}

// Funkcije za tagove
function obradiTaster(event) {
    const input = event.target;
    const kontejner = document.getElementById('tagContainer');

    if (event.key === 'Enter' && input.value.trim() !== '') {
        event.preventDefault();
        const tekstTaga = input.value.trim();

        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `${tekstTaga} <span onclick="ukloniTag(this)">x</span>`;

        kontejner.insertBefore(tag, input);
        input.value = '';
    }
}

function ukloniTag(span) {
    span.parentElement.remove();
}

function fokusirajInput() {
    document.getElementById('tagInput').focus();
}

// Inicijalizacija kada se DOM učita
document.addEventListener('DOMContentLoaded', inicijalizujTure);