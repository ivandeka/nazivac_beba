

var pol = document.getElementById('toggler').value
var startDugme = document.getElementById('create')
var zastavice = document.getElementsByClassName('zastava')
var toggler = document.getElementById('toggler')

var jezikDiv = document.getElementsByClassName('omotacZaJezik')
for (i = 0; i < jezikDiv.length; i++){
	jezikDiv[i].addEventListener('click', promenaJezika)
}

document.getElementById('iksic').addEventListener('click', zatvoriModal);





document.getElementById('modalWrap').addEventListener('click', zatvoriModal);

var counter = document.getElementById('cnt');
var t = document.getElementById("timer");

const sledbenik = document.getElementById('sledbenik')
const divZaPisanje = document.getElementById('prethodnik')





function randomSlovo(){
	var pjt = vratiKolacicObjekat()
	var j = pjt.jezik
	var tip = pjt.tipJezika
	try {
		var slova = jezici[j][tip]['azbuka'].split(',')
	} catch(error){
		var slova = jezici[j]['azbuka'].split(',')
	}
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


function sve(odakle, vremePoSlovu){
	var item = vratiPolJezikTip()
	var listaImena = JSON.parse(localStorage.getItem(item))
	var pauza = 0
	var ime = listaImena[Math.floor(Math.random() * listaImena.length)]
	for (var i = 1; i <= ime.length; i++){
		pauza += vremePoSlovu / i
	}
	pauza += odakle
	pauza *= 1000
	odbrojavanje(odakle);
	setTimeout(bubnjeviPocni, odakle * 1000);
	setTimeout(function(){otkucajIme(vremePoSlovu, ime);}, odakle * 1000);
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

// function odbrojavanje(odKoliko){
// 	const o = odKoliko * 1000
//     for (let i = odKoliko; i > 0; i--){
//         setTimeout(function(){
//         	t.innerText = i;
// 			var audio = new Audio('src/beep.wav');
// 			audio.play();
//         	t.style.display = "block";
//         }, o - (i * 1000));
//         setTimeout(function(){
//         	t.style.display = "none";
//         }, o - (i * 1000 - 500));
//     }
// }


function odbrojavanje(odKoliko){
	const o = odKoliko * 1000
    for (let i = odKoliko; i > 0; i--){
        setTimeout(function(){
        	var stringI = i.toString()
        	for (let j = 0; j < stringI.length; j++){
        		var img = document.createElement('img')
        		var listaBrojeva = crtaniBrojevi[Number(stringI[j], 10)]
        		img.src = `${ listaBrojeva[Math.floor(Math.random() * listaBrojeva.length)] }`
        		img.style.height = '500px'
        		img.style.width = 'auto'
        		t.appendChild(img)
        	}
        	// t.innerText = i;
			var audio = new Audio('src/beep.wav');
			audio.play();
        	t.style.display = "block";
        }, o - (i * 1000));
        setTimeout(function(){
        	t.style.display = "none";
        	removeAllChildNodes(t)
        }, o - (i * 1000 - 500));
    }
}

function animacija(div){
	const elemenat = document.getElementById(div)
	const brzine = [0.5, 0.75, 0.9, 0.67, 1, 1.2, 1.5,]
	const visinaSlikeNiz = [100, 150, 200, 250, 300, 350, 400, 450]
	const sirinaEkrana = window.innerWidth - 450
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
	const listaSlika = [
		"src/modal/Artistic-Funny-Drawing-.jpg",
		"src/modal/Chameleon.jpg",
		"src/modal/drawing-kids-wallpapers.800x600.jpg",
		"src/modal/Artistic-Funny-Drawing-.jpg",
		"src/modal/artwork-1607869453909-878.jpg",
		"src/modal/funny-dog-art-17-desktop-wallpaper.jpg"
	]
    const modal = document.getElementById('modal')
    const modalOmotac = document.getElementById('modalWrap')
    var randomSlika = listaSlika[Math.floor(Math.random() * listaSlika.length)]
    prikaziUnetaImena();
	// imenaNaGomili();
	izaberiSlovo();
    for (let i = 1; i <= 100; i++){
        setTimeout(function(){
            modal.style.backgroundImage = `url(${randomSlika})`
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

var dugmeZaDodavanjeImena = document.getElementById('unosImena')
dugmeZaDodavanjeImena.addEventListener('keypress', function(event){
	if (event.keyCode === 13){
		dodajImena();
	}
})

function dodajImena(){
	var polJezikTip = vratiPolJezikTip()
	var input = document.getElementById('unosImena')
	var string = obradiInput(input.value)
	if (string === ''){
		ocistiInput();
		return
	}
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
		// var string = sviIksevi[i].parentElement.firstChild.data
		// console.log(string)
		sviIksevi[i].addEventListener('click', ukloniImenjesce)
	}
	prepoznajDodatoIme();
}

function ukloniImenjesce(){
	ukloniIme(this.parentElement.lastChild.innerText);
	obrisiElement(this.parentElement);
	prepoznajDodatoIme();
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
		var span2 = document.createElement('span')
		span.innerText = 'x'
		span.classList.add('beziDesno')
		span.classList.add('brisanje')
		span2.classList.add('leviDeo')
		span2.innerText = imena[i]
		li.classList.add('imeNaListi')
		li.appendChild(span)
		li.appendChild(span2)
		list.appendChild(li)
	}
	klikniDaObrisesIme();
	prepoznajDodatoIme();
}



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function promeniPodesavanja(element, izmena){
	localStorage.setItem(element, izmena)
}

function startnaPodesavanja(element, izmena){
	if (!localStorage.getItem(element)){
		promeniPodesavanja(element, izmena)
	}
}

function defaultPodesavanja(){
	promeniPodesavanja('odbrojavanje', '10')
	promeniPodesavanja('poSlovu', '5')
	promeniPodesavanja('brojBeba', '10')
}


var sacuvajPodesavanja = document.getElementById('snimiPodesavanja')
	sacuvajPodesavanja.addEventListener('click', snimiPodesavanja)

var odbijPodesavanja = document.getElementById('otkaziPodesavanja')
	odbijPodesavanja.addEventListener('click', function(){
		defaultPodesavanja();
		otvoriZatvori(jezicakPodesavanja);
		setTimeout(function(){location.reload()}, 1000);
	})


var odbrojavanjeElem = document.getElementsByName('odbrojavanje')[0]
var poSlovuElem = document.getElementsByName('vremeZaSlovo')[0]
var brojBebaElem = document.getElementsByName('brojBeba')[0]

for (element of [odbrojavanjeElem, poSlovuElem, brojBebaElem]){
	element.addEventListener('keypress', function(event){
		if (event.keyCode === 13){
			snimiPodesavanja();
		}
	})
}

function snimiPodesavanja(){
	var odbrojavanje = odbrojavanjeElem.value
	var poSlovu = poSlovuElem.value
	var brojBeba = brojBebaElem.value
	
	if (parseInt(odbrojavanje) >= 0 && parseInt(poSlovu) >= 0 && parseInt(brojBeba) >= 0){
		localStorage.setItem('odbrojavanje', odbrojavanje)
		localStorage.setItem('poSlovu', poSlovu)
		localStorage.setItem('brojBeba', brojBeba)
		otvoriZatvori(jezicakPodesavanja)
		animirajBebu(localStorage.getItem('brojBeba'))
		setTimeout(function(){location.reload()}, 1000);
	}
}




function napraviKolacic(element, izmena){
	const standardniDeo = 'path=/; sameSite=Strict'
	const podrazumevani = localStorage.getItem('podrazumevaniJezik')

	if (document.cookie === ''){
		document.cookie = 'pol=bata; ' + standardniDeo
		document.cookie = 'jezik=srpski; ' + standardniDeo
		document.cookie = 'tipJezika=latinica; ' + standardniDeo
		return
	}

	if (podrazumevani){
		document.cookie = `jezik=${podrazumevani.split('_')[0]}; ` + standardniDeo
		document.cookie = `tipJezika=${podrazumevani.split('_')[1] || 'nema'}; ` + standardniDeo
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
	window.location.reload();
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
        napraviKolacic('pol', 'seka')
    } else {
        toggler.value = 'bata'
        seka.style.color = 'rgba(0,0,0,.1)'
        bata.style.color = 'purple'
        napraviKolacic('pol', 'bata')
    }
    console.log(trenutniKolacic.pol)
    window.location.reload();
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
			li.innerText = imenaZaPJT[i]
			lista.appendChild(li)
		}
	}
	prepoznajDodatoIme();
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
	prepoznajDodatoIme();
	dodajImena();
}

function prepoznajDodatoIme(){
	var pjt = vratiPolJezikTip()
	var lista = JSON.parse(localStorage.getItem(pjt))
	var imena = document.getElementsByClassName('ime')
	if (lista !== null){
		for (var i = 0; i < imena.length; i++){
			imena[i].classList.remove('odabranoIme')
			if (lista.includes(imena[i].innerText)){
				imena[i].classList.add('odabranoIme')
			}
		}
	} else {
		for (var i = 0; i < imena.length; i++){
			imena[i].classList.remove('odabranoIme')
		}
	
	}
}



function oduzmiImeSaSpiska(){
	var inputPolje = document.getElementById('unosImena')
	console.log(this.parentElement.innerText)
}


function ispisiTekst(imePolja){
	var pjt = vratiKolacicObjekat()
	const pol = pjt.pol
	const jezik = pjt.jezik
	const tip = pjt.tipJezika
	try {
		return jezici[jezik][tip][pol][imePolja]
	} catch(error){
		return jezici[jezik][pol][imePolja]
	}
}

function opisTekst(imePolja) {
	var pjt = vratiKolacicObjekat()
	var jezik = pjt.jezik
	var tip = pjt.tipJezika
	try {
		return jezici[jezik][tip][imePolja]
	} catch(error){
		return jezici[jezik][imePolja]
	}
}


function izmeniJezik(){
	var bla = document.getElementsByClassName('omotacZaJezik')
	for (var i = 0; i < bla.length; i++){
		bla[i].addEventListener('click', window.location.reload)
	}
}


function izmeniNaslov(tekst){
	var naslovNiz = document.getElementById('naslov').firstChild
	console.log(naslovNiz)
}


function menjanjeTekstaJezika(){
	document.getElementById('bata').innerText = ispisiTekst('polLevi')
	document.getElementById('seka').innerText = ispisiTekst('polDesni')
	document.getElementById('naslov').innerText = ispisiTekst('naslov')
	new CircleType(document.getElementById('naslov')).radius(640);
	document.getElementById('dugmeZaModal').innerText = ispisiTekst('modalDugme')
	document.getElementById('create').innerText = ispisiTekst('dugmeZaStart')
	document.getElementById('zvaceSe').innerText = ispisiTekst('zvaceSe')
	document.getElementById('polImena').innerText = ispisiTekst('modalNaslov')
	document.getElementById('unosImena').placeholder = ispisiTekst('inputPlaceholder')
	document.getElementsByClassName('objasnjenje')[0].innerText = ispisiTekst('inputOjasnjenje')
	document.getElementById('levaKolonaNaslov').innerText = ispisiTekst('spisak')
	document.getElementById('slanjeImena').innerText = ispisiTekst('dodajImenaDugme')
	document.getElementById('obrisiSve').innerText = ispisiTekst('obrisiSve')
	document.getElementById('unosImena').title = ispisiTekst('inputBaloncic')
}

function procistiString(string, gdeSeDeli=','){
	var procisceniString = string.split(gdeSeDeli)
	var noviString = (function(){
		let a = []
		for (var i = 0; i < procisceniString.length; i++){
			if (procisceniString[i].trim() != ''){
				a.push(procisceniString[i].trim())
			}
		} return a.join(gdeSeDeli)
	}
	())
	return noviString
}

function prvaSlovaVelika(string){
	var podeljeniString = string.split(' ')
	for (var i = 0; i < podeljeniString.length; i++){
			podeljeniString[i] = podeljeniString[i][0].toUpperCase() + podeljeniString[i].slice(1,)
		}
	return podeljeniString.join(' ')
}



function obradiInput(punString, razdelnik=','){
	var procisceniString = procistiString(punString)
	var nizOdStringa = procisceniString.split(razdelnik)
	var noviNiz = []
	try {
		for (var i = 0; i < nizOdStringa.length; i++){
			noviNiz.push(prvaSlovaVelika(nizOdStringa[i]))
		}
	} catch(error){

	}
	return noviNiz.join(razdelnik)
}


var jezicakPodesavanja = document.getElementById('podesavanjaJezicak')
	jezicakPodesavanja.addEventListener('mouseenter', function(){
		this.firstElementChild.src = 'src/nerd-emoji-svgrepo-com copy.svg'
	})
	jezicakPodesavanja = document.getElementById('podesavanjaJezicak')
	jezicakPodesavanja.addEventListener('mouseout', function(){
		this.firstElementChild.src = 'src/nerd-emoji-svgrepo-com.svg'
	})
	jezicakPodesavanja.addEventListener('click', function(){otvoriZatvori(jezicakPodesavanja)})

function otvoriZatvori(e){
	document.getElementsByName('odbrojavanje')[0].value = localStorage.odbrojavanje
	document.getElementsByName('brojBeba')[0].value = localStorage.brojBeba
	document.getElementsByName('vremeZaSlovo')[0].value = localStorage.poSlovu

	if (e.classList[0] === 'otvoreno'){
		var panel = document.getElementById('podesavanjaPanel')
		e.style.right = '15rem'
		panel.style.right = '5rem'
		setTimeout(function(){
			e.style.right = '0rem'
			panel.style.right = '-12rem'
		}, 500)
		
		e.classList.remove('otvoreno')
		e.classList.add('zatvoreno')
	}
		else {
		var panel = document.getElementById('podesavanjaPanel')
		e.style.right = '12rem'
		panel.style.right = '0rem'
		e.classList.remove('zatvoreno')
		e.classList.add('otvoreno')}
	}




var titrator

sacuvajPodesavanja.addEventListener('mouseenter', drmusanje)
sacuvajPodesavanja.addEventListener('mouseout', function(){clearInterval(titrator)})
odbijPodesavanja.addEventListener('mouseover', drmusanje)
odbijPodesavanja.addEventListener('mouseout', function(){clearInterval(titrator)})

function drmusanje(){
	const s = window.getComputedStyle(this)
	const desnoPocetno = Number(s.right.split('px')[0])
	const dolePocetno = Number(s.bottom.split('px')[0])
	const stilovi = ['desno', 'dole']

	const interval = 50

	titrator = setInterval(function(){
		var izbor = stilovi[Math.floor(Math.random() * stilovi.length)]
		if (izbor === 'desno'){
			this.style.right = `${desnoPocetno + Math.random() * 3}px`
			setTimeout(function(){this.style.right = desnoPocetno}.bind(this), interval / 2)
		} else {
			this.style.bottom = `${dolePocetno + Math.random() * 3}px`
			setTimeout(function(){this.style.bottom = dolePocetno}.bind(this), interval / 2)
		}
	}.bind(this), interval)
}


window.addEventListener('load', (function(){
	napraviKolacic();
	startnaPodesavanja('odbrojavanje', '10');
	startnaPodesavanja('poSlovu', '5');
	startnaPodesavanja('brojBeba', '10');
	menjanjeTekstaJezika();
	startnePozicije();
	animirajBebu(Number(localStorage.getItem('brojBeba')));
	zakljucajOstale();
}))

startDugme.addEventListener('click', function(){
	var pjt = vratiPolJezikTip()
	if (localStorage.getItem(pjt) === null){
		alert(ispisiTekst('alert'))
		return
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
    sve(Number(localStorage.getItem('odbrojavanje')), Number(localStorage.getItem('poSlovu')));
    this.disabled=true;
    this.innerText=ispisiTekst('dugmeZaStartNeaktivno')
});


var zvezdice = document.getElementsByClassName('zvezdica')
for (zvezdica of zvezdice){
	if (localStorage.podrazumevaniJezik && zvezdica.name === localStorage.getItem('podrazumevaniJezik')){
		zvezdica.classList.add('oznacena')
		zvezdica.src='src/favorite-svgrepo-com (1).svg'
	}
	zvezdica.addEventListener('click', oznaciZvezdicu)
}


function oznaciZvezdicu(){
	if (this.classList[1] === 'oznacena'){
		this.classList.remove('oznacena')
		localStorage.removeItem('podrazumevaniJezik')
		location.reload();
		return
	}

	for (zvezdica of zvezdice){zvezdica.classList.remove('oznacena'); zvezdica.src='src/favorite-svgrepo-com.svg';}
	this.src = 'src/favorite-svgrepo-com (1).svg'
	this.classList.add('oznacena')
	promeniPodesavanja('podrazumevaniJezik', this.name)
	postaviPodrazumevaniJezik();
	location.reload()
}


function postaviPodrazumevaniJezik(){
	const jezikTip = localStorage.getItem('podrazumevaniJezik')
	const jezik = jezikTip.split('_')[0]
	const tip = jezikTip.split('_')[1] || 'nema'
	napraviKolacic('jezik', jezik)
	napraviKolacic('tipJezika', tip)
}


function zakljucajOstale(element){
	if (localStorage.getItem('podrazumevaniJezik')) {
		var sve = document.getElementsByClassName('omotacZaJezik')
		for (dugme of sve){
			if (dugme.classList[1] === 'odabraniJezik'){
				dugme.removeAttribute('disabled')
			} else {
				dugme.disabled = 'true'
			}
		}
	}
}

var opisB
var sX
var sY
var cX
var cY

function opisBaloncici(){
	if (this.dataset.opis) {
		opisB = setTimeout(function(){
			napraviBaloncic(this);

		}.bind(this), 1000)
	}
}


const sviElementi = document.all
	for (element of sviElementi){
		if (element.dataset.opis){
		element.addEventListener('mouseover', function(e){vratiKoordinate(e)})
		element.addEventListener('mouseover', opisBaloncici)
		element.addEventListener('mouseout', function(){
				window.clearTimeout(opisB)
				var baloncic = document.getElementsByClassName('thought')[0]
				if (baloncic){
					baloncic.remove();
				}
			})
		}}


function napraviBaloncic(e){
	var vpSirina = window.innerWidth
	var vpVisina = window.innerHeight

	cY -= 180

	var div = document.createElement('div')
	var body = document.getElementsByTagName('body')[0]
	div.classList.add('thought')
	div.innerText = opisTekst(e.dataset.opis)
	div.style.top = (cY >= vpVisina)? cY + 'px' : Math.max(250, cY) + 'px'
	div.style.left = (cX >= vpSirina / 2)? Math.min(cX, vpSirina - 250) + 'px' : Math.max(15, cX - 250) + 'px'
	body.appendChild(div)
}


function vratiKoordinate(event){
	sX = event.screenX
	sY = event.screenY
	cX = event.clientX
	cY = event.clientY
	return sX, sY, cX, cY
}





















