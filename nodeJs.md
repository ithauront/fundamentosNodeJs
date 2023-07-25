ao entrar na pasta do projeto a primeira coisa a fazer é dar um 

npm init -y

isso cria o arquivo package.json
é ele que vai armawenar as dependencias do nosso projeto.
vamos criar a pasta src e dentro dela um arquivo chamado server.js poderia ser index tambem mas no node por estarmos criando um servidor é mais legal chamarmos de server. ele vai ser o arquivo principal da aplicação. dentro dele a gente pode escrever qualquer codigo js.
se a gente fizer const a =2 e const b =3 e dar um console.log(a +b) e executar ele usando node src/server.js
ele vai retornar 10 no terminal.
se executa ele usando node
porem é bom saber que nos não vamos ter acesso as api especificas do browser como document.querySelector etc. porque são coisas especificas do browser.
porem o node nos da varios modulos que a gente possa usar. uma delas é o modulo de http
# modulo http 
para impostar esse modulo a gente pode usar
const http = require('http') - isso é um padrão de importação usando o require chamado de communJS 
esse modulo possui varias funcionalidades para construir aplicações http. com isso vamos criar rotas, get, post etc.
hoje em dia a gente praticamente não usa mais esse padrão, vamos usar o ESmodules, onde as importaões e exportação vao usar o import export. o problema é que por padrão o node não suporta ESmodules, para fazer ele suportar dentro do packageJSON a gente tem que colocar um 'type': "module"
como existe importações de fora do node, o node pede para a gente que quando formos importar algo que é de dentro do node a gente coloque node:o nome da imoortação. assim:
import http from 'node:http'
vamos criar nosso primeiro server:
const server = http.createServer(()=>{
    
})
pegamos a função createServer de dentro do http, e passamos para ele como unico parametro uma arrow function.
e por fim e fora da função damos um server.listen(3333)
isso significa que nosso servidor vai estar ouvindo a porta 3333.
a nossa arrow function recebe dois parametros.
req, res
ou seja request e response.
dentro do rew nos obtemos todas as informações da requisiçõe que chega el nosso servidor. e o res vai dar uma resposta a quem champou o servidor.
a gente pode dar uma resposta de helloworld dessa forma:
import http from 'node:http'


import http from 'node:http'


const server = http.createServer((req, res)=>{
return res.end('hello world')
})

server.listen(3333)

executamos com node src/server.js
e ele vai ficar executando sem dizer nada porque ele esta ouvindo a porta 3333
ai abrimos nosso navegador na porta 3333
e ele vai mostrar la o helloworld.
