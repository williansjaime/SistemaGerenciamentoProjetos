import traceback
from datetime import datetime
from flask_restful import Resource
from flask import request,json,jsonify

from APISistema.LogFile import LogFile
from APISistema.BancoDados.AcessarBanco import DB_MySql

class EditarProjetos(Resource):
    '''
        Class Cadastrar Projetos no Banco
    ''' 
    try:
        def get(self,token,id):
            if token == "williansLindo":
                db_mysql = DB_MySql()
                db_mysql.connect()
                lista_eidte_projetos = {} 
                if db_mysql.connection is None:
                    return
                cursor_db_mysql = db_mysql.connection.cursor()
                select_edite_projetos = ("""
                    SELECT 
                        id, 
                        idProjeto, 
                        nomeProjeto, 
                        tarefa, 
                        status, 
                        inicioTarefa, 
                        tarefaFinal
                    FROM dbGerenciadorProjeto.tbEditarProjeto
                        where
                        idProjeto = {}
                """).format(
                        id
                    )
                cursor_db_mysql.execute(select_edite_projetos)
                select_list_edite_projetos = cursor_db_mysql.fetchone()
                i = 0
                while select_list_edite_projetos:                  
                    lista_eidte_projetos[i] = {
                        "id":select_list_edite_projetos[0],
                        "idProjeto":select_list_edite_projetos[1],
                        "nomeProjeto":select_list_edite_projetos[2],
                        "tarefa":select_list_edite_projetos[3],
                        "status":select_list_edite_projetos[4],
                        "inicioTarefa":select_list_edite_projetos[5],
                        "tarefaFinal" :select_list_edite_projetos[6],                         
                    }
                    select_list_edite_projetos = cursor_db_mysql.fetchone()
                    i = i + 1  
                db_mysql.connection.close()
                return jsonify(lista_eidte_projetos)    
                        
        def post(self,token,id):
            if token == "williansLindo":            
                my_json = request.data.decode('utf8').replace("'", '"')
                data = json.loads(my_json)
                current_dateTime = (str(datetime.now()).split("."))[0]
                db_mysql = DB_MySql()
                db_mysql.connect()
                if db_mysql.connection is None:
                    return
                if(data):
                    cursor_db_mysql = db_mysql.connection.cursor()                    
                    content = data
                    for indx in range(len(content)):
                        insert_cadastro_tarefas  = ("""
                            INSERT INTO dbGerenciadorProjeto.tbEditarProjeto
                            (
                                dataHora,
                                idProjeto, 
                                nomeProjeto, 
                                tarefa, 
                                status, 
                                token, 
                                inicioTarefa, 
                                tarefaFinal,
                                descricao
                            )VALUES(
                                '{}'
                                ,{}
                                ,'{}'
                                ,'{}'
                                ,1
                                ,'{}'
                                ,'{}'
                                ,'{}'
                                ,'{}'
                            )""").format(
                                current_dateTime, 
                                content[indx]["idProjeto"],
                                content[indx]["nomeProjeto"],
                                content[indx]["tarefa"],  
                                content[indx]["userToken"],    
                                content[indx]["dataInicioTarefa"],   
                                content[indx]["dataFinalTarefa"],
                                content[indx]["descricao"],  
                            )
                        cursor_db_mysql.execute(insert_cadastro_tarefas)
                        db_mysql.connection.commit()            
                    db_mysql.connection.close()         
    
    except Exception as err:
        traceback.print_exc()
        LogFile.LogFile(err)