
/** 
 * Supprimer un élément du Template
 * @param {Object} liste - The parent of the element to delete 
 * @param {string} wanted_id - The element to delete
*/
function deleteElement(liste, wanted_id) {
    // pour supprimer un élément le supprimer de son parent dans template 
    //  * récupérer le parent le plus proche avec la classe element
    //  * avec l'objet html du parent y accéder dans elements 
    //  * supprimer l'élément de la liste des enfants de son parent
    const 
      delete_family_from_elements_list = wanted_id => {
				// si l'élémént recherché est dans la liste des elements, le supprimer avec tous ses enfants
				let element_index = elements.findIndex(x => x.id == wanted_id)
				if (element_index == -1) return
				let element = elements[element_index]

        "enfants" in element
					&& element.enfants.length
					&& element.enfants.forEach(x => {
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
          "type" in element
            && element.enfants.length
						&& delete_from_vue_template(element.enfants, wanted_id)
				})
			}

		delete_family_from_elements_list(wanted_id)
		delete_from_vue_template(liste, wanted_id)
	}

/**
 * Ajouter un enfant à un élément du template
 * @param {Object} currentItem - item auquel ajouter au template
 */
function addElement( currentItem ) {
    // ajouter un élément à template
    // ajouter ensuite une référence à l'élément dans le weakmap elements
    // la clé de l'élément dans elements est l'élément qu'il html crée dans le preview
    // l'élément sera supprimé d'elements quand le dom sera effacé au rerender
    // à chaque rerender ajouter l'élément rendered dans elements
		elements.push(currentItem)
		;(!$(".active").length && template.enfants.push(currentItem)) ||
			("enfants" in element
				&& elements
					.find(x => x.id == $(".active")[0].id)
					.enfants.push(currentItem))

		render_vue()
	}
	
/**
 * Quelque chose à voir avec l'export,
 * code cassé se réfférer à "index copie.js"
 * @param {Object} template - je ne sais pas, le template à exporter je pense
 */
function checkTemplateElements( template ) {
		if (!Array.isArray(template)) return
		template.forEach(element => {
			elements.push(element)
			"enfants" in element 
        && element.enfants.length
        && checkTemplateElements(element.enfants)
		})
	}

