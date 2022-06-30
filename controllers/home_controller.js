//Models
const Project = require("../models/project")


exports.home = async (req,res) =>{
    try {
        let projects = await Project.find({}).sort({'createdAt': 'desc'})
        res.render("home",{
            title:"Home",
            projects:projects,
        })
    }catch (err){
        res.send({
            message:"Error In Finding The Projects",
            err:err
        })
    }
}

exports.pageNotFound=(req,res)=>{
    res.render('page_not_found',{
        title:'404'
    })
}