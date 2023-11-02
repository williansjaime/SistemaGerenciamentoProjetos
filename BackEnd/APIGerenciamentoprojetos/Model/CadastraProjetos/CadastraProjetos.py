import traceback
from json import dumps
from datetime import datetime
from flask_restful import Resource
from flask import request,json,jsonify

from LogFile import LogFile
from BancoDados import AcessarBanco

#from Controller import tokenController

class CadastraProjetos(Resource):
    '''
        Class Cadastrar Projetos no Banco
    ''' 
    try:
        def get(self,token):
            if token == "williansLindo":
                db_mysql = AcessarBanco.DB_Mysql()
                cursor_db_mysql = db_mysql.cursor()
                lista_produto = {} 
                selct_produtos = """
                        SELECT 
                            codi 
                        FROM Gerencial.dbo.tbproduto
                    """
                cursor_db_mysql.execute(selct_produtos)
                slect_list_produto = cursor_db_mysql.fetchone()
                i = 0
                while slect_list_produto:                  
                    lista_produto[i] = {
                            "codi":slect_list_produto[0],                          
                        }
                    slect_list_produto = cursor_db_mysql.fetchone()
                    i = i + 1  
                db_mysql.close()
                return jsonify(lista_produto)             
        def post(self,token):
            my_json = request.data.decode('utf8').replace("'", '"')
            data = json.loads(my_json)
            current_dateTime = (str(datetime.now()).split("."))[0]
            if(data):
                db_mysql = AcessarBanco.DB_Mysql()
                cursor_db_mysql = db_mysql.cursor()
                content = data
                for indx in range(len(content)):
                    if(content[indx] and content[indx]["cod"] != "" and content[indx]["mes"] != "" and content[indx]["valor"] != ""):                                          
                        insert_cadastro_forecast  = ("""
                            INSERT INTO dbo.tbCadastrarForecast(
                                codProduto
                                ,mesNumber
                                ,valor
                                ,usuario
                                ,dateTime
                                ,indicador)
                            VALUES
                                ({}
                                ,{}
                                ,'{}'
                                ,'{}'
                                ,'{}'
                                ,0) 
                            """).format(
                                content[indx]["cod"],
                                content[indx]["mes"],
                                content[indx]["valor"],
                                content[indx]["usuario"], 
                                current_dateTime,                                                                                    
                            )
                        cursor_db_mysql.execute(insert_cadastro_forecast)
                        db_mysql.commit()            
                db_mysql.close()
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
            return json.dumps({'success':False}), 200, {'ContentType':'application/json'}
    
    except Exception as err:
        traceback.print_exc()
        LogFile.LogFile(err)