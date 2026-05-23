/* 1o criar o algoritmo de como vai funcionar as coisas 

Fluxo básico 
[ ] Descobrir quando o botão foi clicado
[ ] Pegar o nome da cidade no input
[ ] Enviar a cidade para o servidor 
[ ] Pegar a resposta e colocar na tela 

Fluxo de voz 
[ ] Descobrir quando o botão foi clicado 
[ ] Começar a ouvir e pegar a transcrição 
[ ] Enviar transcrição para o servidor 
[ ] Pegar a resposta e colocar na tela 

Fluxo da IA 
[ ] Pegar os dados da IA ...

*/

// Cole aqui sua chave do OpenWeather: https://openweathermap.org/api
let chave = "COLE_SUA_CHAVE_OPENWEATHER_AQUI"
// Cole aqui sua chave da Groq: https://console.groq.com/keys
let chaveIA = "COLE_SUA_CHAVE_GROQ_AQUI"

//"async" e "await" andam juntos == é uma promessa, ou seja, o "await" == espere, está falando que vai voltar neste ponto do código 
async function cliqueiNoBotao(){
    let cidade = document.querySelector(".input-cidade").value
    let endereco = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${chave}&units=metric&lang=pt_br`
    let caixa = document.querySelector(".caixa-media")

    // Precisa avisar o JavaScript que eu vou até o servidor
    // traduza a resposta do servidor para o formato de Json
    let respostaServidor = await fetch(endereco)//"fetch()" vá no servidor e busque informação
    let dadosJson = await respostaServidor.json()
    if(dadosJson.cod !== 200){
        caixa.innerHTML = `<p style="color:#fff">Cidade não encontrada 😕</p>`
        return
    }

    // math.floor arredonda para baixo 
    // 'innerHTML' vai inserir o nome da cidade 
    caixa.innerHTML =`
        <h2 class="cidade"> ${dadosJson.name} </h2>  
        <p class="temp"> ${Math.floor (dadosJson.main.temp)} ℃ </p>
        <img class="icone" src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}.png"> 
        

        <p class="umidade">Umidade: ${dadosJson.main.humidity} %</p>
        <button class="botao-ia" onclick="pedirSugestaoRoupa()">Sugestão de Roupa</button>
        <p class="resposta-ia">Resposta da IA</p>
    ` 
}

function detectaVoz(){
    if (!("webkitSpeechRecognition" in window)) {
        alert("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.")
        return
    }

    let reconhecimento = new window.webkitSpeechRecognition()
    reconhecimento.lang = "pt-BR"
    reconhecimento.start()

    reconhecimento.onresult = function(evento){
        let textoTranscrito = evento.results[0][0].transcript
        document.querySelector(".input-cidade").value = textoTranscrito
        cliqueiNoBotao()
    }

}

async function pedirSugestaoRoupa(){
    let temperatura = document.querySelector(".temp").textContent
    let umidade = document.querySelector(".umidade").textContent
    let cidade  = document.querySelector(".cidade").textContent

    let resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + chaveIA // chaveIA == a token    
        },
        body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    "role": "user",
                    "content": `Me dê uma sugestão de qual roupa devo usar hoje.
                                Estou na cidade de: ${cidade}, a temperatura atual é: ${temperatura}
                                e a umidade está em: ${umidade}.
                                Me dê sugestões em 2 frases curtas 
                                
                                `
                },
            ]
        })
    })

    let dados = await resposta.json()
    
    //mostrar na tela a resposta da IA
    document.querySelector(".resposta-ia").innerHTML = dados.choices[0].message.content

}