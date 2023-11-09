const Elements = {} 

/** 
 * @Object
 * Arborescence d'éléments
 * Elément retourné par le module à l'export
 * toutes les opérations de Elements ont pour but de modifier cet objet
 * Affectation initiale dans index.js
 */
Elements.Template = {}

/** 
 * Liste indexée de références aux elements actuellement dans Template
 * l'index d'une référence est l'élément html qu'elle a servi à générer
 * regénérée à chaque render
 */
Elements.list = new Map()

/**
 * @Function
 * Implementation de Array.find() pour le map Elements.list
 * renvoie le premier élément dont la valeur {propriété} à pour value {value}
 * renvoie false si aucun élément ne valide le filtre
 * @param {String} property - propriété servant de filtre
 * @param {String} value - valeur de validation du filtre 
 * @returns (Object|false)
 */
Elements.find = function(property, value){
  let found = false
  Elements.list.forEach(x => {
    if (+value != NaN && x[property] == +value) {found = x ; return} 
    if (x[property] == value) {found = x ; return}
  })
  return found
}
/** 
 * @Function
 * Supprimer un élément du Template
 * @param {Object} liste - The parent of the element to delete 
 * @param {string} wanted_id - The element to delete
*/
Elements.delete = function(){
  cl('====== ====== ======')
  cl('delete')
  if (!$(".active").length){
    alert('Aucun élément sélectionné')
    return
  }

  let elementId = $(".active")[0].id
  let ParentId = document.querySelector('.active').parentNode.id


  if (!Elements.list.has(+ParentId)) {
    Elements.Template.enfants=Elements.Template.enfants.filter(x => x.id != elementId)
  }
  else {
    let Parent = Elements.list.get( +ParentId )
    Parent.enfants = Parent.enfants.filter(x => x.id != elementId)
    Elements.list.set(+ParentId,Parent)
    // Parent = Elements.list.get( ParentId )
    // cl(Parent)
  }
   Render.vue()
}

/**
 * @Function
 * Ajouter un enfant à un élément du Template
 * @param {String} type - type d'élément à créer
 */
Elements.add = function(type){
	let new_element = new templates[type]()
	delete new_element.flavor
  
  if (!$(".active").length )
    Elements.Template.enfants.push(new_element)
  else {
    let Parent = Elements.list.get( +$(".active")[0].id )
    if ("enfants" in Parent) Parent.enfants.push(new_element)
    else alert("L'élément actif n'accepte pas d'enfants")
  }
  Render.vue()
}
	
/**
 * Quelque chose à voir avec l'export,
 * Broken, se réfférer à "index copie.js"
 * @param {Object} template - je ne sais pas, le template à exporter je pense
 */
function checkTemplateElements( template ) {
		if (!Array.isArray(template)) return
		template.forEach(element => {
			Elements.list.push(element)
			"enfants" in element 
        && element.enfants.length
        && checkTemplateElements(element.enfants)
		})
	}

