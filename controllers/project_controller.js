//Model
const Project = require('../models/project')
const Issue = require('../models/issue')


module.exports.create = async (req,res) =>{
    try {
        const formData = req.body
        let project = await Project.create({
            name: formData.name,
            description: formData.description,
            author: formData.author,
        })
        if(req.xhr){
            res.status(200).send({
            message: "Project Created",
            project: project
            })
        }
        else{
            res.redirect("/")
        }
    }catch (err){
        res.send({
            message:"Error In Creating The Project",
            err:err
        })
    }

}



module.exports.detail = async (req,res) =>{
    let id = req.params.id
    try {
        let project = await Project.findById(id).populate({path:'issues',options: { sort: '-createdAt'}})
        if(! project){
            return res.render('page_not_found',{
                title:'404'
            })
        }
        let issues = project.issues
        res.render('project_details',{
            title:'Project Details',
            project:project,
            issues:issues
        })
    }catch(err){
        res.send({
            message:"error",
            error:err,
            id:id
        })
    }
}


exports.filter =async (req,res) =>{
    let labels = []
    if(req.body.labels){
        if(typeof(req.body.labels)==="string") req.body.labels = [req.body.labels]
        labels = [...req.body.labels]
    }
    let filterData = {}
    if(req.body.title!=='') filterData.title=req.body.title
    if(req.body.description!=='') filterData.description=req.body.description
    if(req.body.author!=='') filterData.author=req.body.author
    let id = req.body.project

    let project = await Project.findById(id).populate({
        path:'issues',
        match:filterData
    })
    let filtered_issues = []

    if(labels.length>0) {
        for(let issue of project.issues){
            for(let label of labels){
                if(issue.labels.includes(label) && !filtered_issues.includes(issue)) filtered_issues.push(issue)
            }
        }
    }
    else{
        filtered_issues = [...project.issues]
    }
    res.render('project_details',{
        title:'Project Details',
        project:project,
        issues:filtered_issues
    })

}