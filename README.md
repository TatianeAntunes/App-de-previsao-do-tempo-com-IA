<img width="870" height="437" alt="image" src="https://github.com/user-attachments/assets/2c1652be-ae36-45a4-aa2e-7162419f9371" />

Explicação completa de todos os arquivos do projeto

1. Visão geral do projeto
Este é um aplicativo web de previsão do tempo. A pessoa digita (ou fala) o nome de uma cidade e o app mostra a temperatura e a umidade daquele lugar. Além disso, há um botão que pede a uma inteligência artificial uma sugestão de qual roupa usar com base no clima.

<img width="1918" height="919" alt="image" src="https://github.com/user-attachments/assets/d9f16df9-3a43-4db0-9fc3-f0ad10f8dcd6" />

Como o projeto está organizado
<img width="885" height="339" alt="image" src="https://github.com/user-attachments/assets/4da8210b-dfde-4d0a-853f-ac02376b9742" />

2. O arquivo index.html — a estrutura
O HTML monta os elementos visíveis da página. Os principais são:
<img width="893" height="262" alt="image" src="https://github.com/user-attachments/assets/e1d74e13-97ab-436e-bd0d-21f5571e8e24" />


3. O arquivo styles.css — a aparência
O CSS define como cada parte da página se parece. Pontos importantes:
<img width="882" height="369" alt="image" src="https://github.com/user-attachments/assets/255737bf-751a-4ac5-a5a8-763385b35260" />



4.1 — função cliqueiNoBotao()
Executada ao clicar na lupa. O passo a passo dela é:

Pega o texto digitado no campo da cidade.
Monta o endereço (URL) do servidor de clima.
Usa fetch() para buscar os dados no servidor.
Converte a resposta para o formato JSON (um formato fácil de ler no JavaScript).
Escreve o resultado dentro da caixa usando innerHTML.
Por que async e await?

Buscar dados num servidor demora. A palavra await ("espere") faz o código pausar até a resposta chegar, evitando continuar com dados que ainda não existem. Toda função que usa await precisa ser marcada como async.

4.2 — função detectaVoz()
Executada ao clicar no microfone. Ela:

Liga o reconhecimento de voz do navegador, no idioma português (pt-BR).
Ouve o que a pessoa fala e transforma em texto (transcrição).
Coloca esse texto no campo da cidade.
Chama automaticamente cliqueiNoBotao() para buscar o clima.
4.3 — função pedirSugestaoRoupa()
Executada ao clicar no botão azul. Ela:

Lê a temperatura, a umidade e a cidade que já estão na tela.
Envia esses dados para uma IA (Groq) com um pedido de sugestão de roupa.
Recebe a resposta da IA e a exibe na tela.
A linha que mostra a resposta é:

document.querySelector(".resposta-ai").innerHTML = dados.choices[0].message.content
Lê-se assim: "encontre o elemento .resposta-ai na página e coloque dentro dele o texto da resposta da IA". O caminho dados.choices[0].message.content navega dentro do objeto JSON até chegar ao texto final.

5.
<img width="575" height="417" alt="image" src="https://github.com/user-attachments/assets/a5fb5c58-ca66-4c8e-b177-e877c30b784e" />
