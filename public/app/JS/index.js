const
	templates= {
		p : {
			flavor: "Paragraphe",
			type: "p",
			className: "element",
			innerText: ""
		},
		h1 : {
			flavor: "Titre",
			type: "h1",
			className: "element",
			innerText: ""
		},
		img : {
			flavor: "Image",
			type: "img",
			className: "element",
			src: "",
			alt: ''
		},
		div : {
			flavor: "Section",
			type: "div",
			className: "element",
		}
	},
	template = {
		type:'div',
		enfants:[]
	},
	svgs = {
		p : {
			type: 'i',
			className: 'bi bi-paragraph'
		},
		h1 : {
			type: 'i',
			className: 'bi bi-type-h1'
		},
		div : {
			type: 'i',
			className: 'bi bi-bounding-box-circles'
		},
		img : {
			type: 'i',
			className: 'bi bi-card-image'
		},
	},
	elements = [],
	cl = console.log,
	get_template = (selecteur) => {
		return document.importNode(document.querySelector(selecteur).content, true);
	},
	render = (template, parent) => {
		let element = document.createElement(template.type)
		
		for (let index in template ){
			if (index == 'type')continue
			if (index == 'enfants'){ template.enfants.forEach( child => render( child, element) ) }
			else element[index] = template[index]
		}
		
		parent.appendChild(element)
	},
	rerender =()=>{

		$('.vue').html('')
		render(template, document.querySelector('.vue'))
	
		$('.element').off('click')
		$('.element').on('click', e=>{
			classActive = e.target.id

			element = elements.find(x => x.id == classActive)
			let form = document.querySelector("form")
			form.innerHTML = ""
			cl(element)
			for (i in element) {
				let champ = get_template('#form-element')
				label = champ.querySelector('label')
				input = champ.querySelector('input')
				label.for =  label.innerHTML =  input.id = input.name = i
				input.value = i == "enfants" ? element[i].length : element[i]
				form.prepend(champ)
			}
	
			rerender()
			
			e.stopPropagation()
		})

		if (classActive)
			$('#'+classActive).addClass('active')

	},
	delElement = (liste, wanted) => {
		const 
			suppression_recursive_from_elements_list = (id) => {
				let element_index =  elements.findIndex(x => x.id == id )
				if (element_index == -1) return
				let element = elements[element_index]

				if (elements.type == "div") {
					if (element.enfants.length) element.enfants.forEach( x => {
						suppression_recursive_from_elements_list(x.id)
					})
				}

				elements.splice(element_index, 1); 
			},
			suppression_from_template = (liste, id) => {
		
				let liste_index = liste.findIndex(x => x.id == id )
				if (liste_index != -1) {
					liste.splice(liste_index, 1); 
					return
				}
				for (let i = 0; i < liste.length; i++){
					let element = liste[i]
					if (!element.id) continue
					suppression_from_template(element.enfants, id)
				}
			}

		suppression_recursive_from_elements_list(wanted)
		suppression_from_template(liste,wanted)

	},
	get_facet = (facet) => {
		// return 
		// function creatrice de class
		// pour chaque attribut de la facet créer un attribut du même nom dans l'objet et un setteur veiriant le type de la donnée
		
	},
	addElement = (currentItem) => {
		let htmlElement = document.createElement(currentItem.type)

		htmlElement.className = "element"
		htmlElement.id = currentItem.id = Date.now()

		elements.push(currentItem)

		if (!$('.active').length) {
			template.enfants.push(currentItem)
		}else { 
			item = elements.find(x => x.id == $('.active')[0].id)
			if (item.type == "div")
				item.enfants.push(currentItem)
		}

		$('.vue').off('click')
		$('.vue').on('click', function( event ) {
			$('.active').removeClass('active')
			classActive = false
			$('#info').html('')
			event.stopPropagation();
		})
		rerender()
	}

class items {
	constructor(element){
		this.id
		this.type = element.type
		this.className = element.className
		// this.enfants = []
	}
}

var classActive = ""

$('#update').click(e => {
	element = elements.find(x=>x.id==$('input[name=id]').val())
	$('#info input').each(x => {
		if ($('input')[x].name == 'enfants' || $('input')[x].name == 'id') return
		element[$('input')[x].name] = $('input')[x].value	
	})
	rerender()
})

$('#delete').click(e => {
	delElement(template.enfants, $('input[name=id]').val())
	rerender()
	$('#info').html('')

})

for (i in templates) {
	let element = {
		type: "div",
		id: templates[i].type,
		className: "icon border centered m-2",
		enfants: []
	}

	svg = {... svgs[templates[i].type]}
	element.enfants.push(svg)
	element.enfants.push({
		type: 'p',
		innerHTML: templates[i].flavor
	})

	render(element, document.querySelector('#elements'))
}

$('.icon').click(e=>{
	if (!e.target.classList.contains('icon'))
		e.target = e.target.closest('.icon'); 

	// let currentItem = new items(templates[e.target.id])
	let currentItem = {...templates[e.target.id]}
	if (e.target.id == ("div")) currentItem.enfants = Array(0)
	delete currentItem.flavor
	addElement(currentItem)
})


$('#preview').click(e=>{
	if ( $('.preview').length )
		$(".preview").removeClass('preview')
	else $('.vue').addClass('preview')
})

document.querySelector('#preview').checked = false
