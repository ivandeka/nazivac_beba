
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
// var trenutniJezik = 'srpski'
// var trenutniTip = 'latinica'
// var trenutniPol = 'bata'



document.getElementById('iksic').addEventListener('click', zatvoriModal);
// document.getElementById('create').addEventListener('click', iskljuciToggler);

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

// var togglerVrednost = document.getElementById("toggler").value
// if (pol === 'bata'){
//     document.getElementById('seka').style.color = 'rgba(0,0,0,.1)'
//     // var rnd_ime = imena[Math.floor(Math.random() * imena.length)]
// } else {
//     document.getElementById('bata').style.color = 'rgba(0,0,0,.1)'
//     // var rnd_ime =  imenaZenska[Math.floor(Math.random() * imenaZenska.length)]
// }

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

	// rnd_ime = Math.floor(Math.random() * listaImena.length)

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
    elemenat.style.left = `${randomHorizontala}px` /* isto donji desni ugao */

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

// function prikaziImena(){
// 	return imena
// }

// function dodajImena(str){
// 	const array = str.replace(/ /g, '').split(',')
// 	for (i in array){
// 		imena.push(array[i]);
// 	}
// 	return imena
// }

// function obrisiImena(str){
// 	const array = str.replace(/ /g, '').split(',')
// 	for (i in array){
// 		imena.splice(imena.indexOf(array[i]), 1)
// 	}
// 	return imena
// }


// function promeniPol(){
//     var toggler = document.getElementById('toggler')
//     if (toggler.value === 'bata'){
//         toggler.value = 'seka'
//         document.getElementById('bata').style.color = 'rgba(0,0,0,.1)'
//         document.getElementById('seka').style.color = 'purple'
//         document.getElementById('polImena').innerText = 'Ženska imena'
//         document.getElementById('unosImena').placeholder = 'Na primer: "Matilda, Stanojka,Volica" ...'
//         rnd_ime =  imenaZenska[Math.floor(Math.random() * imenaZenska.length)]
//     } else {
//         toggler.value = 'bata'
//         document.getElementById('seka').style.color = 'rgba(0,0,0,.1)'
//         document.getElementById('bata').style.color = 'purple'
//         document.getElementById('polImena').innerText = 'Muška imena'
//         document.getElementById('unosImena').placeholder = 'Na primer: "Splinter,Donatelo, Leonardo,Mikelanđelo" ...' 
//         rnd_ime =  imena[Math.floor(Math.random() * imena.length)]
//     }
// }


// function ispisiDodataImena(nizImena){
// 	const list = document.getElementById('dodataImena')
// 	removeAllChildNodes(list)

// 	for (var i = 0; i < nizImena.length; i++){
// 		var li = document.createElement('li')
// 		li.innerText = nizImena[i]
// 		li.classList.add('imeNaListi')
// 		list.appendChild(li)
// 	}
// 	return nizImena
// }

// function procitajKolacic(jezik, pol, tip){
// 	var cookie = document.cookie
// 	var rezultat = {
// 		'ceoKolacic': '',
// 		'staSeTrazi': ''
// 	}
// 	if (tip) {
// 		if (cookie.includes(`${jezik}_${pol}_${tip}`)) {rezultat.ceoKolacic = cookie, rezultat.staSeTrazi = `${jezik}_${pol}_${tip}`;}
// 	} else {
// 		if (cookie.includes(`${jezik}_${pol}`) && jezik !== 'srpski') {rezultat.ceoKolacic = cookie, rezultat.staSeTrazi = `${jezik}_${pol}`} else {console.error('Ovaj jezik MORA da sadrži tip!')}
// 	} return rezultat;
// }

// function napraviKolacic(jezikImena, pol, imena, tipPisma){
// 	if (tipPisma) {
// 		document.cookie = `${jezikImena}_${pol}_${tipPisma}=${imena.replace(/ /g, '')}; expires=Mon, 30 Dec 2030 12:00:00 UTC; path=/; sameSite=Strict`;
// 	} else {
// 		document.cookie = `${jezikImena}_${pol}=${imena.replace(/ /g, '')}; expires=Mon, 30 Dec 2030 12:00:00 UTC; path=/; sameSite=Strict`;
// 	}
// }

// function dodajKolacic(jezik, pol, imena, tipPisma){
// 	if (imena === '' && proveraPraznine !== ''){
// 		console.log('Nije uneto ime. Promena nije izvrsena.')
// 		return
// 	}
// 	const ocitaniKolacici = procitajKolacic(jezik, pol, tipPisma)
// 	var ceoKolacic = ocitaniKolacici.ceoKolacic
// 	var trazeniKolacic = ocitaniKolacici.staSeTrazi
// 	var unetaImena = new Set(imena.replace(/ /g, '').split(','))
// 	if (trazeniKolacic === ''){
// 		unetaImena = Array.from(unetaImena).join()
// 		return napraviKolacic(jezik, pol, unetaImena, tipPisma)
// 	}
// 	var pocetnaImena = (function(){
// 		const nizKolacica = ceoKolacic.replace(/ /g, '').split(';')
// 		for (let i = 0; i < nizKolacica.length; i++){
// 			if (nizKolacica[i].includes(trazeniKolacic)){
// 				const stringImena = nizKolacica[i].split('=')[1]
// 				return new Set(stringImena.split(','))
// 			}
// 		}
// 	}())
// 	var imenaZaDodavanje = Array.from(new Set([...pocetnaImena, ...unetaImena])).join()
// 	return napraviKolacic(jezik, pol, imenaZaDodavanje, tipPisma)
// }

// function ukloniKolacic(jezik, pol, imena, tipPisma){
// 	const ocitaniKolacici = procitajKolacic(jezik, pol, tipPisma)
// 	var ceoKolacic = ocitaniKolacici.ceoKolacic
// 	var trazeniKolacic = ocitaniKolacici.staSeTrazi
// 	var unetaImena = Array.from(new Set(imena.replace(/ /g, '').split(',')))
// 	var pocetnaImena = (function(){
// 		const nizKolacica = ceoKolacic.replace(/ /g, '').split(';')
// 		for (let i = 0; i < nizKolacica.length; i++){
// 			if (nizKolacica[i].includes(trazeniKolacic)){
// 				const stringImena = nizKolacica[i].split('=')[1]
// 				return Array.from(new Set(stringImena.split(',')))
// 			}
// 		}
// 	}())
// 	var imenaZaDodavanje = pocetnaImena.filter(function(item){return !unetaImena.includes(item)}).join()
// 	return napraviKolacic(jezik, pol, imenaZaDodavanje, tipPisma)
// }
	

// var dugmici = document.getElementsByClassName('zastava')
// for (i = 0; i < dugmici.length; i++){
// 	dugmici[i].addEventListener('click', promenaJezika)
// }


// function promenaJezika(){
// 	const kolacic = document.cookie
// 	if (!kolacic.includes('jezik=')){
// 		document.cookie = 'jezik=srpskilatinica; path=/; sameSite=Strict;'
// 	} else {
// 		var jezik = this.dataset.jezik
// 		var tip = this.dataset.tip || ''
// 		document.cookie = `jezik=${jezik + tip}; path=/; sameSite=Strict;`	
// 	}
// }



// function dodajImena(){
// 	var polJezikTip = vratiPolJezikTip()
// 	var input = document.getElementById('unosImena')
// 	var string = input.value
// 	var imena = Array.from(new Set(string.replace(/ /g, '').split(',')))
// 	localStorage.setItem(polJezikTip, JSON.stringify(imena))
// 	input.value = ""
// 	otvoriModal();
// }

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
	var string = input.value

	try {
		var prethodnaImena = JSON.parse(localStorage.getItem(polJezikTip).split(','))
	} catch(error) {
		var prethodnaImena = []
	}
	var unetaImena = Array.from(new Set(string.replace(/ /g, '').split(',')))
	var imena = prethodnaImena.concat(unetaImena)
	localStorage.setItem(polJezikTip, JSON.stringify(imena))
	input.value = ""
	prikaziUnetaImena();
}



function klikniDaObrisesIme(){
	var sviIksevi = document.getElementsByClassName('brisanje')
	console.log(sviIksevi.length)
	for (var i = 0; i < sviIksevi.length; i++){
		var string = sviIksevi[i].parentElement.firstChild.data
		sviIksevi[i].addEventListener('click', ukloniImenjesce)
	}
}

function ukloniImenjesce(element){
	ukloniIme(this.parentElement.firstChild.data);
	obrisiElement(this.parentElement);
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
	// trenutniJezik = this.firstElementChild.dataset.jezik
	// trenutniTip = this.firstElementChild.dataset.tip
	pozadinaZastavica(this);
}

function startnePozicije(){
	var kolacic = vratiKolacicObjekat()
	var bata = document.getElementById('bata')
	var seka = document.getElementById('seka')
	console.log(bata)
	if (kolacic.pol === 'bata'){  /* startna pozicija za toggler */
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

function promenaPola(){{
    var trenutniKolacic = vratiKolacicObjekat()
    if (trenutniKolacic.pol === 'bata'){
        toggler.value = 'seka'
        document.getElementById('bata').style.color = 'rgba(0,0,0,.1)'
        document.getElementById('seka').style.color = 'purple'
        document.getElementById('polImena').innerText = 'Ženska imena'
        document.getElementById('unosImena').placeholder = 'Na primer: "Matilda, Stanojka,Volica" ...'
        // rnd_ime =  imenaZenska[Math.floor(Math.random() * imenaZenska.length)]
        // trenutniPol = 'seka'
        napraviKolacic('pol', 'seka')
    } else {
        toggler.value = 'bata'
        document.getElementById('seka').style.color = 'rgba(0,0,0,.1)'
        document.getElementById('bata').style.color = 'purple'
        document.getElementById('polImena').innerText = 'Muška imena'
        document.getElementById('unosImena').placeholder = 'Na primer: "Splinter,Donatelo, Leonardo,Mikelanđelo" ...' 
        // rnd_ime =  imena[Math.floor(Math.random() * imena.length)]
        // trenutniPol = 'bata'
        napraviKolacic('pol', 'bata')
    }
}
}


// dodajImena('zoran, bradilko', 'bata', 'srpski', 'latinica');
// dodajImena('zorica, kaka, mama, tata', 'seka', 'srpski', 'latinica');
// dodajImena('милорад, мика, жика', 'bata', 'srpski', 'cirilica');
// dodajImena('сенка, марина', 'seka', 'srpski', 'cirilica');
// dodajImena('simon, says', 'bata', 'engleski', '');
// dodajImena('monica, belucci', 'seka', 'engleski', '');



















