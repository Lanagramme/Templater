class items {
	constructor(type, className, flavor, category) {
		this.id = Date.now()
		this.type = type
		this.className = className
		this.flavor = flavor
		this.style = ""
		this.category = category
	}
}
class enfantables extends items {
	constructor(type, className, flavor, category) {
		super(type, className, flavor, category)
		this.enfants = []
	}
}
class text extends items {
	constructor(type, className, flavor, category) {
		super(type, className, flavor, category)
		this.innerText = ""
	}
}

const 
	categories = [
		"media",
		"formulaire",
		"typography", 
		"basics",
		"layout",
	], 
templates = {
		div: class extends enfantables {
			constructor() {
				super("div", "element", "Section", "layout")
			}
		},
		h1: class extends text {
			constructor() {
				super("h1", "element", "titre", "typography")
				this.priorityMax = 5
				this._priority = 1
			}

			get priority() {
				return this._priority
			}

			set priority(priority) {
				priority = typeof priority == "string" ? priority.trim() : priority
				if (
					+priority == NaN &&
					priority < this.priorityMax + 1 &&
					priority > 0
				) {
					alert("La priorité doit être un chiffre entre 1 et 6")
					return
				}
				if (priority < this.priorityMax + 1) this.type = "h" + priority
			}
		},
		p: class extends text {
			constructor() {
				super("p", "element", "Text", "typography")
			}
		},
		a: class extends text {
			constructor() {
				super("a", "element", "Lien", "basics")
				this.href = "#"
				this.enfants = []
			}
		},
		img: class extends items {
			constructor() {
				super("img", "element", "Image", "media")
				this.src = ""
				this.alt = ""
			}
		},
		ul: class extends enfantables {
			constructor() {
				super("ul", "element", "Liste-ul", "basics")
			}
		},
		ol: class extends enfantables {
			constructor() {
				super("ol", "element", "Liste-ol", "basics")
			}
		},
		li: class extends text {
			constructor() {
				super("li", "element", "Liste Item", "basics")
				this.enfants = []
			}
		},
		form: class extends enfantables {
			constructor() {
				super("form", "element", "Form", "formulaire")
			}
		},
		label: class extends text {
			constructor() {
				super("label", "element", "Label", "formulaire")
				this.for = ""
			}
		},
		input: class extends items {
			constructor() {
				super("input", "element", "Field", "formulaire")
				this.value = ""
				this.name = ""
			}
		},
		button: class extends text {
			constructor() {
				super("button", "element btn", "Button", "basics")
			}
		},
	},
	template = { type: "div", enfants: [] },
	svgs = {
		p: { type: "i", className: "bi bi-paragraph" },
		h1: { type: "i", className: "bi bi-type-h1" },
		div: { type: "i", className: "bi bi-bounding-box-circles" },
		img: { type: "i", className: "bi bi-card-image" },
		li: { type: "i", className: "bi bi-list" },
		ul: { type: "i", className: "bi bi-list-ul" },
		ol: { type: "i", className: "bi bi-list-ol" },
		a: { type: "i", className: "bi bi-link" },
	},
	elements = []

const cl = console.log,
	get_template = selecteur => {
		return document.importNode(document.querySelector(selecteur).content, true)
	},
	render_element = (template, parent) => {
		let element = document.createElement(template.type)

		for (let index in template) {
			if (index == "type") continue
			index == "enfants"
				? template.enfants.forEach(child => render_element(child, element))
				: (element[index] = template[index])
		}

		parent.appendChild(element)
	},
	render_vue = () => {
		$(".vue").html("")
		render_element(template, document.querySelector(".vue"))

		$(".element").off("click")
		$(".element").on("click", e => {
			classActive = e.target.id

			element = elements.find(x => x.id == classActive)
			let form = document.querySelector("form")
			form.innerHTML = ""

			add_field = (i, element) => {
				if (i == "_priority") return
				let champ = get_template("#form-element")
				label = champ.querySelector("label")
				input = champ.querySelector("input")
				label.for = label.innerHTML = input.id = input.name = i
				input.value = i == "enfants" ? element[i].length : element[i]
				form.prepend(champ)
			}

			for (i in element) {
				add_field(i, element)
			}

			add_field("priority", element)
			render_vue()
			e.stopPropagation()
		})

		classActive && $("#" + classActive).addClass("active")
	},
	deleteElement = (liste, wanted_id) => {
		const delete_family_from_elements_list = wanted_id => {
				// si l'élémént recherché est dans la liste des elements, le supprimer avec tous ses enfants
				let element_index = elements.findIndex(x => x.id == wanted_id)
				if (element_index == -1) return
				let element = elements[element_index]

				element.hasOwnProperty("enfants") &&
					element.enfants.length &&
					element.enfants.forEach(x => {
						delete_family_from_elements_list(x.id)
					})

				elements.splice(element_index, 1)
			},
			delete_from_vue_template = (liste, wanted_id) => {
				// si l'élément recherché fait partie de la liste, le supprimer et quitter la fonction
				// sinon appeler la fonction sur tous les enfants des elements de la liste
				let liste_index = liste.findIndex(x => x.id == wanted_id)
				if (liste_index != -1) {
					liste.splice(liste_index, 1)
					return
				}
				liste.forEach(element => {
					element.hasOwnProperty("type") &&
						element.enfants.length &&
						delete_from_vue_template(element.enfants, wanted_id)
				})
			}

		delete_family_from_elements_list(wanted_id)
		delete_from_vue_template(liste, wanted_id)
	},
	addElement = currentItem => {
		elements.push(currentItem)
		;(!$(".active").length && template.enfants.push(currentItem)) ||
			(element.hasOwnProperty("enfants") &&
				elements
					.find(x => x.id == $(".active")[0].id)
					.enfants.push(currentItem))

		render_vue()
	},
	checkTemplateElements = template => {
		if (!Array.isArray(template)) return
		template.forEach(element => {
			elements.push(element)
			element.hasOwnProperty("enfants") &&
				element.enfants.length &&
				checkTemplateElements(element.enfants)
		})
	}

var classActive = ""
document.querySelector("#preview").checked = false

for (i of categories) {
	let element = get_template("#panel-template")

	element.querySelector('.section').id = i
	element.querySelector('p').innerHTML = i

	document.querySelector("#elements").prepend(element)
}

for (i in templates) {
	lmt = new templates[i]()
	let element = {
		type: "div",
		id: lmt.type,
		className: "icon border centered",
		enfants: [],
	}

	svg = { ...svgs[i] }
	element.enfants.push(svg)
	element.enfants.push({
		type: "p",
		innerHTML: lmt.flavor,
	})

	console.log(lmt)
	console.log(`#elements #${lmt.category} .elements`)
	render_element(element, document.querySelector("#elements #"+lmt.category+" .elements"))
}

$(".icon").click(e => {
	if (!e.target.classList.contains("icon")) e.target = e.target.closest(".icon")

	let currentItem = new templates[e.target.id]()
	delete currentItem.flavor
	addElement(currentItem)
})

$("#update").click(e => {
	element = elements.find(x => x.id == $("input[name=id]").val())
	if ($('[name="type"]').val().includes(" ")) {
		alert("Le type ne peut pas contenir d'espace")
		return
	}

	$("#info input").each(x => {
		if (
			$("input")[x].name == "enfants" ||
			$("input")[x].name == "id" ||
			$("input")[x].name == "type"
		)
			return
		element[$("input")[x].name] = $("input")[x].value
	})
	render_vue()
})

$("#delete").click(e => {
	deleteElement(template.enfants, $("input[name=id]").val())
	render_vue()
	$("#info").html("")
})

$("#preview").click(e => {
	;($(".preview").length && $(".preview").removeClass("preview")) ||
		$(".vue").addClass("preview")
})

$("#update").click(e => {
	$("#modal-body .obj  textarea").val(JSON.stringify(template, null, 2))
	document.querySelector("#modal-body .html pre").textContent = decodeURI(
		document.querySelector(".vue").innerHTML
	)
})

$("#import-data").click(e => {
	data = JSON.parse($("#data-to-import").val())
	template.enfants = data.enfants
	elements.length = 0
	checkTemplateElements(template.enfants)
	render_vue()
	$("#close-import").click()
})

$("#empty").click(e => {
	template.enfants.length = 0
	render_vue()
})

$(".vue").click(e => {
	$(".active").removeClass("active")
	classActive = false
	$("#info").html("")
	e.stopPropagation()
})

$('.panel-icon.t2').hide()

$('#toggle-pannel').click(e => {
	$('#elements').toggle()
	$('.panel-icon').toggle()
})