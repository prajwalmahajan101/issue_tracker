{
    let createProject = function (){
        let newProjectForm = $('#project-create-form')
        newProjectForm.submit(function(e){
            e.preventDefault()
            $.ajax({
                type:'post',
                url:'/projects/create',
                data: newProjectForm.serialize(),
                success:function(data){
                    let newProjectHtml =  newProjectDom(data.project)
                    $('#projects-list').prepend(newProjectHtml)
                    newProjectForm.trigger("reset")
                },
                error:function(error){
                    console.log("Error :",error.responseText)
                }
            })
        })
    }

    let newProjectDom = function(project){
        console.log(project)
        return (`<li class="col-11 m-2"><a href="/projects/${project._id}">${project.name}</a></li>`)
    }

    createProject()
}