const 
/**
 * @Object
 * Liste des templates des éléments HTML basiques 
 */
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
  
  /**
   *@Object
   Liste des templates des svgs utilisés dans l'UI
   */
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
  
  /** 
   * @Object
   * Arborescence d'éléments
   * Elément retourné par le module à l'export
   * toutes les opérations du modules sont éffectuées sur cet object 
   */
	Template = { type: "div", enfants: [] }
