import traceback
import mysql.connector
from LogFile import LogFile

class AcessarBanco():
    def DB_Mysql():
        Mysql = None
        try:
            hosts = "localhost"
            username= "root"
            password= "100415"
            database= "DadosSistemaSolar"
            sslmode = "require"
            Mysql = mysql.connector.connect(
                host=hosts,
                user=username,
                password=password,
                database=database)
            return Mysql      
        except Exception as err:
            traceback.print_exc()  
            LogFile.logFile(err)
