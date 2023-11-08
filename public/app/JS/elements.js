const Elements = {} 

/** 
 * Liste des références des elements actuellement dans le Template
 * regénérée à chaque render
 * l'index d'une référence est l'élément html qu'elle a servi à générer
 */
Elements.list = []

/** 
 * Supprimer un élément du Template
 * @param {Object} liste - The parent of the element to delete 
 * @param {string} wanted_id - The element to delete
*/
Elements.delete = function(){
  if (!$(".active").length){
    alert('Aucun élément sélectionné')
    return
  }

  let elementId = $(".active")[0].id
  let ParentId = document.querySelector('.active').closest('.element').id

  if (!Elements.list.includes(ParentId)) {
    Template.enfants.filter(x => x.id != elementId)
  }
  else {
    let ParentElement = Elements.list[ParentId]
    ParentElement.enfants.filter(x => x.id != elementId)
  }
   render_vue()
}

/**
 * Ajouter un enfant à un élément du Template
 * @param {String} type - type d'élément à créer
 */
Elements.add = function(type){
	let new_element = new templates[type]()
	delete new_element.flavor
  
  if (!$(".active").length )
    Template.enfants.push(new_element)
  else {
    let Parent = Elements.list[$(".active")[0].id]
    if ("enfants" in Parent) Parent.enfants.push(new_element)
    else alert("L'élément actif n'accepte pas d'enfants")
  }
  render_vue()
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

