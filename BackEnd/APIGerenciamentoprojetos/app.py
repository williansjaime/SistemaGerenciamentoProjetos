'''
    Montagem da API para fazer conexão entre o banco de dados e o Sistema Gerenciaador de Projetos
'''
import logging
import traceback
from os import environ
from json import dumps
from flask import Flask
from LogFile import LogFile
from flask_cors import CORS
from Controller import loginController
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)
CORS(app, resources={r"/api/*": {"Access-Control-Allow-Origin": "*"}})
logging.getLogger('flask_cors').level = logging.DEBUG


api.add_resource(selects.Estados, '/api/v1/estados/<token>')
api.add_resource(selects.Produtos, '/api/v1/produtos/<senha>')
api.add_resource(selects.CustoProduto, '/api/v1/custo_produtos/<senha>/<codProduto>')

if __name__ == '_main_':
    try:
        app.config['DEBUG'] = False
        #port = int(os.environ.get('PORT', 5000))      
        app.run() 
        
    except Exception as err:
        traceback.print_exc()        
        LogFile(err)