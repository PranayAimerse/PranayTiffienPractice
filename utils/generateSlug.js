exports.CreateSlug = (data) => {

    let text = "";
    if (data ) {
        text = data.replaceAll(" ", "_").toLowerCase()
        text = text.replace(/[&\/\\#,@+()$~%.'":*?=<>[{}]/, '-');
    }
    return text
}