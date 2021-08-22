const templates = {
		div: {
			flavor: "Section",
			type: "div",
			className: "element",
		},
		h1: {
			flavor: "Titre",
			type: "h1",
			className: "element",
			innerText: "",
		},
		p: {
			flavor: "Text",
			type: "p",
			className: "element",
			innerText: "",
		},
		a: {
			flavor: "Lien",
			type: "a",
			className: "element",
			href: "#",
			innerText: "",
		},
		img: {
			flavor: "Image",
			type: "img",
			className: "element",
			src: "",
			alt: "",
			style: "",
		},
		ul: {
			flavor: "Liste-ul",
			type: "ul",
			className: "element",
		},
		ol: {
			flavor: "Liste-ol",
			type: "ol",
			className: "element",
		},
		li: {
			flavor: "List Item",
			type: "li",
			className: "element",
			innerText: "",
		},
		form: {
			flavor: "formulaire",
			type: "form",
			className: "element",
		},
		label: {
			flavor: "label",
			type: "label",
			className: "element",
			for: "",
		},
		input: {
			flavor: "field",
			type: "input",
			className: "element",
			value: "",
			name: "",
		},
		button: {
			flavor: "boutton",
			type: "button",
			className: "element btn",
			innerText: "",
		},
	},
	template = {
		type: "div",
		enfants: [],
	},
	svgs = {
		p: {
			type: "i",
			className: "bi bi-paragraph",
		},
		h1: {
			type: "i",
			className: "bi bi-type-h1",
		},
		div: {
			type: "i",
			className: "bi bi-bounding-box-circles",
		},
		img: {
			type: "i",
			className: "bi bi-card-image",
		},
		li: {
			type: "i",
			className: "bi bi-list",
		},
		ul: {
			type: "i",
			className: "bi bi-list-ul",
		},
		ol: {
			type: "i",
			className: "bi bi-list-ol",
		},
		a: {
			type: "i",
			className: "bi bi-link",
		},
	},
	elements = [],
	enfantables = ["div", "ul", "li", "ol", "a"],
	cl = console.log,
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
			for (i in element) {
				let champ = get_template("#form-element")
				label = champ.querySelector("label")
				input = champ.querySelector("input")
				label.for = label.innerHTML = input.id = input.name = i
				input.value = i == "enfants" ? element[i].length : element[i]
				form.prepend(champ)
			}

			render_vue()

			e.stopPropagation()
		})

		classActive && $("#" + classActive).addClass("active")
	},
	delElement = (liste, wanted) => {
		const suppression_recursive_from_elements_list = id => {
				let element_index = elements.findIndex(x => x.id == id)
				if (element_index == -1) return
				let element = elements[element_index]

				enfantables.includes(elements.type) &&
					element.enfants.length &&
					element.enfants.forEach(x => {
						suppression_recursive_from_elements_list(x.id)
					})

				elements.splice(element_index, 1)
			},
			suppression_from_template = (liste, id) => {
				// si l'élément recherché fait partie de la liste, le supprimer et quitter la fonction
				// sinon appeler la fonction sur tous les enfants des elements de la liste
				let liste_index = liste.findIndex(x => x.id == id)
				if (liste_index != -1) {
					liste.splice(liste_index, 1)
					return
				}
				for (element of liste) {
					enfantables.includes(element.type) &&
						element.enfants.length &&
						suppression_from_template(element.enfants, id)
				}
			}

		suppression_recursive_from_elements_list(wanted)
		suppression_from_template(liste, wanted)
	},
	addElement = currentItem => {
		let htmlElement = document.createElement(currentItem.type)

		htmlElement.className = "element"
		htmlElement.id = currentItem.id = Date.now()

		elements.push(currentItem)

		if (!$(".active").length) {
			template.enfants.push(currentItem)
		} else {
			item = elements.find(x => x.id == $(".active")[0].id)
			enfantables.includes(item.type) && item.enfants.push(currentItem)
		}

		$(".vue").off("click")
		$(".vue").on("click", function (event) {
			$(".active").removeClass("active")
			classActive = false
			$("#info").html("")
			event.stopPropagation()
		})
		render_vue()
	},
	checkTemplateElements = template => {
		if (!Array.isArray(template)) return
		for (element of template) {
			elements.push(element)
			enfantables.includes(element.type) &&
				element.enfants.length &&
				checkTemplateElements(element.enfants)
		}
	}

class items {
	constructor(element) {
		this.id
		this.type = element.type
		this.className = element.className
		// this.enfants = []
	}
}

var classActive = ""

$("#update").click(e => {
	element = elements.find(x => x.id == $("input[name=id]").val())
	if ($('[name="type"]').val().includes(" ")) {
		alert("Le type ne peut pas contenir d'espace")
		return
	}

	$("#info input").each(x => {
		if ($("input")[x].name == "enfants" || $("input")[x].name == "id") return
		if ($("input")[x].name == "type") return
		element[$("input")[x].name] = $("input")[x].value
	})
	render_vue()
})

$("#delete").click(e => {
	delElement(template.enfants, $("input[name=id]").val())
	render_vue()
	$("#info").html("")
})

for (i in templates) {
	let element = {
		type: "div",
		id: templates[i].type,
		className: "icon border centered m-1",
		enfants: [],
	}

	svg = { ...svgs[templates[i].type] }
	element.enfants.push(svg)
	element.enfants.push({
		type: "p",
		innerHTML: templates[i].flavor,
	})

	render_element(element, document.querySelector("#elements"))
}

$(".icon").click(e => {
	if (!e.target.classList.contains("icon")) e.target = e.target.closest(".icon")

	let currentItem = { ...templates[e.target.id] }
	if (enfantables.includes(e.target.id)) currentItem.enfants = Array(0)
	delete currentItem.flavor
	addElement(currentItem)
})

$("#preview").click(e => {
	;($(".preview").length && $(".preview").removeClass("preview")) ||
		$(".vue").addClass("preview")
})

document.querySelector("#preview").checked = false

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
