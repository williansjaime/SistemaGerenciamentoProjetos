# SistemaGerenciamentoProjetos BackEnd
Objetivo montar uma API para comunicação do dados do banco e o sistema

# Intalar o Python3 no linux
sudo apt-get install python3

# Criar o ambiente virtual para manter as dependencias
python3 -m venv apigerenciamentoprojeto

# Comando para ativar o ambiente virtual
source apigerenciamentoprojeto/bin/activate

# Criar arquivo de biblioteca em python
pip freeze > requirements.txt 

# Sempre que instalar biblioteca usar esse comando
pip freeze 

# Executar sistema no linux terminal
flask --app app run --debug