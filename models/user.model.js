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

    poststatus1: (id) => {
        return db.load(`call WriterPostListStatus(${id}, '1')`);
    },

    poststatus2: (id) => {
        return db.load(`call WriterPostListStatus(${id}, '2')`);
    },

    poststatus3: (id) => {
        return db.load(`call WriterPostListStatus(${id}, '3')`);
    },

    poststatus4: (id) => {
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
    }
};