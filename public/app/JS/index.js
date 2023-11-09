/**
 * @Array
 * Liste des cétégories d'éléments à pris en charge par le module
 * Utilisée pour la génération de l'UI
 */
const categories = [
  "media",
  "formulaire",
  "typography", 
  "basics",
  "layout",
] 

/**
 * @String 
 * Permettant l'identification de l'élément en cours de modification
 */
var classActive = ""
Elements.Template = { type: "div", enfants: [] }

// Necessaire, mais j'ai oublié pourquoi
document.querySelector("#preview").checked = false

// render pannel d'edition
  for (i of categories) {
    let element = Render.get_template("#panel-template")

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

    svg = { ...templates.svgs[i] }
    element.enfants.push(svg)
    element.enfants.push({
      type: "p",
      innerHTML: lmt.flavor,
    })

    // console.log(lmt)
    // console.log(`#elements #${lmt.category} .elements`)
    Render.element(element, document.querySelector("#elements #"+lmt.category+" .elements"))
  }
// ---
