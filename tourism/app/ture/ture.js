class Tura{
    constructor(naziv, opis, duzinaKm, tagovi){
        this.naziv = naziv;
        this.opis = opis;
        this.duzinaKm = duzinaKm;
        this.tagovi = tagovi;
    }
}

let ture = []

function createTureRows() {
    let table = document.querySelector("#body-tabeleTura")
    table.innerHTML = ''
    
    for (let i = 0; i < ture.length; i++) {
        let tr = document.createElement("tr")
      
        let naziv1 = document.createElement("td")
        let duzinaKm1 = document.createElement("td")

        naziv1.textContent = ture[i].naziv
        duzinaKm1.textContent = ture[i].duzinaKm
      
        tr.appendChild(naziv1)
        tr.appendChild(duzinaKm1)
        
        
            tr.addEventListener('click', function() {
                
                displayTureDetails(ture[i])
            
          })

      
      table.appendChild(tr)
      
    }
}  

function initializeTure() {
    //artikli = JSON.parse(localStorage.getItem("artikli") || "[]").map(art => new Artikl(art.naziv, art.cena, art.opis));        
    ture = [
        new Tura ("naziv ture", "opis ture asd", "200km",["tag1", "tag2", "tag3"]),       
        new Tura ("naziv ture1", "opis ture1 dsa", "200km1",["tag1", "tag2", "tag3", "tag3", "tag3", "tag3", "tag3", "tag3", "tag3"])
    ]
    //handleFormSubmission()
    createTureRows()
} 

document.addEventListener('DOMContentLoaded', initializeTure)

function displayTureDetails(ture){
    
    document.getElementById("detalji-info").style.display="block";
    document.getElementById("nazivTure").textContent = ture.naziv;
    let detaljiRows = document.querySelector("#body-tabeleDetalji");
    detaljiRows.innerHTML = '';
    // for (let i = 0; i < detaljiRows.length; i++) {
    //     let row = detaljiRows[i];
    //     if (row.children.length > 1) {
    //         row.children[1].remove();
    //     }
    // }
    
    // let nazivTr = document.createElement("tr");    
    // let nazivTd = document.createElement("td");
    // nazivTd.textContent = ture.naziv;   
    // nazivTr.appendChild(nazivTd)      
    // detaljiRows.appendChild(nazivTr)  

    // ovaj deo mozemo da dodamo ukoliko je potreban naziv unutar tabele


    let duzinaTr = document.createElement("tr");
    let duzinaTd1 = document.createElement("td");
    let duzinaTd = document.createElement("td");
    duzinaTd.textContent = ture.duzinaKm;
    duzinaTd1.setAttribute("class", "detalji-prva-kolona");
    duzinaTd1.textContent = "Duzina puta";
    duzinaTr.appendChild(duzinaTd1)    
    duzinaTr.appendChild(duzinaTd)    
    detaljiRows.appendChild(duzinaTr)  

    let opisTr = document.createElement("tr");
    let opisTd1 = document.createElement("td");    
    let opisTd = document.createElement("td");
    opisTd.textContent = ture.opis;
    opisTd1.setAttribute("class", "detalji-prva-kolona");
    opisTd1.textContent = "Opis:";
    opisTr.appendChild(opisTd1)  
    opisTr.appendChild(opisTd)    
    detaljiRows.appendChild(opisTr)  

    let tagTr = document.createElement("tr");
    let tagTd1 = document.createElement("td");
    let tagTd = document.createElement("td");
    tagTd.textContent = ture.tagovi;
    tagTd1.setAttribute("class", "detalji-prva-kolona");
    tagTd1.textContent = "Tagovi:";
    tagTr.appendChild(tagTd1)    
    tagTr.appendChild(tagTd)    
    detaljiRows.appendChild(tagTr)  

    // let cenaTd = document.createElement("td");
    // cenaTd.textContent = artikl.cena;
    //detaljiRows[1].appendChild(cenaTd);
    
    // let opisTd = document.createElement("td");  
    // let opisArea = document.createElement("textarea");  
    // opisArea.textContent = artikl.opis; 
    // opisArea.disabled =true;
    // opisTd.appendChild(opisArea);
    // detaljiRows[2].appendChild(opisTd);
}