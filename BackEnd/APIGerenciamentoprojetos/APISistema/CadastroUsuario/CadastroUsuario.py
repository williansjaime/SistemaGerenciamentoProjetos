import jwt
import traceback
from datetime import datetime,timedelta
from flask_restful import Resource
from flask import request,json
from  werkzeug.security import generate_password_hash

from APISistema.LogFile import LogFile
from APISistema.BancoDados.AcessarBanco import DB_MySql

SECRET_KEY='\x11\xb3\xfam\x8b\t\xf1\xa0\xf0\\l%\xd6\x19\xd0\xe2\xbd\xe1\x95\xfe\x87\xf9\x13\xf1'

class CadastroUsuario(Resource):
    '''
        Class Cadastrar Usuario no Banco
    ''' 
    try:
        def post(self):           
            my_json = request.data.decode('utf8').replace("'", '"')
            content = json.loads(my_json)
            current_dateTime = (str(datetime.now()).split("."))[0]
            db_mysql = DB_MySql()
            db_mysql.connect()
            if db_mysql.connection is None:
                return
            if(content):
                cursor_db_mysql = db_mysql.connection.cursor()                
                insert_usuario  = ("""
                    INSERT INTO dbGerenciadorProjeto.tbUsuarios
                    (
                        usuario, 
                        senha, 
                        token, 
                        dataHora, 
                        email
                    )VALUES(
                        '{}', 
                        '{}', 
                        '{}', 
                        '{}', 
                        '{}'
                    )""").format(
                        content[0]["usuario"],
                        gerar_hash_senha(content[0]["senha"]),
                        gerar_token(content[0]["senha"]), 
                        current_dateTime,                                
                        content[0]["email"],    
                    )
                cursor_db_mysql.execute(insert_usuario)
                db_mysql.connection.commit()            
                db_mysql.connection.close()         
    
    except Exception as err:
        traceback.print_exc()
        LogFile.LogFile(err)


def gerar_hash_senha(senha):
    """
        Gerar senha hash
    """
    senha_hash = generate_password_hash(senha) 
    return senha_hash


def gerar_token(user_id):
    """
    Gerar um token JWT para um usuário com um prazo de validade de uma semana.
    """
    expiration = datetime.utcnow() + timedelta(weeks=1)
    payload = {
        'exp': expiration,
        'iat': datetime.utcnow(),
        'sub': user_id
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token