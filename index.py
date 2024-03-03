import random

palavras = [
    "python", 
    "programacao", 
    "desenvolvimento", 
    "computador", 
    "inteligencia", 
    "artificial", 
    "tecnologia", 
    "dados", 
    "aprendizado", 
    "machine", 
    "web", 
    "software", 
    "codigo", 
    "projeto", 
    "desafio"
]

palavra_sorteada = random.randrange(len(palavras))
palavra_sorteada = palavras[palavra_sorteada]

palpite = str(input("Digite uma letra: "))