var log=require('../tools/printLog.js');
var createFolder=require('../tools/createFolder.js');
var createFile=require('../tools/createFile.js');
var replaceContent=require('../tools/replaceContent.js');
var rename=require('../tools/rename.js');

let userPath=process.cwd()

function update(name,targetTemplate,finalFileName){
  replaceContent(userPath+'/'+name+targetTemplate,`<component name>`,name.charAt(0).toUpperCase()+name.substring(1),()=>{
    //rename
    rename(userPath+'/'+name+targetTemplate,finalFileName)
  })
}
function initRedux(name,config){
  /************************************
    Will init below file/folders in folder <component name>:

    <component name>.js
    <component name>_Container.js
    <component name>.css (use CSS Modules)
    /components (the sub components of the current one)
    /actions
      index.js
    /reducers
      index.js

  **************************************/

  let componentName=name.charAt(0).toUpperCase()+name.substring(1)
  //init folder
  createFolder(userPath+'/'+name)
  createFolder(userPath+'/'+name+'/components')
  createFolder(userPath+'/'+name+'/actions')
  createFolder(userPath+'/'+name+'/reducers')

  //init files
  createFile(userPath+'/'+name+`/Template_component_redux.js`)
  createFile(userPath+'/'+name+`/Template_component.modules.css`)
  createFile(userPath+'/'+name+`/reducers/Template_reducers.js`)
  createFile(userPath+'/'+name+`/actions/Template_actions.js`)
  createFile(userPath+'/'+name+`/Template_container_redux.js`)

  //edit files
  update(name,`/Template_component_redux.js`,componentName+".js")
  update(name,`/Template_component.modules.css`,componentName+".modules.css")
  update(name,`/reducers/Template_reducers.js`,"index.js")
  update(name,`/actions/Template_actions.js`,"index.js")
  update(name,`/Template_container_redux.js`,componentName+"_Container.js")

}
module.exports = initRedux;
