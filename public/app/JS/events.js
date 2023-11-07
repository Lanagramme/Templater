
$(".icon").click(e => {
	if (!e.target.classList.contains("icon")) e.target = e.target.closest(".icon")

	let currentItem = new templates[e.target.id]()
	delete currentItem.flavor
	addElement(currentItem)
})

$("#update").click(e => {
	element = elements.find(x => x.id == $("input[name=id]").val())
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

$("#delete").click(e => {
	deleteElement(template.enfants, $("input[name=id]").val())
	render_vue()
	$("#info").html("")
})

$("#preview").click(e => {
	;($(".preview").length && $(".preview").removeClass("preview")) ||
		$(".vue").addClass("preview")
})

$("#update").click(e => {
	$("#modal-body .obj  textarea").val(JSON.stringify(template, null, 2))
	document.querySelector("#modal-body .html pre").textContent = decodeURI(
		document.querySelector(".vue").innerHTML
	)
})

$("#import-data").click(e => {
	data = JSON.parse($("#data-to-import").val())
	template.enfants = data.enfants
	elements.length = 0
	checkTemplateElements(template.enfants)
	render_vue()
	$("#close-import").click()
})

$("#empty").click(e => {
	template.enfants.length = 0
	render_vue()
})

$(".vue").click(e => {
	$(".active").removeClass("active")
	classActive = false
	$("#info").html("")
	e.stopPropagation()
})

$('.panel-icon.t2').hide()

$('#toggle-pannel').click(e => {
	$('#elements').toggle()
	$('.panel-icon').toggle()
})
