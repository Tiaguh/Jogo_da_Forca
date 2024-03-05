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

palavra_sorteada = random.choice(palavras)
palavra_a_ser_adivinhada = ['_' for i in palavra_sorteada ]

while '_' in palavra_a_ser_adivinhada: 
    palpite = input("Digite uma letra: ").lower()  

    if palpite in palavra_sorteada:
        for i in range(len(palavra_sorteada)):
            if palavra_sorteada[i] == palpite:
                palavra_a_ser_adivinhada[i] = palpite
    else:
        print("Letra incorreta. Tente novamente.")

    print("Palavra: " + ' '.join(palavra_a_ser_adivinhada))

print("Parabéns! Você adivinhou a palavra:", palavra_sorteada)