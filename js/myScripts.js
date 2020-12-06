
new CircleType(document.getElementById('naslov')).radius(640);


const imena = ['Mlatimud', 'Bradilko', 'Sofronije', 'Alimpije', 'Ćelavko', 'Glavudžovski', 'Čićvu']
const imenaZenska = ['Mlatimudica', 'Bradilka', 'Sofronija', 'Alimpijka', 'Ćelavica', 'Glavudžovska', 'Čićicavu']
const slova = 'A,B,C,Č,Ć,D,Đ,E,F,G,H,I,J,K,L,M,N,O,P,R,S,Š,T,U,V,Z,Ž,a,b,c,č,ć,d,đ,e,f,g,h,i,j,k,l,m,n,o,p,r,s,š,t,u,v,z,ž'.split(',')
var pol = document.getElementById('toggler').value
var startDugme = document.getElementById('create')
var zastavice = document.getElementsByClassName('zastava')
var toggler = document.getElementById('toggler')

var jezikDiv = document.getElementsByClassName('omotacZaJezik')
for (i = 0; i < jezikDiv.length; i++){
	jezikDiv[i].addEventListener('click', promenaJezika)
}

document.getElementById('iksic').addEventListener('click', zatvoriModal);

startDugme.addEventListener('click', function(){
	var pjt = vratiPolJezikTip()
	if (localStorage.getItem(pjt) === null){
		alert(`Za ove parametre ne postoji unet spisak imena!`)
		location.reload();
	}

	iskljuciToggler();
    const dugme = document.getElementById('dugmeZaModal')
    const dugmeZaJezike = document.getElementById('jezici')
    dugme.style.cursor = "not-allowed"
    dugme.onclick = ""
    for (i = 0; i < jezikDiv.length; i++){
    	jezikDiv[i].style.cursor = "not-allowed"
    	jezikDiv[i].removeEventListener('click', promenaJezika)
    }
});
document.getElementById('modalWrap').addEventListener('click', zatvoriModal);

var counter = document.getElementById('cnt');
var t = document.getElementById("timer");

const sledbenik = document.getElementById('sledbenik')
const divZaPisanje = document.getElementById('prethodnik')

function randomSlovo(){
    return slova[Math.floor(Math.random() * slova.length)]
}

function bubnjeviPocni(){
	const bubnjevi = document.getElementById('drumRoll');
	bubnjevi.play();
}

function bubnjeviZavrsi(){
	const bubnjevi = document.getElementById('drumRoll');
	bubnjevi.pause();
}

function slagalica(trajanje, finalnoSlovo){
	for (let i = 0; i < trajanje; i++){
		setTimeout(function(){sledbenik.innerText = randomSlovo()}, i);
	}
    setTimeout(function(){divZaPisanje.append(finalnoSlovo); sledbenik.innerText = ''}, trajanje);
}

function vratiPolJezikTip(){
	var kolacic = document.cookie.replace(/ /g, '').split(';')
	let kolacicObj = {}
	for (var i = 0; i < kolacic.length; i++){
		var a = kolacic[i].split('=')
		var kljuc = a[0]
		var vrednost = a[1]
		kolacicObj[kljuc] = vrednost
	}
	var pol = kolacicObj.pol
	var jezik = kolacicObj.jezik
	var tip = kolacicObj.tipJezika
	tip = (function(){
		if (tip !== 'No'){
			return '_' + tip
		} return ''
	}())
	return pol + '_' + jezik + tip
}

function otkucajIme(trajanjePoSlovu, ime){
	var j = 1
	const t = trajanjePoSlovu * 1000
	for (let i = 0; i < ime.length; i++){
		var q = (i / j) * t
		setTimeout(function(){slagalica(t, ime[i]);}, q);
		j += .5
	}
}

function sve(odakle, poSlovu){
	var item = vratiPolJezikTip()
	var listaImena = JSON.parse(localStorage.getItem(item))
	var pauza = 0
	var ime = listaImena[Math.floor(Math.random() * listaImena.length)]
	for (var i = 1; i <= ime.length; i++){
		pauza += poSlovu / i
	}
	pauza += odakle
	pauza *= 1000
	odbrojavanje(odakle);
	setTimeout(bubnjeviPocni, odakle * 1000);
	setTimeout(function(){otkucajIme(poSlovu, ime);}, odakle * 1000);
	setTimeout(kraj, pauza);
}

function kraj(){
	bubnjeviZavrsi();
	!function (){confetti.start();}();
	for (let i = 0; i < 500000; i += Math.random() * 1500){
		setTimeout(function(){
			var trube = new Audio('src/yeeey.wav');
			trube.play();
		}, i)
	}
	var tekst = document.getElementById('prethodnik')
	var boje = "#FFEE33,#E9D817,#2A009C,#5017E9,#450003,#5C0002,#94090D,#D40D12,#FF1D23,#00305A,#004B8D,#0074D9,#4192D9,#7ABAF2".split(',')
	setInterval(function(){
		var b = boje[Math.floor(Math.random() * boje.length)]
		tekst.style.color = b
	}, 150)
	
}

function odbrojavanje(odKoliko){
	const o = odKoliko * 1000
    for (let i = odKoliko; i > 0; i--){
        setTimeout(function(){
        	t.innerText = i;
			var audio = new Audio('src/beep.wav');
			audio.play();
        	t.style.display = "block";
        }, o - (i * 1000));
        setTimeout(function(){
        	t.style.display = "none";
        }, o - (i * 1000 - 500));
    }
}

function animacija(div){
	const elemenat = document.getElementById(div)
	const brzine = [0.5, 0.75, 0.9, 0.67, 1, 1.2, 1.5,]
	const visinaSlikeNiz = [100, 150, 200, 250, 300, 350, 400, 450]
	const sirinaEkrana = window.innerWidth
	elemenat.style.bottom = "0px"
	var randomVisina = visinaSlikeNiz[Math.floor(Math.random() * visinaSlikeNiz.length)]
	var start = -randomVisina
	elemenat.style.bottom = `${-randomVisina}px`
	elemenat.style.height = `${randomVisina}px`
    var randomHorizontala = Math.floor(Math.random() * window.innerWidth)
    elemenat.style.left = `${randomHorizontala}px`

	setInterval(function(){
		var brzina = brzine[Math.floor(Math.random() * brzine.length)]
		var promenaVisine = Math.floor(Math.random() * start)

		!function gore(){
			elemenat.style.transition = `ease all ${brzina}s`
			elemenat.style.bottom = `${promenaVisine}px`
			setTimeout(function(){
				elemenat.style.bottom = `${start}px`;
				elemenat.style.left = `${randomHorizontala}px`
			}, brzina * 1000)
		}()

}, (Math.random() + .5) * 1000 * 3)}

function napraviBebu(kolicina){
    var spisakIdjeva = []
    for (var i = kolicina; i > 0; i--){
        var bb = document.createElement('img')
        document.body.appendChild(bb)
        bb.src = 'src/bebac.png'
        bb.classList.add('bebac')
        idIme = `${i}-bebonjak`
        bb.id = idIme
        spisakIdjeva.push(idIme)
    }
    return spisakIdjeva
}   


function animirajBebu(kolicina){
    var sviIdjevi = napraviBebu(kolicina);
    sviIdjevi.forEach(animacija);
}

function otvoriModal(){
    const modal = document.getElementById('modal')
    const modalOmotac = document.getElementById('modalWrap')
    prikaziUnetaImena();
	// imenaNaGomili();
	izaberiSlovo();
    for (let i = 1; i <= 100; i++){
        setTimeout(function(){
            modalOmotac.style.display="block";
            modal.style.display="block";
            modalOmotac.style.backgroundColor="rgba(0,0,0," + i / 200 + ")"
            modal.style.backgroundColor="rgba(255,255,255," + i / 100 + ")"
        }, i / 4)
    }
}

function zatvoriModal(){
    const modal = document.getElementById('modal')
    const modalOmotac = document.getElementById('modalWrap')
    modalOmotac.style.display="none";
    modal.style.display="none";
}

function iskljuciToggler(){
    document.getElementById('toggler').disabled="true";
    const slajder = document.getElementsByClassName('slider')[0]
    slajder.style.backgroundColor="gray";
    slajder.style.cursor="not-allowed"
}

function vratiKolacicObjekat(){
	var trenutniKolacic = document.cookie
	var niz = trenutniKolacic.replace(/ /g, '').split(';')
	var kolacicObj = {}
	for (var i = 0; i < niz.length; i++){
		var a = niz[i].split('=')
		var kljuc = a[0]
		var vrednost = a[1]
		kolacicObj[kljuc] = vrednost
	}
	return kolacicObj
}

function dodajImena(){
	var polJezikTip = vratiPolJezikTip()
	var input = document.getElementById('unosImena')
	var string = input.value.replace(/ /g, '')
	try {
		var prethodnaImena = new Set(JSON.parse(localStorage.getItem(polJezikTip).replace(/ /g, '').split(',')))
	} catch(error) {
		var prethodnaImena = new Set()
	}
	var unetaImena = new Set(string.split(','))
	var imena = Array.from(new Set([...prethodnaImena, ...unetaImena]))
	localStorage.setItem(polJezikTip, JSON.stringify(imena))
	input.value = ""
	prikaziUnetaImena();
}


function klikniDaObrisesIme(){
	var sviIksevi = document.getElementsByClassName('brisanje')
	for (var i = 0; i < sviIksevi.length; i++){
		var string = sviIksevi[i].parentElement.firstChild.data
		sviIksevi[i].addEventListener('click', ukloniImenjesce)
	}
}

function ukloniImenjesce(element){
	ukloniIme(this.parentElement.firstChild.data);
	obrisiElement(this.parentElement);
}

function obrisiSvaImena(){
	ukloniIme('');
	otvoriModal();
}

function ukloniIme(string){
	var polJezikTip = vratiPolJezikTip()
	if (string === ''){
		localStorage.removeItem(polJezikTip)
		return
	}
	var imena = JSON.parse(localStorage.getItem(polJezikTip))
	imena.splice(imena.indexOf(string), 1)
	if (imena.length > 0){
		localStorage.setItem(polJezikTip, JSON.stringify(imena))
	} else {
		localStorage.removeItem(polJezikTip)
	}
}

function obrisiElement(element){
	element.remove();
}

function izlistajImena(){
	const staTraziti = vratiPolJezikTip()
	return JSON.parse(localStorage.getItem(staTraziti)) || ''
}


function prikaziUnetaImena(){
	var kolacic = document.cookie.replace(/ /g, '').split(';')
	var imena = izlistajImena()
	const list = document.getElementById('dodataImena')
	removeAllChildNodes(list)

	for (var i = 0; i < imena.length; i++){
		var li = document.createElement('li')
		var span =  document.createElement('span')
		span.innerText = 'x'
		span.classList.add('beziDesno')
		span.classList.add('brisanje')
		li.innerText = imena[i]
		li.classList.add('imeNaListi')
		li.appendChild(span)
		list.appendChild(li)
	}
	klikniDaObrisesIme();
}



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function napraviKolacic(element, izmena){
	const standardniDeo = 'path=/; sameSite=Strict'
	if (document.cookie === ''){
		document.cookie = 'pol=bata; ' + standardniDeo
		document.cookie = 'jezik=srpski; ' + standardniDeo
		document.cookie = 'tipJezika=latinica; ' + standardniDeo
		return
	}
	if (element){
		document.cookie = `${element}=${izmena}; ` + standardniDeo
	}
}

function pozadinaZastavica(element){
	for (i = 0; i < jezikDiv.length; i++){
		jezikDiv[i].classList.remove('odabraniJezik')
	}
	element.classList.add('odabraniJezik')
}

function promenaJezika(element, promena){
	napraviKolacic('jezik', this.firstElementChild.dataset.jezik);
	napraviKolacic('tipJezika', this.firstElementChild.dataset.tip);
	pozadinaZastavica(this);
}

function startnePozicije(){
	var kolacic = vratiKolacicObjekat()
	var bata = document.getElementById('bata')
	var seka = document.getElementById('seka')
	if (kolacic.pol === 'bata'){
		bata.style.color = 'purple'
		seka.style.color = 'rgba(0,0,0,.1)'
	} else {
		seka.style.color = 'purple'
		bata.style.color = 'rgba(0,0,0,.1)'
	}

	for (var i = 0; i < zastavice.length; i++){
		if (zastavice[i].dataset.jezik.includes(kolacic.jezik) && zastavice[i].dataset.tip.includes(kolacic.tipJezika)){
			zastavice[i].parentElement.classList.add('odabraniJezik')
		} else {
			zastavice[i].parentElement.classList.remove('odabraniJezik')
		}
	}
}

function promenaPola(){
    var trenutniKolacic = vratiKolacicObjekat()
    const bata = document.getElementById('bata')
    const seka = document.getElementById('seka')
    if (trenutniKolacic.pol === 'bata'){
        toggler.value = 'seka'
        bata.style.color = 'rgba(0,0,0,.1)'
        seka.style.color = 'purple'
        document.getElementById('polImena').innerText = 'Ženska imena'
        document.getElementById('unosImena').placeholder = 'Na primer: "Matilda, Stanojka,Volica" ...'
        napraviKolacic('pol', 'seka')
    } else {
        toggler.value = 'bata'
        seka.style.color = 'rgba(0,0,0,.1)'
        bata.style.color = 'purple'
        document.getElementById('polImena').innerText = 'Muška imena'
        document.getElementById('unosImena').placeholder = 'Na primer: "Splinter,Donatelo, Leonardo,Mikelanđelo" ...'
        napraviKolacic('pol', 'bata')
    }
}

function vratiPJTImena(){
	var polJezikTip = vratiKolacicObjekat()
	var j = polJezikTip.jezik
	var p = polJezikTip.pol
	var t = polJezikTip.tipJezika
	let spisak = []

	try {
		return svaImena[j][t][p]
	} catch(e) {
		try {
			return svaImena[j][p]
		} catch(error){
			return ''
		}
	}
}

function pocetnaSlova(){
	var imenaZaPJT = vratiPJTImena()
	const lista = document.getElementById('predlozenaImena')
	var divPocetna = document.getElementById('pocetnaSlova')
	removeAllChildNodes(divPocetna)
	const pocetnaSlova = new Set()
	for (var i = 0; i < imenaZaPJT.length; i++){
		pocetnaSlova.add(imenaZaPJT[i][0])
	}
	Array.from(pocetnaSlova).forEach(function(item, index){
		var btn = document.createElement('button')
		btn.classList.add('pocetnoSlovo')
		btn.append(item)
		divPocetna.appendChild(btn)
		if (index === 0){
			btn.id = 'odabrano'
		}
	})
	imenaNaGomili();
}



function izaberiSlovo(){
	pocetnaSlova();
	var pSlova = document.getElementsByClassName('pocetnoSlovo');
	for (var i = 0; i < pSlova.length; i++){
		pSlova[i].addEventListener('click', function(){
			for (var i = 0; i < pSlova.length; i++){
				pSlova[i].removeAttribute('id')
			}
			this.id = 'odabrano'
			imenaNaGomili();
		})
	}
}


function imenaNaGomili(){
	var imenaZaPJT = vratiPJTImena()
	try{
		var s = document.getElementById('odabrano').textContent
	} catch(error){
		pocetnaSlova();
	}
	var lista = document.getElementById('predlozenaImena')
	removeAllChildNodes(lista)
	for (var i = 0; i < imenaZaPJT.length; i++){
		if (imenaZaPJT[i].startsWith(s)) {
			li = document.createElement('li')
			li.classList.add('ime')
			// cb = document.createElement('input')
			// cb.style.float = 'left'
			// cb.type = 'checkbox'
			li.innerText = imenaZaPJT[i]
			// if (li.innerText)
			// li.appendChild(cb)
			lista.appendChild(li)
		}
	}
	ocistiInput();
	operacijeSaCekboksevima();
}

function ocistiInput(){
	document.getElementById('unosImena').value = ''
}

function operacijeSaCekboksevima(){
	var input = document.getElementsByTagName('input')
	var imena = document.getElementsByClassName('ime')
	for (var i = 0; i < imena.length; i++){
		imena[i].addEventListener('click', dodajImeNaSpisak)
	}
}

function dodajImeNaSpisak(){
	var inputPolje = document.getElementById('unosImena')
	if (this.classList.value.includes('odabranoIme')){
		this.classList.remove('odabranoIme')
		inputPolje.value = inputPolje.value.replace(this.innerText, '').replace(',,', ',')
		if (inputPolje.value.endsWith(',')){
			inputPolje.value = inputPolje.value.slice(0, inputPolje.value.length - 1)
		} else if (inputPolje.value.startsWith(',')){
			inputPolje.value = inputPolje.value.slice(1, inputPolje.value.length)
		}
	} else {
		this.classList.add('odabranoIme')
		if (inputPolje.value === '' || inputPolje.value.replace(/ /g, '').endsWith(',')){
			inputPolje.value += this.innerText
		} else {
			inputPolje.value += ',' + this.innerText
		}
	}
}

function oduzmiImeSaSpiska(){
	var inputPolje = document.getElementById('unosImena')
	console.log(this.parentElement.innerText)
}









