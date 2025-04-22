/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * Versão: 1.0
 **************************************************************************************************************************/
//Import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



//Objeto tipo JSON
//Funcao para inserir um novo filme

//------------------------------------------------------

const insertFilme = async function(filme){

    try {
        

        let sql = `insert into tbl_filme ( nome,
                                       duracao,
                                       sinopse,
                                       data_lancamento,
                                       foto_capa,
                                       link_trailer
                                     )
                                       
                                     values 
                                     (
                                     '${filme.nome}',
                                     '${filme.duracao}',
                                     '${filme.sinopse}',
                                     '${filme.data_lancamento}',
                                     '${filme.foto_capa}',
                                     '${filme.link_trailer}'
                                     )`
        //pedindo para o prisma executar a variavel no my sql
        //executa o script sql no banco de dados e aguarda o retorno do BD para saber se deu certo
        let result = await prisma.$executeRawUnsafe(sql) //IMPORTANTE  *aguarde o bd responde*

        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }

}

//------------------------------------------------------


//funcao para atualizar um filme existente
const updateFilme= async function(filme){
    try {
        let sql = `update tbl_filme set nome = '${filme.nome}',
                                        duracao = '${filme.duracao}',
                                        sinopse = '${filme.sinopse}',
                                        data_lancamento = '${filme.data_lancamento}',
                                        foto_capa = '${filme.foto_capa}',
                                        link_trailer = '${filme.link_trailer}'
                                    where id = ${filme.id} `

        let resultFilme = await prisma.$executeRawUnsafe(sql)

        if(resultFilme){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }


}

//------------------------------------------------------


//funcao para excluir um filme existente
const deleteFilme=async function (id) {
    try {
        let sql = `delete from tbl_filme where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql) //execute para quando não precisar retornsr

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//------------------------------------------------------

//Funcao para retornar todos os filmes existentes
const selectAllFilme = async function () {
 
    try{
        //SRIPT SQL PARA RETORNAR TODOS OS DADOS
        let sql = 'select * from tbl_filme order by id desc'

        //EXECUTA O SCRIPTSQL NO BD E AGUARDA O RETORNO DE DADOS
        let result = await prisma.$queryRawUnsafe (sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//------------------------------------------------------

//funco para buscar um filme pelo id
const selectByIdFilme=async function (id) {
    try {
        let sql =`select * from tbl_filme where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql) //executando script no banco, query sempre que precisar retornar

        if (result)
            return result 
        else
            return false

    } catch (error) {
        return false
    }
}

//------------------------------------------------------

//*UM SELECT PARA CADA FUNCTION*

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme
}