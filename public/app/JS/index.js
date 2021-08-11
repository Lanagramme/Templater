const
	templates= {
		p : {
			flavor: "Paragraph",
			type: "p",
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
			enfants: [],
		},
		h1: {
			flavor: "Titre",
			type : "h1",
			className: "element",
			innerHTML: ""
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
			for (i in element) {
				let champ = get_template('#form-element')
				label = champ.querySelector('label')
				input = champ.querySelector('input')
				label.for =  label.innerHTML =  input.id = input.name = i
				input.value = i == "enfants" ? element[i].length-1 : element[i]
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

				if (element.enfants.length) element.enfants.forEach( x => {
					suppression_recursive_from_elements_list(x.id)
				})

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
					enfants = suppression_from_template(element.enfants, id)
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
		this.enfants = []
	}
}
class h {
	constructor(){
		this.flavor = "Titre"
		this.type  = "h1"
		this.className = ""
		this.innerHTML = ""
	}
	set priority(num) {
		this.type = `h${num}`
	}
}

var classActive = ""

$("#add").click(e=>{
	let currentItem = new items(templates.div)
	addElement(currentItem)
})

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
	// icon = get_template('#case-template')
	// icon.id = i
	// icon.querySelector('h3').innerHTML = templates[i].type
	// icon.querySelector('p').innerHTML = templates[i].flavor
	// $('#elements').append(icon)

	let element = {
		type: "div",
		id: templates[i].type,
		className: "icon border centered",
		enfants: []
	}

	svg = {... svgs[templates[i].type]}

	// element.enfants.push({... svgs[templates[i].type]})
	// element.enfants.push({... cross})
	element.enfants.push(svg)
	element.enfants.push({
		type: 'p',
		innerHTML: templates[i].flavor
	})

	cl({... svgs[templates[i].type]})

	render(element, document.querySelector('#elements'))

}

$('#elements').click(e=>{
	if (!e.target.classList.contains('icon'))
		e.target = e.target.closest('.icon'); 

	let currentItem = new items(templates[e.target.id])
	addElement(currentItem)
})