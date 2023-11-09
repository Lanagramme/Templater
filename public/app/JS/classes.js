class items {
	constructor(type, className, flavor, category) {
		this.id = Date.now()
		this.type = type
		this.className = className
		this.flavor = flavor // nom de l'élément dans l'UI d'ajout d'élément
		this.style = ""
		this.category = category // onglet auquel l'élément appartien dans l'UI d'ajout d'élément
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
