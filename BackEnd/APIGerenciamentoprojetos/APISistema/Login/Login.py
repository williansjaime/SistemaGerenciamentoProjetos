import jwt
import traceback
from flask_restful import Resource
from datetime import datetime, timedelta
from flask import request, make_response,json
from  werkzeug.security import generate_password_hash,check_password_hash

from APISistema.BancoDados.AcessarBanco import DB_MySql

SECRET_KEY='\x11\xb3\xfam\x8b\t\xf1\xa0\xf0\\l%\xd6\x19\xd0\xe2\xbd\xe1\x95\xfe\x87\xf9\x13\xf1'

class Login(Resource):
    '''
        Class Realizar Login
    '''
    try:
        def get(self,senha,usuario):
            lista_usuario = verificar_user_db(senha,usuario)
            if not lista_usuario:
                return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="User does not exist !!"'})

            if not check_password_hash(str(lista_usuario[0]["senha"]), str(senha)):
                return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="User does not exist !!"'})

            return {'user': usuario.upper(), 'token': lista_usuario[0]["token"]}
        
        def post(self,senha=None,usuario=None):
            data = request.get_json()
            if not data or 'senha' not in data[0] or 'usuario' not in data[0]:
                return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required !!"'})
            
            lista_usuario = verificar_user_db(data[0]['senha'], data[0]['usuario'])
            
            if not lista_usuario:
                return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="User does not exist !!"'})

            if not check_password_hash(str(lista_usuario[0]["senha"]), str(data[0]['senha'])):
                return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="User does not exist !!"'})

            return {'user': data[0]['usuario'].upper(), 'token': lista_usuario[0]["token"]}
           
    except Exception as err:
        traceback.print_exc()

def verificar_user_db(senha, name):
    try:
        db_mysql = DB_MySql()
        db_mysql.connect()
        cursor = db_mysql.connection.cursor()
        slectUser = ("""
            SELECT 
                senha,
                token 
            FROM dbGerenciadorProjeto.tbUsuarios
            WHERE
                usuario='{}'
        """).format(name)
        cursor.execute(slectUser)
        slect_user = cursor.fetchone()
        List_User = {}
        i = 0        
        while slect_user:                  
            List_User[i] = {
                "senha" : slect_user[0],
                "token": slect_user[1],
            }
            slect_user = cursor.fetchone()
            i = i + 1  
        db_mysql.connection.close()            
        return List_User
    
    except Exception as err:
        traceback.print_exc()


def gerar_hash_senha(senha):
    """
        Gerar senha hash
    """
    senha_hash = generate_password_hash(senha) 
    return senha_hash

def verificar_token_db(token):
    try:
        db_mysql = DB_MySql()
        db_mysql.connect()
        cursor = db_mysql.connection.cursor()
        slectUser = ("""
            SELECT 
                senha,
                token 
            FROM dbGerenciadorProjeto.tbUsuarios
            WHERE
                token='{}'
        """).format(token)
        cursor.execute(slectUser)
        slect_user = cursor.fetchone()
        db_mysql.connection.close()
        if slect_user:                  
            return True                      
        return False
    except Exception as err:
        traceback.print_exc()