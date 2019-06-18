var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from user');
    },

    single: id => {
        return db.load(`select * from user where id = ${id}`)
    },

    add: entity => {
        return db.add('user', entity);
    },

    update: entity => {
        return db.update('user', 'id', entity);
    },

    delete: id => {
        return db.delete('user', 'id', id);
    },

    userloadinfo: id => {
        return db.load(`call UserGetInfo(${id})`);
    },

    editorloadinfo: id => {
        return db.load(`call EditorGetInfo(${id})`);
    },

    writerloadinfo: id => {
        return db.load(`call WriterGetInfo(${id})`);
    },

    writerpostlist: (id) => {
        return db.load(`call WriterPostList(${id})`);
    },

    writerpoststatus1: (id) => {
        return db.load(`call WriterPostListStatus(${id}, '1')`);
    },

    writerpoststatus2: (id) => {
        return db.load(`call WriterPostListStatus(${id}, '2')`);
    },

    writerpoststatus3: (id) => {
        return db.load(`call WriterPostListStatus(${id}, '3')`);
    },

    writerpoststatus4: (id) => {
        return db.load(`call WriterPostListStatus(${id}, '4')`);
    },

    writerupdateinfo: (writerEntity) => {
        return db.load(`call WriterUpdateInfo(${writerEntity.id},'${writerEntity.fullname}'
                                             ,'${writerEntity.penname}','${writerEntity.email}'
                                             ,'${writerEntity.dob}')`);
    },

    editorupdateinfo: (editorEntity) => {
        return db.load(`call EditorUpdateInfo(${editorEntity.id},'${editorEntity.fullname}'
                                            ,'${editorEntity.email}','${editorEntity.dob}')`);
    },

    userupdateinfo: (userEntity) => {
        return db.load(`call UserUpdateInfo(${userEntity.id},'${userEntity.fullname}'
                                            , '${userEntity.email}', '${userEntity.dob}' )`);
    },

    writeraddpost: (writerid, title, summary, content, ispremium, subid, linkimage) => {
        return db.load(`call WriterCreatePost(${writerid}, '${title}', '${summary}', '${content}', '${ispremium}', ${subid}, '${linkimage}')`);
    },

    writeraddtagofpost: (id, tagname) => {
        return db.load(`call WriterAddTagOfPost(${id}, '${tagname}')`);
    },

    writergeteditpost: (writerid, postid) => {
        return db.load(`call WriterGetEditPost(${writerid}, ${postid})`);
    },

    writergettagofonepost: (postid) => {
        return db.load(`call WriterGetTagOfPost(${postid})`);
    },

    writergetothersubcat: (postid) => {
        return db.load(`call WriterGetOtherCatOfEditPost(${postid})`);
    },

    editorpostlist: (id) => {
        return db.load(`call EditorPostList(${id})`);
    },

    editorpoststatus1: (id) => {
        return db.load(`call EditorPostListStatus(${id}, '1')`);
    },

    editorpoststatus2: (id) => {
        return db.load(`call EditorPostListStatus(${id}, '2')`);
    },

    editorpoststatus3: (id) => {
        return db.load(`call EditorPostListStatus(${id}, '3')`);
    },

    editorpoststatus4: (id) => {
        return db.load(`call EditorPostListStatus(${id}, '4')`);
    },

    editorgeteditpost: (editorid, postid) => {
        return db.load(`call EditorGetEditPost(${editorid}, ${postid})`);
    },

    editorgettagofonepost: (postid) => {
        return db.load(`call EditorGetTagOfPost(${postid})`);
    },

    editorgetothersubcat: (postid) => {
        return db.load(`call EditorGetOtherCatOfEditPost(${postid})`);
    },

    editorsendfeedback: (postid, editorid, content) => {
        return db.load(`call EditorSendFeedback(${postid}, ${editorid}, '${content}')`);
    },

    editorapprove: (postid, subid, postdate) => {
        return db.load(`call EditorApprovePost(${postid}, ${subid}, '${postdate}')`)
    },

    editoraddtagofpost: (id, tagname) => {
        return db.load(`call EditorAddTagOfPost(${id}, '${tagname}')`);
    },
};