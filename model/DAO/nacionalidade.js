/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * Versão: 1.0
 **************************************************************************************************************************/
//SITUAÇÃO DO CRUD DA TABELA: OK;

//Import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
        
    //Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
    const prisma = new PrismaClient()


//--------------------------------------------------

// Inserir nova nacionalidade
const insertNacionalidade = async function(nacionalidade) {
    try {
        let sql = `insert into tbl_nacionalidade (nacionalidade) values ('${nacionalidade.nacionalidade}')`
        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar nacionalidade
const updateNacionalidade = async function(nacionalidade) {
    try {
        let sql = `update tbl_nacionalidade set nacionalidade = '${nacionalidade.nacionalidade}' where id = ${nacionalidade.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Excluir nacionalidade
const deleteNacionalidade = async function(id) {
    try {
        let sql = `delete from tbl_nacionalidade where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

// Listar todas
const selectAllNacionalidade = async function() {
    try {
        let sql = `select * from tbl_nacionalidade order by id desc`
        return await prisma.$queryRawUnsafe(sql)
    } catch (error) {
        return false
    }
}

// Buscar por ID
const selectByIdNacionalidade = async function(id) {
    try {
        let sql = `select * from tbl_nacionalidade where id = ${id}`
        return await prisma.$queryRawUnsafe(sql)
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
}
