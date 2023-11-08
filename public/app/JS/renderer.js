const cl = console.log

/**
 * @function
 * Récupérer un template existant sur la page HTML index.html
 * @param {string} selecteur - querySelecteur du template
 * @returns HTMLElement
 */
function get_template(selecteur){
  return document.importNode(document.querySelector(selecteur).content, true)
}

/**
 * @function
 * Ajoute un élément d'un template au Dom et ajoute ses enfants par récursion
 * @param {Object} template - template json de l'élément à créer
 * @param {HTMLElement} parent - élément html dans lequel sera happend l'élément à créer
 */
function render_element(template, parent){
  let element = document.createElement(template.type)

  for (let index in template) {
    if (index == "type") continue
    index == "enfants"
      ? template.enfants.forEach(child => render_element(child, element))
      : (element[index] = template[index])
  }

  parent.appendChild(element)
  // console.log(template)
  // console.log(template.id)
  // console.log('id' in template)
  if ("id" in template){
    // cl('id', template.id)
    // cl('template', template)
    Elements.list.set(template.id,template)
    // cl(Elements.list)
  }
}

/**
 * @function
 * Ajouter un template au dom
 */
function render_vue() {
  Elements.list.clear()
  $(".vue").html("")
  render_element(Template, document.querySelector(".vue"))

  $(".element").off("click")
  $(".element").on("click", e => {
    classActive = e.target.id

    let element = Elements.find("id",classActive)
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

    cl('here')
    for (i in element) {
      cl(i)
      // add_field(i, element)
    }

    // add_field("priority", element)
    render_vue()
    e.stopPropagation()
  })

  classActive && $("#" + classActive).addClass("active")
}
