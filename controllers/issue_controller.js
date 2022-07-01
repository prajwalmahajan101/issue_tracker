//Models
const Project = require('../models/project')
const Issue = require('../models/issue')


exports.create = async (req,res) => {
    if(typeof(req.body.labels)==="string") req.body.labels = [req.body.labels,""]
    req.body.labels = req.body.labels.filter((el)=>{
        return el!==""
    })
    req.body.labels = req.body.labels.map((el)=>{
        return el.toUpperCase()
    })
    let project = await Project.findById(req.body.project)
    const project_labels = project.labels
    let issue = await Issue.create(req.body)
    const issue_labels = issue.labels
    for(let label of issue_labels){
        if(! project_labels.includes(label)) project_labels.push(label)
    }
    project.issues.push(issue._id)
    project.save()
    if(req.xhr) {
        res.send({
            title:issue.title,
            id :issue.id,
        })
    }
    else{
        res.redirect("/projects/"+project.id)
    }
}

exports.detail = async (req,res) => {
    let id = req.params.id
    let issue = await Issue.findById(id).populate('project')
    if(! issue){
        res.render('page_not_found',{
            title:'404'
        })
    }
    res.render('issue_details',{
        title:"Issue Details",
        issue:issue
    })
}

exports.test = async (req,res) =>{

    res.send(req.body)
}