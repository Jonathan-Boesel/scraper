$(document).on("click", ".save", function() {
    let id = ($(this).data("id"))
    $.ajax({
            method: "PUT",
            url: "/saved/" + id
        })
        .done(function(data) {
            console.log(data)
        })
})

$(document).on("click", ".delete", function() {
    let id = ($(this).data("id"))
    $.ajax({
            method: "PUT",
            url: "/delete/" + id
        })
        .done(function(data) {
            console.log(data)
        })
})

$(document).on("click", "#wired", function() {
    $.ajax({
            method: "GET",
            url: "/"
        })
        .done(function(data) {
            console.log("click")
        })
})

$(document).on("click", "#home", function() {
    $.ajax({
            method: "GET",
            url: "/articles"
        })
        .done(function(data) {
            console.log("click")
        })
})

$(document).on("click", "#savedArticles", function() {
    $.ajax({
            method: "GET",
            url: "/saved"
        })
        .done(function(data) {
            console.log("click")
        })
})

$(document).on("click", "#scrape", function() {
    $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .done(function(data) {
            console.log("click")
        })
})
$(function() {
    $(document).on("click", ".note", function() {
        event.preventDefault();
        let id = ($(this).data("id"))
        $.ajax({
                method: "GET",
                url: "/articles/" + id,
            })
            .done(function(data) {
                if (data.note) {
                    $(".defualt").remove()
                    $(".list-group").append('<li class="list-group-item">' + data.note.body + ' <button class="btn btn-danger pull-right note-delete" data-deleteid="' + data.note._id + '">x</button></li>')
                }
            })
        $("#noteID").text(id)
        $("#saveNote").data("noteid", id)
        console.log($("#saveNote").data("noteid"))
        $(".bootbox").removeClass("hide")
    })
})

$(function() {
    $(document).on("click", ".close", function() {
        let id = ($(this).data("id"))
        event.preventDefault();
        $(".bootbox").addClass("hide")
    })
})

let getNotes = function(id) {
    $.ajax({
            method: "GET",
            url: "/articles/" + id
        })
        .done(function(data) {
            console.log(data.note.body)
            $(".defualt").remove()
            $(".list-group").append('<li class="list-group-item">data.note.body</li>')
        })
}

$(function() {
    $(document).on("click", "#saveNote", function() {
        let id = ($(this).data("noteid"))
        console.log($("#noteText").val())
        $.ajax({
                method: "POST",
                url: "/articles/" + id,
                data: {
                    id: id,
                    body: $("#noteText").val().trim()
                }
            })
            .done(function(data) {
                console.log(data)
                $(".defualt").remove()
                $(".list-group").append('<li class="list-group-item" data-deletenote="' + data.note + '">' + $("#noteText").val().trim() + ' <button class="btn btn-danger pull-right note-delete" data-deleteid="' + data.note + '">x</button></li>')
                $('#noteText').val("")
            })

    })
    // .done(getNotes(id))
})


$(function() {
    $(document).on("click", ".note-delete", function() {
        let id = ($(this).data("deleteid"))
        $.ajax({
                method: "PUT",
                url: "/deleteNote/" + id
            })
            .done(function() {
                console.log("deleted")
                $('*[data-deletenote=' + id + ']').remove();
                $(".list-group").append('<li class="list-group-item defualt">No notes for this article yet.</li>');
            })
    })
})
