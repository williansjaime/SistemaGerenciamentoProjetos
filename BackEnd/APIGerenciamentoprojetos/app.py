'''
    Montagem da API para fazer conexão entre o banco de dados e o Sistema Gerenciaador de Projetos
'''
import logging
import traceback
from os import environ
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

"""" Importar bibliotecas do sistema """
from APISistema.LogFile import LogFile
from APISistema.Model.CadastraProjetos import CadastraProjetos
from APISistema.Model.EditarProjetos import EditarProjetos
from APISistema.Model.RealizarProjetos  import RealizarProjetos
from APISistema.Model.FinalizarProjetos  import FinalizarProjetos

#Inicia a aplicação WSGI
app = Flask(__name__) 
api = Api(app)

CORS(app, resources={r"/api/*": {"Access-Control-Allow-Origin": "http://localhost:4200"}})
logging.getLogger('flask_cors').level = logging.DEBUG


api.add_resource(CadastraProjetos.CadastraProjetos, '/api/v1/cadastrarprojetos/<token>')
api.add_resource(EditarProjetos.EditarProjetos, '/api/v1/editarprojetos/<token>/<id>')
api.add_resource(RealizarProjetos.RealizarProjetos, '/api/v1/realizarprojetos/<token>/<codprojeto>')
api.add_resource(FinalizarProjetos.FinalizarProjetos, '/api/v1/finalizarprojetos/<token>/<codprojeto>')

if __name__ == '_main_':
    try:
        app.config['DEBUG'] = False     
        app.run() 
        
    except Exception as err:
        traceback.print_exc()        
        LogFile(err)