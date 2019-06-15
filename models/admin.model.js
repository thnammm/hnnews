var db = require('../utils/admindb');

module.exports = {
    // Account
    numberaccount: () => {
        return db.load('call AdminCountAccount()');
    },

    allaccount: () => {
        return db.load(`call AdminGetAccount()`);
    },

    countallaccount: () => {
        return db.load(`select count(*) as accountvalue from account where status = 1`);
    },

    alluser: () => {
        return db.load(`call AdminGetUser()`);
    },

    countalluser: () => {
        return db.load(`select count(*) as uservalue from user where status = 1`);
    },

    allwriter: () => {
        return db.load(`call AdminGetWriter()`);
    },

    countallwriter: () => {
        return db.load(`select count(*) as writervalue from writer where status = 1`);
    },

    alleditor: () => {
        return db.load(`call AdminGetEditor()`);
    },

    countalleditor: () => {
        return db.load(`select count(*) as editorvalue from editor where status = 1`);
    },

    singleuser: id => {
        return db.load(`call AdminGetOneUser(${id})`);
    },

    singlewriter: id => {
        return db.load(`call AdminGetOneWriter(${id})`);
    },

    singleeditor: id => {
        return db.load(`call AdminGetOneEditor(${id})`);
    },

    addaccount: (username, passwordhash, roleid, fullname, email, penname, dob, startdate, enddate) => {
        return db.load(`call AdminAddOneAccount('${username}', '${passwordhash}', ${roleid}, '${fullname}', '${email}', '${penname}', '${dob}', '${startdate}', '${enddate}')`);
    },

    deleteuser: id => {
        return db.load(`call AdminDeleteOneUser(${id})`);
    },

    updateduedate: (id, duedate) => {
        return db.load(`call AdminUpdateDueDateUser(${id}, '${duedate}')`);
    },

    updatepenname: (id, penname) => {
        return db.load(`call AdminUpdatePenNameWriter(${id}, '${penname}')`);
    },

    catnoteditor: () => {
        return db.load(`call AdminGetCategoryNoEditor()`);
    },

    addcatnoteditor: (subcatid, editorid) => {
        return db.load(`call AdminAddCategoryEditor(${subcatid}, ${editorid})`);
    },

    deletewriter: id => {
        return db.load(`call AdminDeleteOneWriter(${id})`);
    },

    deleteeditor: id => {
        return db.load(`call AdminDeleteOneEditor(${id})`);
    },

    deletecategoryeditor: (subcatid, editorid) => {
        return db.load(`call AdminDeleteCategoryEditor(${subcatid}, ${editorid})`);
    },

    // Post
    allpost: () => {
        return db.load(`call AdminGetPost()`);
    },

    countallpost: () => {
        return db.load(`select count(*) as postvalue from post where status = 1`);
    },

    tagofpost: id => {
        return db.load(`call AdminGetTagOfPost(${id})`);
    },

    singlepost: id => {
        return db.load(`call AdminGetOnePost(${id})`);
    },

    updatepost: (id, poststatus) => {
        return db.load(`call AdminUpdateStatusPost(${id}, '${poststatus}')`);
    },

    deletepost: id => {
        return db.load(`call AdminDeleteOnePost(${id})`);
    },

    // Category
    allcategory: () => {
        return db.load(`call AdminGetCategory()`);
    },

    countallcategory: () => {
        return db.load(`select count(*) as categoryvalue from subcategory where status = 1`);
    },

    category: () => {
        return db.load('select * from category');
    },

    editor: () => {
        return db.load('select * from editor');
    },

    addcategory: entity => {
        return db.addcategory(entity);
    },

    singlecategory: id => {
        return db.load(`call AdminGetOneCategory(${id})`);
    },

    updatecategory: (id, catname) => {
        return db.load(`call AdminUpdateOneCategory(${id}, '${catname}')`);
    },

    deletecategory: id => {
        return db.load(`call AdminDeleteOneCategory(${id})`);
    },

    // Tag
    alltag: () => {
        return db.load(`call AdminGetTag()`);
    },

    countalltag: () => {
        return db.load(`select count(*) as tagvalue from tag where status = 1`);
    },

    addtag: entity => {
        return db.addtag(entity);
    },

    singletag: id => {
        return db.load(`call AdminGetOneTag(${id})`);
    },

    updatetag: (id, tagname) => {
        return db.load(`call AdminUpdateTag(${id}, '${tagname}')`);
    },

    deletetag: id => {
        return db.load(`call AdminDeleteOneTag(${id})`);
    }
};