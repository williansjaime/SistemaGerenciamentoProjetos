import traceback
from json import dumps
from datetime import datetime
from flask_restful import Resource
from flask import request,json,jsonify

from APISistema.LogFile import LogFile
from APISistema.BancoDados.AcessarBanco import DB_MySql

#from Controller import tokenController

class CadastraProjetos(Resource):
    '''
        Class Cadastrar Projetos no Banco
    ''' 
    try:
        def get(self,token):
            if token == "williansLindo":
                db_mysql = DB_MySql()
                db_mysql.connect()
                lista_projetos = {} 
                if db_mysql.connection is None:
                    return
                cursor_db_mysql = db_mysql.connection.cursor()
                select_projetos = """
                    SELECT 
                        id, 
                        NomeProjeto,
                        dataInicio
                    FROM dbGerenciadorProjeto.tbCadastroProjeto;
                    """
                cursor_db_mysql.execute(select_projetos)
                select_list_projetos = cursor_db_mysql.fetchone()
                i = 0
                while select_list_projetos:                  
                    lista_projetos[i] = {
                        "ID" : select_list_projetos[0],
                        "NomeProjeto": select_list_projetos[1],
                        "dataInicio" : str(select_list_projetos[2]),
                    }
                    select_list_projetos = cursor_db_mysql.fetchone()
                    i = i + 1  
                db_mysql.connection.close()
                return jsonify(lista_projetos)             
        def post(self,token):
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
                        insert_cadastro_projeto  = ("""
                            INSERT INTO dbGerenciadorProjeto.tbCadastroProjeto
                            (
                                dataHora, 
                                NomeProjeto, 
                                descricaoProjeto, 
                                dataInicio,
                                token
                            )VALUES(
                                '{}'
                                ,'{}'
                                ,'{}'
                                ,'{}'
                                ,'{}'
                            )""").format(
                                current_dateTime, 
                                content[indx]["NomeProjeto"],
                                content[indx]["DescricaoProjeto"],
                                content[indx]["dataInicio"],  
                                content[indx]["userToken"],                                                                                                                  
                            )
                        cursor_db_mysql.execute(insert_cadastro_projeto)
                        db_mysql.connection.commit()            
                    db_mysql.connection.close()         
    
    except Exception as err:
        traceback.print_exc()
        LogFile.LogFile(err)