import traceback
from datetime import datetime
from flask_restful import Resource
from flask import request,json,jsonify

from APISistema.LogFile import LogFile
from APISistema.BancoDados.AcessarBanco import DB_MySql
from APISistema.Login import Login

class RealizarProjetos(Resource):
    '''
        Class Realizar Tarefas de Projetos
    ''' 
    try:
        def get(self,token,id):
            if Login.verificar_token_db(token):
                db_mysql = DB_MySql()
                db_mysql.connect()
                lista_projetos = {} 
                if db_mysql.connection is None:
                    return
                cursor_db_mysql = db_mysql.connection.cursor()
                select_projetos = ("""
                    SELECT 
                        id,
                        tarefa, 
                        status, 
                        inicioTarefa, 
                        tarefaFinal,
                        descricao,
                        token
                    FROM dbGerenciadorProjeto.tbEditarProjeto               
                        where idProjeto = {}
                        order by dataHora desc
                    """).format(
                        id
                    )
                cursor_db_mysql.execute(select_projetos)
                select_list_projetos = cursor_db_mysql.fetchone()
                i = 0
                while select_list_projetos:                  
                    lista_projetos[i] = {
                        "id":select_list_projetos[0],
                        "tarefa":select_list_projetos[1],
                        "status":str(select_list_projetos[2]),
                        "inicioTarefa":str(select_list_projetos[3]),                            
                        "tarefaFinal":str(select_list_projetos[4]),
                        "descricao":select_list_projetos[5],  
                        "userToken":select_list_projetos[6],                         
                    }
                    select_list_projetos = cursor_db_mysql.fetchone()
                    i = i + 1  
                db_mysql.connection.close()
                return jsonify(lista_projetos)             
        
        def patch(self,token,id=None):
            if Login.verificar_token_db(token):            
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
                        update_tarefa_projeto  = ("""                                                    
                            UPDATE dbGerenciadorProjeto.tbEditarProjeto
                                SET 
                                status={}, 
                                token='{}', 
                                dataHora='{}'
                            WHERE id={};
                            """).format(
                                content[indx]["status"],  
                                content[indx]["userToken"],
                                current_dateTime,                                 
                                content[indx]["id"],                                                                                                          
                            )
                        cursor_db_mysql.execute(update_tarefa_projeto)
                        db_mysql.connection.commit()            
                    db_mysql.connection.close()         
        
        def delete(self,token,id):
            if Login.verificar_token_db(token):
                db_mysql = DB_MySql()
                db_mysql.connect()
                if db_mysql.connection is None:
                    return
                if(id):
                    cursor_db_mysql = db_mysql.connection.cursor()                    
                    delete_tarefa_projeto  = ("""                                                    
                        DELETE FROM dbGerenciadorProjeto.tbEditarProjeto
                        WHERE id={}
                    """).format(
                        id                                                                                                          
                    )
                    cursor_db_mysql.execute(delete_tarefa_projeto)
                    db_mysql.connection.commit()            
                    db_mysql.connection.close()              
    
    except Exception as err:
        traceback.print_exc()
        LogFile.LogFile(err)