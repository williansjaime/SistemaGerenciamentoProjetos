import mysql.connector
import traceback
from APISistema.LogFile import LogFile

class DB_MySql:
    def __init__(self):
        self.connection = None

    def connect(self):
        try:
            hosts = "localhost"
            username = "root"
            password = "100415"
            database = "dbGerenciadorProjeto"
            self.connection = mysql.connector.connect(
                host=hosts,
                user=username,
                password=password,
                database=database)
        except Exception as err:
            traceback.print_exc()
            LogFile.logFile(err)
            self.connection = None