import os
import logging
import traceback
from datetime import datetime
from flask import request, json

class LogFile():
    ''' 
        Class Log Salvar erro gerado pelo Gerenciador de Projetos
    '''
    #Salvar no banco de dados
    try:
        def post(self):
            my_json = request.data.decode('utf8').replace("'", '"')
            data = json.loads(my_json)
            lista_strings = [str(numero) for numero in data]
            if data:                
                logFile(data[0]['erro'],'GP_caminho')
            
    except Exception as err:
        traceback.print_exc()
        logFile(err)


def logFile(strerro,GP_caminho=None):
    try:
        '''Criar arquivo de LOG '''
        ano = str(datetime.today().strftime('%y'))
        mes = str(datetime.today().strftime('%m'))
        dia = str(datetime.today().strftime('%d'))
        minuto = str(datetime.today().minute)
        caminho = os.getcwd()    
        print(caminho)
        if GP_caminho!= None:
            arquivo_nome = ano+mes+dia+minuto+"_logGP.log" 
            verificar_arquivo = caminho + "/"+arquivo_nome
            if os.path.isfile(verificar_arquivo) == False:
                arquivo_nome = ano+mes+dia+"_logGP.log" 
            arquivo_ = caminho + "/" +'Log/LogGP'+ "/" +arquivo_nome        
            Log_Format = "%(levelname)s %(asctime)s - %(message)s"
            logging.basicConfig(filename = veriarquivo,filemode = "w", format = Log_Format,level = logging.ERROR)
            logger = logging.getLogger()
            logger.error(strerro)            
        else:
            arquivo_nome = ano+mes+dia+"_logAPI.log"
            veriarquivo = caminho + "/" +'Log/LogAPI'+ "/" +arquivo_nome
            arquivo_nome = ano+mes+dia+"_logAPI.log"        
            if os.path.isfile(veriarquivo) == False:
                arquivo_nome = ano+mes+dia+"_logAPI.log"            
            Log_Format = "%(levelname)s %(asctime)s - %(message)s"
            logging.basicConfig(filename = veriarquivo,filemode = "w", format = Log_Format,level = logging.ERROR)
            logger = logging.getLogger()
            logger.error(strerro) 
    except Exception as err:
        traceback.print_exc()