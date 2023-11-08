/**
 * Élement de l'UI, pannel des éléments. 
 * Cliquer sur une icone permet d'ajouter un'élément au template
 */
$(".icon").click(e => {
	if (!e.target.classList.contains("icon")) e.target = e.target.closest(".icon")

	Elements.add(e.target.id)
})

/**
 * Element de l'ui, pannel d'édition
 * Boutton de mise à jour d'un élément
 */
$("#update").click(e => {
	let element = Elements.list.find(x => x.id == $("input[name=id]").val())
	if ($('[name="type"]').val().includes(" ")) {
		alert("Le type ne peut pas contenir d'espace")
		return
	}

	$("#info input").each(x => {
		if (
			$("input")[x].name == "enfants" ||
			$("input")[x].name == "id" ||
			$("input")[x].name == "type"
		)
			return
		element[$("input")[x].name] = $("input")[x].value
	})
	render_vue()
})

/**
 * Element de l'ui, pannel d'édition
 * Boutton de suppression d'un élément
 */
$("#delete").click(e => {
	Elements.delete(Template.enfants, $("input[name=id]").val())
	render_vue()
	$("#info").html("")
})

// broken, je ne sais plus à quoi sert
// Je pense qu'il retire les bordures des éléments que j'ai ajouté pour faciliter
// l'édition mais je ne suis pas sur
$("#preview").click(e => {
	;($(".preview").length && $(".preview").removeClass("preview")) ||
		$(".vue").addClass("preview")
})

// what the fuck is this ?
$("#update").click(e => {
	$("#modal-body .obj  textarea").val(JSON.stringify(Template, null, 2))
	document.querySelector("#modal-body .html pre").textContent = decodeURI(
		document.querySelector(".vue").innerHTML
	)
})

// broken, see later
$("#import-data").click(e => {
	data = JSON.parse($("#data-to-import").val())
	Template.enfants = data.enfants
	Elements.list.length = 0
	checkTemplateElements(template.enfants)
	render_vue()
	$("#close-import").click()
})

/**
 * Élément de l'UI
 * Vider le template, 
 */
$("#empty").click(e => {
	Template.enfants.length = 0
	render_vue()
})

// what the fuck is this ?
$(".vue").click(e => {
	$(".active").removeClass("active")
	classActive = false
	$("#info").html("")
	e.stopPropagation()
})


// what the fuck is this ?
$('.panel-icon.t2').hide()

/**
 * Élément de l'UI afficher le paneau des éléments
 */
$('#toggle-pannel').click(e => {
	$('#elements').toggle()
	$('.panel-icon').toggle()
})
