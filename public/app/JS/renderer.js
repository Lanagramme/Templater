const cl = console.log
const Render = {}

/**
 * @function
 * Récupérer un template existant sur la page HTML index.html
 * @param {string} selecteur - querySelecteur du template
 * @returns HTMLElement
 */
Render.get_template = function(selecteur){
  return document.importNode(document.querySelector(selecteur).content, true)
}

/**
 * @function
 * Ajoute un élément d'un template au Dom et ajoute ses enfants par récursion
 * @param {Object} template - template json de l'élément à créer
 * @param {HTMLElement} parent - élément html dans lequel sera happend l'élément à créer
 */
Render.element = function (template, parent){
  let element = document.createElement(template.type)

  for (let index in template) {
    if (index == "type") continue
    index == "enfants"
      ? template.enfants.forEach(child => Render.element(child, element))
      : (element[index] = template[index])
  }

  parent.appendChild(element)
  if ("id" in template)
    Elements.list.set(template.id,template)
}

/**
 * @function
 * Ajouter un template au dom
 */
Render.vue = function() {
  Elements.list.clear()
  $(".vue").html("")
  Render.element(Elements.Template, document.querySelector(".vue"))

  $(".element").off("click")
  $(".element").on("click", e => {
    classActive = e.target.id

    let element = Elements.find("id",classActive)
    let form = document.querySelector("#info")
    form.innerHTML = ""

    add_field = (i, element) => {
      if ([ "_priority", "id", "enfants", "preview" ].includes(i)) return
      let champ = Render.get_template("#form-element")
      label = champ.querySelector("label")
      input = champ.querySelector("input")
      label.for = label.innerHTML = input.id = input.name = i
      input.value = i == "enfants" ? element[i].length : element[i]
      form.append(champ)
    }

    for (i in element) {
      add_field(i, element)
    }

    // add_field("priority", element)
    Render.vue()
    e.stopPropagation()
  })

	$("#modalCode textarea").val(JSON.stringify(Elements.Template, null, 2))
	document.querySelector("#modal-body .html pre").textContent = decodeURI(
		document.querySelector(".vue").innerHTML
	)

  classActive && $("#" + classActive).addClass("active")
}
