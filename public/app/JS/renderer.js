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
	}
