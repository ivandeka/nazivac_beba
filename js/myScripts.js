
class Config {
	constructor(config = {
			pol: 'bata',
			jezik: 'srpski',
			tipJezika: 'latinica',
			odbrojavanje: '10',
			vremeZaSlovo: '5',
			brojBeba: '10'
		}){
			this.config = config
			this.poljeZaLokal = (this.config.tipJezika)? this.config.jezik + '_' + this.config.tipJezika : this.config.jezik
		}

	izmeniConfig(polje, vrednost){
		(this.config[polje])? this.config[polje] = vrednost : console.log('Polje "' + polje +'" ne postoji. Promena nije izvrsena.')
		console.log('Izmenjen config:', this.config)
		return this.config
	}

	sacuvajConfig(polje, vrednost){
		this.config[polje] = vrednost
		console.log('Sacuvan config:', polje, '>', vrednost)
		return this.config
	}

	vratiConfig(){
		console.log('Trenutni config:', this.config)
		return this.config
	}

	sacuvajPodrazumevaniConfig(polje, vrednost){
		this.config[polje] = vrednost
		new LokalnoSkladiste().napravi(polje, vrednost)
		console.log('Sacuvan podrazumevani config:', polje, '>', vrednost)
		return this.config}

	vratiPodrazumevaniConfig(){
		for (var kljuc of Object.keys(localStorage)){
			this.config[kljuc] = localStorage[kljuc]
		}
		console.log('Podrazumevani config:', this.config)
		return this.config
		// return new Config(this.config)
	}
}


class LokalnoSkladiste {

	vrati(polje=''){
		return (polje === '')? localStorage : localStorage.getItem(polje)
	}

	napravi(polje, vrednost){
		localStorage.setItem(polje, vrednost)
		return localStorage.getItem(polje)
	}

	obrisi(polje){
		return localStorage.removeItem(polje)
	}

	obrisiSve(){
		return localStorage.clear()
	}

}


class Kolacici {  // Odustao si od kolacica, tako da si dzabe ovo pisao :)

	constructor(sesija = 'Session', staza = '/', sameSite = 'Strict'){
		this.standardniDeo = '; expires=' + sesija + '; path=' + staza + '; sameSite=' + sameSite + ';'
	}
	
	vrati(){
		return document.cookie
	}

	vratiOjekat(){
		let a = {}
		let k = document.cookie.replace(/ /g, '')
		if (k !== ''){
			k = k.split(';')
			for (let i = 0; i < k.length; i++){
				var kV = k[i].split('=')
				a[kV[0]] = kV[1]
			}
		}
		return a
	}

	napravi(polje, vrednost){
		let kolacic = polje + '='  + vrednost + this.standardniDeo
		document.cookie = kolacic
		return kolacic
	}

	promeni(polje, vrednost){
		let postojeciKolacic = this.pokupiObjekat()
		if (postojeciKolacic[polje]) {
			this.napravi(polje, vrednost)
		} else { console.log('Ne postoji "' + polje + '" u kolacicu. Promena nije primenjena'); return }
		return this.pokupiObjekat()
	}

	obrisi(polje){
		let postojeciKolacic = this.pokupiObjekat()
		if (postojeciKolacic[polje]) {
			document.cookie = this.napravi(polje, '').replace('expires=', 'expires=Thu, 01 Jan 1970 00:00:00 UTC')
		} else { console.log('Ne postoji "' + polje + '" u kolacicu. Promena nije primenjena'); return }
		return this.pokupiObjekat()
	}
}


class Element {
	constructor (element){
		this.element = element
	}

	obrisiElement(){
		this.element.remove()
	}

	obrisiSvuDecu(){
		while (this.element.firstChild){
			this.element.removeChild(this.element.firstChild)
		}
	}
}

class Jezik {

	constructor(){
		this.inputImena = document.getElementById('unosImena')
		this.dodajImenaDugme = document.getElementById('slanjeImena')
		this.objasnjenje = document.getElementsByClassName('objasnjenje')[0]
		this.dodataImena = document.getElementById('dodataImena')
		this.modalNaslov = document.getElementById('polImena')
		this.levaKolonaNaslov = document.getElementById('levaKolonaNaslov')
		this.obrisiSve = document.getElementById('obrisiSve')
		this.naslov = document.getElementById('naslov')
		this.bata = document.getElementById('bata')
		this.seka = document.getElementById('seka')
		this.dugmeZaModal = document.getElementById('dugmeZaModal')
		this.dugmeZaStart = document.getElementById('create')
		this.zvaceSe = document.getElementById('zvaceSe')
		this.omotacZaJezik = document.getElementsByClassName('omotacZaJezik')
		this.srecko = document.getElementById('srecko')
	}
	ispisiTekst(element, tekst){
		element.innerText = tekst
	}

	vratiTrenutniJezik(){
		const jezik = cfg.config.jezik
		const tipJezika = cfg.config.tipJezika
		const pol = cfg.config.pol
		let r = (tipJezika && tipJezika != "undefined") ? {...jezici[jezik][tipJezika][pol], ...jezici[jezik][tipJezika]} : {...jezici[jezik][pol], ...jezici[jezik]}  // spojio si zbog lakse pretrage objekta
		return r
	}

	popuniSveDivove(){
		const obj = this.vratiTrenutniJezik()
		this.ispisiTekst(this.naslov, obj.naslov)
		new CircleType(this.naslov).radius(640)
		this.ispisiTekst(this.bata, obj.polLevi)
		this.ispisiTekst(this.seka, obj.polDesni)
		this.ispisiTekst(this.dugmeZaModal, obj.modalDugme)
		this.ispisiTekst(this.dugmeZaStart, obj.dugmeZaStart)
		this.ispisiTekst(this.zvaceSe, obj.zvaceSe)
		this.ispisiTekst(this.modalNaslov, obj.modalNaslov)
		this.inputImena.placeholder = obj.inputPlaceholder
		this.ispisiTekst(this.dodajImenaDugme, obj.dodajImenaDugme)
		this.ispisiTekst(this.objasnjenje, obj.inputOjasnjenje)
		this.ispisiTekst(this.dodataImena, obj.dodataImena)
		this.ispisiTekst(this.levaKolonaNaslov, obj.spisak)
		this.ispisiTekst(this.obrisiSve, obj.obrisiSve)
		this.ispisiTekst(this.srecko, obj.srecko)
	}

	izmeniJezik(jezik, pismo){
		cfg.sacuvajConfig('jezik', jezik)
		cfg.sacuvajConfig('tipJezika', pismo)
		console.log('Jezik izmenjen:', jezik, ':', pismo)
		this.popuniSveDivove()
		return cfg
	}

	sacuvajPodrazumevaniJezik(element){
		let e = element.name.split('_')
		let ls = new LokalnoSkladiste()
		ls.napravi('jezik', e[0])
		ls.napravi('tipJezika', e[1])
		for (let rodjak of element.parentElement.children){
			rodjak.classList.remove('oznacena')
			rodjak.src = 'src/favorite-svgrepo-com.svg'
		}
		element.classList.add('oznacena')
		element.src = 'src/favorite-svgrepo-com (1).svg'
	}

	oznaciJezikDiv(e){
		for (let child of e.parentElement.children){child.classList.remove('odabraniJezik')}
		e.classList.add('odabraniJezik')
		this.izmeniJezik(e.firstElementChild.dataset.jezik, e.firstElementChild.dataset.tip)
	}

	paralelniDivSaZvezdicom(indeks){
		this.oznaciJezikDiv(this.omotacZaJezik[indeks])
	}

	zakljucajDrugeDivove(indeks){
		let jezikDivovi = this.omotacZaJezik
		for (let i = 0; i < jezikDivovi.length; i++){
			if (i !== indeks){
				jezikDivovi[i].disabled='true'
			} else {
				jezikDivovi[i].removeAttribute('disabled')
			}
		}
	}

	otkljucajDrugeDivove(indeks){
		let jezikDivovi = this.omotacZaJezik
		for (let i = 0; i < jezikDivovi.length; i++){
			jezikDivovi[i].removeAttribute('disabled')
			if (i === indeks){
				this.oznaciJezikDiv(jezikDivovi[i])
			}
		}
	}

	obrisiPodrazumevaniJezik(element){
		let jezikDivovi = this.omotacZaJezik
		let lS = new LokalnoSkladiste()
		for (let jezikDiv of jezikDivovi){
			jezikDiv.classList.remove('odabraniJezik')
		}
		lS.obrisi('jezik')
		lS.obrisi('tipJezika')
		element.classList.remove('oznacena')
		element.src = 'src/favorite-svgrepo-com.svg'
	}

	startJezikDivova(){
			let podrazumevano = new LokalnoSkladiste()
			let ime = (function(){
				return (podrazumevano.vrati('tipJezika') !== "undefined")? podrazumevano.vrati('jezik') + '_' + podrazumevano.vrati('tipJezika') : podrazumevano.vrati('jezik')
			}())
			try {
				let element = document.getElementsByName(ime)[0]
				element.click();
			} catch(err){}
		
	}

}

var cfg = new Config()		// ODMAH SI INSTANCIRAO!!!
cfg.vratiPodrazumevaniConfig()

var jezik = new Jezik()
jezik.popuniSveDivove()		// ODMAH SI INSTANCIRAO!!!
jezik.startJezikDivova()

class PanelPodesavanja {

	constructor(){
		this.odbrojavanje = document.getElementsByName('odbrojavanje')[0]
		this.vremeZaSlovo = document.getElementsByName('vremeZaSlovo')[0]
		this.brojBeba = document.getElementsByName('brojBeba')[0]
		this.inputi = [this.odbrojavanje, this.vremeZaSlovo, this.brojBeba]
		for (let input of this.inputi){
			input.addEventListener('keydown', function(e){
				if (e.keyCode === 13){
					this.sacuvajPodrazumevanaPodesavanja(e)
					document.activeElement.blur();
				}
			}.bind(this))
		}
		this.dugmence = document.getElementsByClassName('daNe')
		this.panel = document.getElementById('podesavanjaPanel')
		this.stikla = document.getElementById('snimiPodesavanja')
		this.stikla.addEventListener('click', function(e){this.sacuvajPodrazumevanaPodesavanja(e)}.bind(this))
		this.bomba = document.getElementById('otkaziPodesavanja')
		this.bomba.addEventListener('click', function(e){this.vratiNaDefault(e)}.bind(this))
	}

	otvori(e){
		this.trenutnaPodesavanja()
		this.panel.style.right = '0'
		e.style.right = '12rem'
		e.classList.remove('zatvoreno')
		e.classList.add('otvoreno')
		for (let input of this.inputi){
			input.removeAttribute('tabindex')
		}
	}

	zatvori(e){
		setTimeout(function(){
			this.panel.style.right = '-12rem'
			e.classList.remove('otvoreno')
			e.classList.add('zatvoreno')
		}.bind(this), 200)
		this.panel.style.right = '3rem'
		e.style.bottom = '6rem'
		setTimeout(function(){e.style.bottom = '-6rem'}, 100)
		setTimeout(function(){e.style.right = '0'}, 300)
		setTimeout(function(){e.style.bottom = '.5rem'}, 700)
		for (let input of this.inputi){
			input.tabIndex = '-1'
		}
	}

	jezicakHoverIn(e){
		e.firstElementChild.src = 'src/nerd-emoji-svgrepo-com copy.svg'
	}

	jezicakHoverOut(e){
		e.firstElementChild.src = 'src/nerd-emoji-svgrepo-com.svg'
	}

	trenutnaPodesavanja(){
		this.odbrojavanje.value = cfg.config.odbrojavanje
		this.vremeZaSlovo.value = cfg.config.vremeZaSlovo
		this.brojBeba.value = cfg.config.brojBeba
	}

	sacuvajPodrazumevanaPodesavanja(e){
		e.stopImmediatePropagation()
		for(let input of this.inputi){
			if (!parseInt(input.value) || Number(input.value) % 1 !== 0 || Number(input.value) < 0){
				if (input.value === "0"){} else { return }
			}
		}
		for (var i = 0; i < this.inputi.length; i++){
			cfg.sacuvajPodrazumevaniConfig(this.inputi[i].name, this.inputi[i].value)
			}
		this.zatvori(indeks.jezicakPodesavanja)
		let b = new Beba()
		b.obrisiSveBebe()
		b.animirajBebu()
		return cfg.vratiPodrazumevaniConfig()
		
	}

	vratiNaDefault(e){
		e.stopImmediatePropagation()
		let ls = new LokalnoSkladiste()
		ls.obrisi('odbrojavanje')
		ls.obrisi('vremeZaSlovo')
		ls.obrisi('brojBeba')
		let start = new Config()
		cfg.config.odbrojavanje = start.config.odbrojavanje
		cfg.config.vremeZaSlovo = start.config.vremeZaSlovo
		cfg.config.brojBeba = start.config.brojBeba
		this.trenutnaPodesavanja()
		this.zatvori(indeks.jezicakPodesavanja)
		let b = new Beba()
		b.obrisiSveBebe()
		b.animirajBebu()
		return cfg.vratiConfig()
	}

	stiklaBombaHover(element){
		const s = window.getComputedStyle(element)
		const desnoPocetno = Number(s.right.split('px')[0])
		const dolePocetno = Number(s.bottom.split('px')[0])
		const stilovi = ['desno', 'dole']

		const interval = 30

		let titrator = setInterval(function(){
			var izbor = stilovi[Math.floor(Math.random() * stilovi.length)]
			if (izbor === 'desno'){
				element.style.right = `${desnoPocetno + Math.random() * 4}px`
				setTimeout(function(){element.style.right = desnoPocetno}.bind(element), interval / 2)
			} else {
				element.style.bottom = `${dolePocetno + Math.random() * 4}px`
				setTimeout(function(){element.style.bottom = dolePocetno}.bind(element), interval / 2)
			}
		}, interval)
		return [titrator, desnoPocetno, dolePocetno]
	}

}

class OpisBaloncic {

	constructor(){
		this.sX, this.sY, this.cX, this.cY, this.tajmaut
	}

	vratiKoordinate(event){
		this.sX = event.screenX
		this.sY = event.screenY
		this.cX = event.clientX
		this.cY = event.clientY
		return this.sX, this.sY, this.cX, this.cY
	}

	prikaziBaloncic(e){
		if (e.target.dataset.opis) {
			var tajmaut = setTimeout(function(){
				this.napraviBaloncic(e);
			}.bind(this), 1000)
		}
		this.tajmaut = tajmaut
		return tajmaut
	}

	ukloniBaloncic(e){
		clearTimeout(this.tajmaut)
		var baloncic = document.getElementsByClassName('thought')[0]
		if (baloncic){
			baloncic.remove();
		}
	}

	napraviBaloncic(e){
		this.vratiKoordinate(e)
		var vpSirina = window.innerWidth
		var vpVisina = window.innerHeight

		this.cY -= 180

		var div = document.createElement('div')
		var body = document.getElementsByTagName('body')[0]
		div.classList.add('thought')
		div.innerText = jezik.vratiTrenutniJezik()[e.target.dataset.opis]		// ovo moze mnogo bolje
		div.style.top = (this.cY >= vpVisina)? this.cY + 'px' : Math.max(250, this.cY - 50) + 'px'
		div.style.left = (this.cX >= vpSirina / 2)? Math.min(this.cX, vpSirina - 250) + 'px' : Math.max(15, this.cX - 250) + 'px'
		body.appendChild(div)
	}

}

class Modal {

	constructor(){
		this.listaSlika = [
			"src/modal/Artistic-Funny-Drawing-.jpg",
			"src/modal/Chameleon.jpg",
			"src/modal/drawing-kids-wallpapers.800x600.jpg",
			"src/modal/Artistic-Funny-Drawing-.jpg",
			"src/modal/artwork-1607869453909-878.jpg",
			"src/modal/funny-dog-art-17-desktop-wallpaper.jpg"
		]
		this.iksic = document.getElementById("iksic")
		this.modal = document.getElementById("modal")
		this.modalOmotac = document.getElementById("modalWrap")
		this.iksic.addEventListener('click', function(){this.zatvoriModal()}.bind(this))
		this.modalOmotac.addEventListener('click', function(){this.zatvoriModal()}.bind(this))
	}

	otvoriModal(){
	    let randomSlika = this.listaSlika[Math.floor(Math.random() * this.listaSlika.length)]
	    for (let i = 1; i <= 50; i++){
	        setTimeout(function(){
	            this.modal.style.backgroundImage = `url(${randomSlika})`
	            this.modalOmotac.style.display = "block";
	            this.modal.style.display = "block";
	            this.modalOmotac.style.backgroundColor="rgba(0,0,0," + i / 100 + ")"
	            this.modal.style.opacity =i / 50
		    }.bind(this), i * 2)
	    }
	    new PocetnaSlova().ispisiPocetnaSlova();
	    new ListaImena().ispisiPredlozenaImena();
	    new ImenaUSesiru().ispisiImena();
	    new InputZaImena().obrisiInput();
		setTimeout(function(){document.getElementById('unosImena').focus();}, 1)
	}

	zatvoriModal(){
	    this.modalOmotac.style.display = 'none'
	    this.modal.style.display = 'none'
	}

}

class Pol{

	constructor(){
		this.trenutniPol = cfg.config.pol
	}

	vratiPol(){
		console.log('Trenutno izabrani pol:', this.trenutniPol)
		return this.trenutniPol
	}

	izmeniPol(){
		if (this.trenutniPol === 'bata'){
			cfg.config.pol = 'seka'
		} else {
			cfg.config.pol = 'bata'
		}
		console.log('Promenjen pol:', this.trenutniPol, '>', cfg.config.pol)
		this.pomeriKruzic();
		return cfg.config
	}

	ofarbajToggler(){
		if (this.trenutniPol === 'bata'){
			indeks.bataDiv.style.color = '#406abf'
			indeks.sekaDiv.style.color = 'gray'
		} else {
			indeks.bataDiv.style.color = 'gray'
			indeks.sekaDiv.style.color = '#e05281'
		}
	}

	pomeriKruzic(){
		var krug = document.getElementById('krug')
		var start = krug.style.marginLeft
		if (start === '34px'){
			krug.style.marginLeft = '6px'
		} else {
			krug.style.marginLeft = '34px'
		}
	}
}

var indeks = new class Indeks {

	constructor(){

		this.sviElementi = document.all
		for (let element of this.sviElementi){
			if (element.dataset.opis){
				var baloncic = new OpisBaloncic()
				element.addEventListener('mouseenter', function(e){baloncic.prikaziBaloncic(e)})
				element.addEventListener('mouseout', function(e){baloncic.ukloniBaloncic(e)})
				element.addEventListener('click', function(e){baloncic.ukloniBaloncic(e)})
			}
		}
		this.dugmeZaModal = document.getElementById("dugmeZaModal")
		this.dugmeZaModal.addEventListener('click', function(){new Modal().otvoriModal()})

		this.bataDiv = document.getElementById('bata')
		this.sekaDiv = document.getElementById('seka')
		this.svaImena = svaImena
		for (let element of [document.getElementById('create'), document.getElementById('srecko')]){
			element.addEventListener('click', function(){
				if (this.id === 'srecko'){
					new IzvlacenjeImena('srecko').start()
				} else { new IzvlacenjeImena().start() }
			})
		}

		this.zvezdice = document.getElementsByClassName('zvezdica')
		for (let i = 0; i < this.zvezdice.length; i++){
			let zvezdica = this.zvezdice[i]
			zvezdica.addEventListener('click', function(){
				if (!this.classList.contains('oznacena')){
					jezik.sacuvajPodrazumevaniJezik(this)
					jezik.paralelniDivSaZvezdicom(i)
					jezik.zakljucajDrugeDivove(i)
					new MojeKerefeke().dveSenke();
				} else {
					jezik.obrisiPodrazumevaniJezik(this);
					jezik.otkljucajDrugeDivove(i);
				}
			})
		}

		this.jeziciDugmici = document.getElementsByClassName('omotacZaJezik')
		for (let j of this.jeziciDugmici){
			j.addEventListener('click', function(){jezik.oznaciJezikDiv(this); new MojeKerefeke().dveSenke();})
		}

		this.t = document.getElementById('tog')
		this.t.addEventListener('click', function(){
			new Pol().izmeniPol()
			new Pol().ofarbajToggler()
			jezik.popuniSveDivove()
			new MojeKerefeke().dveSenke()
		})

		this.jezicakPodesavanja = document.getElementById('podesavanjaJezicak')
		this.jezicakPodesavanja.addEventListener('click', function(){(this.classList.contains('zatvoreno'))? (function(){new PanelPodesavanja().otvori(this)}.bind(this)()) : new PanelPodesavanja().zatvori(this)})
		this.jezicakPodesavanja.addEventListener('mouseenter', function(){new PanelPodesavanja().jezicakHoverIn(this)})
		this.jezicakPodesavanja.addEventListener('mouseout', function(){new PanelPodesavanja().jezicakHoverOut(this)})



		this.ikonice = document.getElementsByClassName('daNe')
		for (let i = 0, ikonice = this.ikonice; i < this.ikonice.length; i++){
			var t
			var pDesno
			var pDole
			ikonice[i].addEventListener('mouseenter', function(){
				[t, pDesno, pDole] = new PanelPodesavanja().stiklaBombaHover(this);
				let red = document.getElementsByClassName('red')
				for (let i = 0; i < red.length - 1; i++){
					red[i].setAttribute('style', 'filter: blur(2px); transition: ease all .2s;')
				}
				(ikonice[i - 1])? ikonice[i - 1].style.filter = 'blur(2px)' : ikonice[i + 1].style.filter = 'blur(2px)'
			})
			ikonice[i].addEventListener('mouseout', function(){
				let red = document.getElementsByClassName('red')
				for (let i = 0; i < red.length - 1; i++){
					red[i].style.filter = 'blur(0px)'
				}
				(ikonice[i - 1])? ikonice[i - 1].style.filter = 'blur(0px)' : ikonice[i + 1].style.filter = 'blur(0px)'
				clearInterval(t)
				this.style.right = pDesno + 'px'
				this.style.bottom = pDole + 'px'
			})
		}

		window.addEventListener('load', function(){
			preFetch()
			window.location.href + '#wrapper'
			new Pol().ofarbajToggler()
			jezik.startJezikDivova()
			new Beba().animirajBebu()
			new MojeKerefeke().dveSenke()
		})
	}
}

class PocetnaSlova {

	constructor(){
		this.divPocetna = document.getElementById('pocetnaSlova')
	}

	vratiRaspolozivaImena(){
		let jezik = cfg.config.jezik
		let tipJezika = cfg.config.tipJezika
		let pol = cfg.config.pol
		try {
			return indeks.svaImena[jezik][tipJezika][pol]
		} catch(error){
			return indeks.svaImena[jezik][pol]
		}
	}

	vratiPocetnaSlova(){
		let imena = this.vratiRaspolozivaImena()
		let pSlova = new Set()
		for (let i of imena){
			pSlova.add(i[0])
		}
		return pSlova
	}

	ispisiPocetnaSlova(pocetnoSlovo){
		new Element(new PocetnaSlova().divPocetna).obrisiSvuDecu()
		var pocetna = this.vratiPocetnaSlova()
		var prvoSlovo = true
		for (let p of pocetna) {
			var btn = document.createElement('button')
			btn.classList.add('pocetnoSlovo')
			btn.append(p)
			btn.removeAttribute('id')
			if (p === pocetnoSlovo){
				btn.id = 'odabrano'
			} else if (!pocetnoSlovo && prvoSlovo === true) {
					btn.id = 'odabrano'
					prvoSlovo = false
				}
			btn.addEventListener('click', this.oznaciKliknutoSlovo)
			this.divPocetna.appendChild(btn)
		}
	}

	oznaciKliknutoSlovo(){
		let p = new PocetnaSlova()
		new Element(p.divPocetna).obrisiSvuDecu()
		p.ispisiPocetnaSlova(this.innerText)
		new ListaImena().ispisiPredlozenaImena(this.innerText)
	}

}

class ListaImena {

	ispisiPredlozenaImena(){
		const odabrano = document.getElementById('odabrano').innerText
		const imena = new PocetnaSlova().vratiRaspolozivaImena()
		const lista = document.getElementById('predlozenaImena')
		let j = this.predlozenaImena() || ''
		j = j.split(',')
		new Element(lista).obrisiSvuDecu()
		for (let ime of imena){
			if (ime.startsWith(odabrano)){
				let li = document.createElement('li')
				li.classList.add('ime')
				li.innerText = ime
				if (j.includes(ime)){li.classList.add('odabranoIme')}
				li.addEventListener('click', function(){this.oznaciIme(li)}.bind(this))
				lista.appendChild(li)
			}
		}
	}

	predlozenaImena(){
		return new LokalnoSkladiste().vrati(cfg.poljeZaLokal)
	}

	oznaciIme(e){
		if (e.classList.contains('odabranoIme')){
			e.classList.remove('odabranoIme')
			this.izbaciImeIzLokala(e.innerText)

		} else {
			e.classList.add('odabranoIme')
			this.dodajImeULokal(e.innerText)
		}
	}
	
	dodajImeULokal(ime){
		let lS = new LokalnoSkladiste()
		let postojece = lS.vrati(cfg.poljeZaLokal)
		if (postojece){postojece += ',' + ime; lS.napravi(cfg.poljeZaLokal, postojece)} else {lS.napravi(cfg.poljeZaLokal, ime)}
		console.log('Dodao ime:', ime, '>', lS.vrati())
		new ImenaUSesiru().ispisiImena()
	}

	izbaciImeIzLokala(ime){
		let lS = new LokalnoSkladiste()
		let postojece = lS.vrati(cfg.poljeZaLokal)
		postojece = postojece.split(',')
		postojece.splice(postojece.indexOf(ime), 1)
		let dodaj = postojece.join(',')
		if (dodaj === ""){
			lS.obrisi(cfg.poljeZaLokal)
			new Element(document.getElementById('dodataImena')).obrisiSvuDecu()
		} else {
			lS.napravi(cfg.poljeZaLokal, dodaj)
		}
		console.log('Izbacio ime:', ime, '>', lS.vrati())
		new ImenaUSesiru().ispisiImena()
	}

}

class ImenaUSesiru {

	constructor(){
		this.obrisiSve = document.getElementById('obrisiSve')
		this.obrisiSve.addEventListener('click', function(){this.izbaciSvaImena(this.obrisiSve)}.bind(this))
		this.list
	}

	ispisiImena(){
		let dodataImena = new LokalnoSkladiste().vrati(cfg.poljeZaLokal) || ''
		dodataImena = dodataImena.split(',')
		const list = document.getElementById('dodataImena')
		this.list = list
		new Element(list).obrisiSvuDecu()
		jezik.popuniSveDivove()

		for (let ime of dodataImena){
			if (ime === ''){return}
			var li = document.createElement('li')
			var span =  document.createElement('span')
			var span2 = document.createElement('span')
			span.innerText = 'x'
			span.classList.add('beziDesno')
			span.classList.add('brisanje')
			span.addEventListener('click', this.izbaciIme)
			span2.classList.add('leviDeo')
			span2.innerText = ime
			li.classList.add('imeNaListi')
			li.appendChild(span)
			li.appendChild(span2)
			list.appendChild(li)
			list.lastChild.style.paddingBottom = '1rem'
		}
	}

	izbaciIme(){
		let lI = new ListaImena()
		lI.izbaciImeIzLokala(this.nextSibling.innerText)
		lI.ispisiPredlozenaImena()
	}

	izbaciSvaImena(){
		let lS = new LokalnoSkladiste()
		lS.obrisi(cfg.poljeZaLokal)
		new Element(this.list).obrisiSvuDecu()
		new ListaImena().ispisiPredlozenaImena()
		jezik.popuniSveDivove()
	}

	vratiImenaIzSesira(){
		return new LokalnoSkladiste().vrati(cfg.poljeZaLokal)
	}

}

class InputZaImena {

	constructor(){
		this.inputPolje = document.getElementById('unosImena')
		this.dugme = document.getElementById('slanjeImena')
		this.dugme.addEventListener('click', function(){this.dodajImena(this.inputPolje.value)}.bind(this))
		this.inputPolje.addEventListener('keypress', function(e){
			if (e.key === 'Enter'){
				this.dodajImena(this.inputPolje.value)
			}
		}.bind(this))
	}

	dodajImena(str){
		let prethodnoUnetaImena
		try {
			prethodnoUnetaImena = new Set(new LokalnoSkladiste().vrati(cfg.poljeZaLokal).split(','))
		} catch(error){}
		let inputImena = this.inputPolje.value
		inputImena = this.odvajanjeDuplikata(inputImena)
		let imenaZaUpis = (prethodnoUnetaImena)? Array.from(new Set([...prethodnoUnetaImena, ...inputImena])).join(',') : Array.from(inputImena).join(',')
		console.log('Imena u sesiru:', imenaZaUpis)
		new LokalnoSkladiste().napravi(cfg.poljeZaLokal, imenaZaUpis)
		new ListaImena().ispisiPredlozenaImena()
		new ImenaUSesiru().ispisiImena()
		this.obrisiInput()
	}

	odvajanjeDuplikata(ceoString){
		let niz = ceoString.split(',')
		let novo = new Set()
		for (let ime of niz){
			if (ime.trim() !== ''){
				let zaDodavanje = ime.trim()
				zaDodavanje = this.prvaSlovaVelika(zaDodavanje)
				novo.add(zaDodavanje)
			}
		}
		return novo
	}

	prvaSlovaVelika(string){
		var podeljeniString = string.split(' ')
		for (var i = 0; i < podeljeniString.length; i++){
				podeljeniString[i] = podeljeniString[i][0].toUpperCase() + podeljeniString[i].slice(1,)
			}
		return podeljeniString.join(' ')
	}

	obrisiInput(){
		this.inputPolje.value = ''
	}

}

class IzvlacenjeImena {

	constructor(srecko){
		this.bubnjevi = document.getElementById('drumRoll')
		this.bubnjevi = new Audio('src/drum.wav')
		this.bubnjevi.loop = true
		// this.trube = new Audio('src/yeeey.wav')

		this.slova = jezik.vratiTrenutniJezik().azbuka.split(',')
		this.divZaPisanje = document.getElementById('prethodnik')
		this.sledbenik = document.getElementById('sledbenik')

		this.trajanje = cfg.config.vremeZaSlovo * 1000
		
		this.srecko = srecko

	}

	pocniZavrsiBubanj(komanda = 'pocni'){
		if (komanda === 'pocni'){
			this.bubnjevi.play();
		} else { this.bubnjevi.pause(); }
	}

	randomSlovo(){
		return this.slova[Math.floor(Math.random() * this.slova.length)]
	}

	odbrojavanje(){
		const o = cfg.config.odbrojavanje * 1000
		const odKoliko = cfg.config.odbrojavanje
		var t = document.getElementById('timer')
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
				const audio = new Audio('src/beep.wav')
				audio.play();
	        	t.style.display = "block";
	        }, o - (i * 1000));
	        setTimeout(function(){
	        	t.style.display = "none";
	        	new Element(t).obrisiSvuDecu()
	        }, o - (i * 1000 - 500));
	    }
	    return o
	}

	iskucajJednoSlovo(trajanje, finalnoSlovo){
		let interval = setInterval(function(){this.sledbenik.innerText = this.randomSlovo()}.bind(this), 50);
	    setTimeout(function(){
	    	this.divZaPisanje.append(finalnoSlovo);
	    	this.sledbenik.innerText = '';
	    	clearInterval(interval)}.bind(this),
	    	trajanje);
	}

	nasumicnoIme(){
		let imena = new ImenaUSesiru().vratiImenaIzSesira().split(',')
		return imena[Math.floor(Math.random() * imena.length)]
	}

	iskucajIme(){
		var j = 1
		const t = this.trajanje
		const ime = (!this.srecko)? this.nasumicnoIme() : (function(){ let spisak = new PocetnaSlova().vratiRaspolozivaImena(); return spisak[Math.floor(Math.random() * spisak.length)]}())
		for (let i = 0; i < ime.length; i++){
			var q = (i / j) * t
			setTimeout(function(){this.iskucajJednoSlovo(t, ime[i]);}.bind(this), q);
			j += .5
		}
		this.trajanjeIspisivanja = t + q
		return this.trajanjeIspisivanja
	}

	prviKorak(){
		setTimeout(function(){
			this.kraj()
			this.pocniZavrsiBubanj('zavrsi')
		}.bind(this), this.iskucajIme())
		
	}

	drugiKorak(){
		setTimeout(function(){
			this.prviKorak()
			this.pocniZavrsiBubanj('pocni')
		}.bind(this), this.odbrojavanje())
	}

	blokiraj(){
	    setTimeout(function(){document.getElementById('finale').style.boxShadow = 'inset 0 0 300px 20px white'}, 100)
		document.getElementById('finale').style.display = 'block'
	}

	start(){
		let predlozenaImena = new ListaImena().predlozenaImena()
		if ((this.srecko === 'srecko') || (this.srecko !== 'srecko' && predlozenaImena)){
			this.blokiraj()
			let wrapZaDugmice = document.getElementById('wrapZaDugmice')
			console.log(wrapZaDugmice)
			wrapZaDugmice.style.opacity = '0'
			wrapZaDugmice.style.height = '0'
			this.drugiKorak()
		} else {
			(function(){
				alert(jezik.vratiTrenutniJezik().alert);
				new Modal().otvoriModal();
			}())
		}
	}

	kraj(){
		confetti.start()

		new Audio('src/yeeey.wav').play()
		setInterval(function(){new Audio('src/yeeey.wav').play()}, (Math.random() * 2500 + 2000))

		var tekst = document.getElementById('prethodnik')
		var boje = "#FFEE33,#E9D817,#2A009C,#5017E9,#450003,#5C0002,#94090D,#D40D12,#FF1D23,#00305A,#004B8D,#0074D9,#4192D9,#7ABAF2".split(',')
		setInterval(function(){
			var b = boje[Math.floor(Math.random() * boje.length)]
			tekst.style.color = b
		}, 150)
	}

}


class Beba {
	constructor(){
		this.sirinaPolja = window.innerWidth - 300
		this.velicine = [75, 150, 200, 250, 300, 350, 400, 450, 500]
		this.brzine = [0.5, 0.75, 0.9, 0.67, 1, 1.2, 1.5, 2]
		this.velicina = this.velicine[Math.floor(Math.random() * this.velicine.length)]
		this.startnaSirina = Math.floor(Math.random() * this.sirinaPolja)
		this.startnaVisina = -this.velicina
		this.bbWrapper = document.getElementById('bbWrapper')
		this.beba
	}

	napraviBebu(){
		const bb = document.createElement('img')
		bb.src = 'src/bebac.png'
		bb.style.height = this.velicina + 'px'
		bb.style.width = 'auto'
		bb.style.bottom = this.startnaVisina + 'px'
		bb.style.left = this.startnaSirina + 'px'
		bb.classList.add('bebac')
		this.bbWrapper.appendChild(bb)
		this.beba = bb
		return bb
	}

	promeniVisinu(){
		var brzina = this.brzine[Math.floor(Math.random() * this.brzine.length)]
		var bb = this.beba
		bb.style.transition = 'ease all ' + brzina + 's'
		var interval = brzina * 1000
		setInterval(function(){
			bb.style.bottom = this.startnaVisina + Math.floor(Math.random() * this.velicina) + 'px';
		}.bind(this), interval)
		setInterval(function(){
			bb.style.bottom = this.startnaVisina + 'px'
		}, interval)
	}

	obrisiSveBebe(){
		new Element(document.getElementById('bbWrapper')).obrisiSvuDecu()
	}

	animirajBebu(){
		for (let i = 0; i < cfg.config.brojBeba; i++){
			let a = new Beba()
			a.napraviBebu()
			a.promeniVisinu()
		}
	}
}

class MojeKerefeke {

	dveSenke(){
		let izbor = [this.ispisiNaslov, this.ispisiNaslov2]
		izbor[Math.floor(Math.random() * izbor.length)]()
	}

	ispisiNaslov() {
		var nsl = document.getElementById('naslov')
		var senke = []
		var pozadinskaSenka = []
		for (let i = 0; i < 10; i++){
			setTimeout(function(){
				var zaDodavanje = [0 + i, 'px ', 0 - i, 'px 0px white'].join('')
				var poz = [0 + i * 2, 'px ', 0 - i * 2, 'px ', 0 + i, 'px rgb(0,0,0,' + i / 14 + ')']
				senke.push(zaDodavanje)

				var stil = senke.join(',') + ',' + poz.join('')

				nsl.style.textShadow = stil
				nsl.style.top = (-70 + i) + 'px'
				nsl.style.right = (0 + i) + 'px'
			}, i * 50)
		}
	}

	// OVO JE REALISTICNIJA
	ispisiNaslov2() {
		var nsl = document.getElementById('naslov')
		var senke = []
		var pozadinskaSenka = []
		for (let i = 0; i < 10; i++){
			naslov.style.visibility = 'hidden'
			setTimeout(function(){
				if (i != 0){
					naslov.style.visibility = 'visible'
				}
				var zaDodavanje = [0 + i, 'px ', 0 - i, 'px 0px white'].join('')
				var poz = [0 + i * -.5, 'px ', 0 - i * -2.5, 'px ', 0 + i * .2, 'px #00000033'].join('')
				senke.push(zaDodavanje)

				pozadinskaSenka.push(poz)
				var stil = senke.join(',') + ',' + pozadinskaSenka.join(',')

				nsl.style.textShadow = stil
				nsl.style.top = (-70 + i) + 'px'
				nsl.style.right = (0 + i) + 'px'
			}, i * 50)
		}
	}

}


function preFetch(){
	let zaPreFetch = [
		"src/balloons-12.jpg",
		"src/modal/Artistic-Funny-Drawing-.jpg",
		"src/modal/Chameleon.jpg",
		"src/modal/drawing-kids-wallpapers.800x600.jpg",
		"src/modal/Artistic-Funny-Drawing-.jpg",
		"src/modal/artwork-1607869453909-878.jpg",
		"src/modal/funny-dog-art-17-desktop-wallpaper.jpg"
	]

	for (kljuc of Object.keys(crtaniBrojevi)){
		let vrednost = crtaniBrojevi[kljuc]
		zaPreFetch = zaPreFetch.concat(vrednost)
	}

	for (link of zaPreFetch){
		let l =document.createElement('link')
		l.rel = "prefetch"
		l.href = link
		document.head.appendChild(l)
	}
}































