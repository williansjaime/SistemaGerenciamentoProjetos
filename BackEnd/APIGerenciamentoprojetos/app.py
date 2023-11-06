'''
    Montagem da API para fazer conexão entre o banco de dados e o Sistema Gerenciaador de Projetos
'''
import logging
import traceback
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

"""" Importar bibliotecas do sistema """
from APISistema.LogFile import LogFile
from APISistema.Model.CadastraProjetos import CadastraProjetos
from APISistema.Model.EditarProjetos import EditarProjetos
from APISistema.Model.RealizarProjetos  import RealizarProjetos
from APISistema.CadastroUsuario import CadastroUsuario
from APISistema.Login import Login


"""Inicia a aplicação WSGI"""
app = Flask(__name__) 
api = Api(app)

"""Aplicar CORS e gerar log de erros """
CORS(app, resources={r"/api/*": {"Access-Control-Allow-Origin": "http://localhost:4200"}})
logging.getLogger('flask_cors').level = logging.DEBUG

"""Adicionar as rotas de API"""
api.add_resource(Login.Login, '/api/v1/login/<senha>/<usuario>')
api.add_resource(CadastroUsuario.CadastroUsuario, '/api/v1/cadastrousuario')

api.add_resource(CadastraProjetos.CadastraProjetos, '/api/v1/cadastrarprojetos/<token>')
api.add_resource(EditarProjetos.EditarProjetos, '/api/v1/editarprojetos/<token>/<id>')
api.add_resource(RealizarProjetos.RealizarProjetos, '/api/v1/realizarprojetos/<token>/<id>')



if __name__ == '__main__':
    try:
        context = ('server.crt', 'server.key')
        app.run(ssl_context=context, debug=True)
        
    except Exception as err:
        traceback.print_exc()        
        LogFile(err)