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
