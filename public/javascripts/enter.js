function enterButtonCall(event)
{
    if (event.which == 13) {
        var text = document.getElementById("choice").value;
        alert("called"+text);
    }

}
