let newinput = function () {
    let div = $('#labels')
    let newInputHtml = `<input list="label_list" type="text"  class="form-control m-1" id="label" name="labels" placeholder="Issue's Label"  multiple>`
    div.append(newInputHtml)
}
