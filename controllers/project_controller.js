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
        let project = await Project.findById(id).populate('issues')
        if(! project){
            return res.render('page_not_found',{
                title:'404'
            })
        }
        let issues = await Issue.find({project:id}).sort({'createdAt': 'desc'})
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

exports.filterGet = async (req,res) =>{
    let id = req.params.id
    let project = await Project.findById(id)
    if(! project){
        return res.render('page_not_found',{
            title:'404'
        })
    }
    res.render('project_issue_filter',{
        title:"Filter",
        project:project

    })

}
exports.filterPost = (req,res) =>{
    res.send(req.body)
}