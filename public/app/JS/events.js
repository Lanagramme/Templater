/**
 * Élement de l'UI, pannel des éléments. 
 * Cliquer sur une icone permet d'ajouter un'élément au template
 */
$(".icon").click(e => {
	if (!e.target.classList.contains("icon")) 
    e.target = e.target.closest(".icon")
	Elements.add(
    e.target.id, 
    $(".active").length, 
    $(".active").length && $(".active")[0].id || false 
  )
})

/**
 * Element de l'ui, pannel d'édition
 * Boutton de mise à jour d'un élément
 */
$("#update").click(e => {
  let id = $(".active")[0].id
	$("#info input").each(x => {
		if (
			$("input")[x].name == "enfants" ||
			$("input")[x].name == "id" ||
			$("input")[x].name == "type"
		) return
    Elements.update(
      id, 
      $("input")[x].name, 
      $("input")[x].value
    )
	})
	Render.vue()
})

/**
 * Element de l'ui, pannel d'édition
 * Boutton de suppression d'un élément
 */
$("#delete").click(e => {
  if (!$(".active").length){
    alert('Aucun élément sélectionné')
    return
  }
  let elementId = $(".active")[0].id
  let ParentId = document.querySelector('.active').parentNode.id
	Elements.delete(elementId, ParentId)
	$("#info").html("")
})

// retire les bordures délimitant les éléments
$("#preview").click(e => {
    $(".preview").length 
      && $(".preview").removeClass("preview")
      || $(".vue").addClass("preview")
})

// broken, see later
$("#import-data").click(e => {
  let data = JSON.parse($("#data-to-import").val())
	let template = data.enfants
  Elements.Template.enfants = template
	Render.vue()
	$("#close-import").click()
})

/**
 * Élément de l'UI
 * Vider le template, 
 */
$("#empty").click(e => {
	Elements.Template.enfants.length = 0
	Render.vue()
})

/**
 * Vider le pannel d'édition quand il n'y a pas de classe active
 * supprimer la classe active si clic sur autre chose qu'un element
 */
$(".vue").click(e => {
	$(".active").removeClass("active")
	classActive = false
	$("#info").html("")
	e.stopPropagation()
})


// Masquer l'icone d'affichage du pannel d'éjout d'élément
$('.panel-icon.t2').hide()

/**
 * Élément de l'UI 
 * afficher le paneau des éléments
 */
$('#toggle-pannel').click(e => {
	$('#elements').toggle()
	$('.panel-icon').toggle()
})
