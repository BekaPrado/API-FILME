/*******************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * VERSÃO: 1.0
 *******************************************************************************************/

// Import das mensagens e códigos de status
const message = require('../../modulo/config.js')

// Import do DAO de filmes
const filmeDAO = require('../../model/DAO/filme.js')

//------------------------------------------------------------------------
// Inserir novo filme
const inserirFilme = async function (filme, contentType) {
    try {
        console.log(filme)
        if (contentType == 'application/json') {
            if (
                filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 80 ||
                filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 5 ||
                filme.sinopse == '' || filme.sinopse == undefined || filme.sinopse == null ||
                filme.data_lancamento == '' || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
                filme.foto_capa == undefined || filme.foto_capa.length > 200 ||
                filme.link_trailer == undefined || filme.link_trailer.length > 200
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let resultFilme = await filmeDAO.insertFilme(filme)
                if (resultFilme) {
                    return message.SUCESS_CREATED_ITEM //201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//------------------------------------------------------------------------
// Atualizar filme
const atualizarFilme = async function (id, filme, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 80 ||
                filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 5 ||
                filme.sinopse == '' || filme.sinopse == undefined || filme.sinopse == null ||
                filme.data_lancamento == '' || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
                filme.foto_capa == undefined || filme.foto_capa.length > 200 ||
                filme.link_trailer == undefined || filme.link_trailer.length > 10
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let resultFilme = await filmeDAO.selectByIdFilme(id)
                if (resultFilme != false && typeof (resultFilme) == 'object') {
                    if (resultFilme.length > 0) {
                        filme.id = parseInt(id)
                        let result = await filmeDAO.updateFilme(filme)
                        if (result) {
                            return message.SUCCESS_UPDATED_ITEM
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------
// Excluir filme
const excluirFilme = async function (idFilme) {
    try {
        if (idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(idFilme))
            if (resultFilme != false && typeof (resultFilme) == 'object') {
                if (resultFilme.length > 0) {
                    let result = await filmeDAO.deleteFilme(parseInt(idFilme))
                    if (result) {
                        return message.SUCCESS_DELETED_ITEM
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------
// Listar filmes
const listarFilme = async function () {
    try {
        let dadosFilme = {}
        let resultFilme = await filmeDAO.selectAllFilme()
        if (resultFilme != false && typeof (resultFilme) == 'object') {
            if (resultFilme.length > 0) {
                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.itens = resultFilme.length
                dadosFilme.filmes = resultFilme
                return dadosFilme
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//------------------------------------------------------------------------
// Buscar filme por ID
const buscarFilme = async function (idfilme) {
    let dadosfilme = {}
    try {
        if (idfilme == '' || idfilme == undefined || idfilme == null || idfilme < 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let result = await filmeDAO.selectByIdFilme(idfilme)
            if (result != false && typeof (result) == 'object') {
                if (result.length > 0) {
                    dadosfilme = {
                        status: true,
                        status_code: 200,
                        filme: result
                    }
                    return dadosfilme
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------

module.exports = {
    inserirFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
    atualizarFilme
}
