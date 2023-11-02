'''
    Montagem da API para fazer conexão entre o banco de dados e o Sistema Gerenciaador de Projetos
'''
import logging
import traceback
from os import environ
from flask import Flask
from LogFile import LogFile
from flask_cors import CORS
from flask_restful import Api

from Model.CadastraProjetos import CadastraProjetos#,EditarProjetos,FinalizarProjetos

app = Flask(__name__)
api = Api(app)
CORS(app, resources={r"/api/*": {"Access-Control-Allow-Origin": "*"}})
logging.getLogger('flask_cors').level = logging.DEBUG


api.add_resource(CadastraProjetos.CadastraProjetos, '/api/v1/cadastrarprojetos/<token>')
#api.add_resource(EditarProjetos.EditarProjetos, '/api/v1/editarprojetos/<token>')
#api.add_resource(FinalizarProjetos.FinalizarProjetos, '/api/v1/finalizarprojetos/<token>/<codprojeto>')

if __name__ == '_main_':
    try:
        app.config['DEBUG'] = False
        #port = int(os.environ.get('PORT', 5000))      
        app.run() 
        
    except Exception as err:
        traceback.print_exc()        
        LogFile(err)