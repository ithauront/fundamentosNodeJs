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
return res.end('hello start ')
})

server.listen(3333)

executamos com node src/server.js
e ele vai ficar executando sem dizer nada porque ele esta ouvindo a porta 3333
ai abrimos nosso navegador na porta 3333
e ele vai mostrar la o helloworld.

o node não fica observando o servidor e restartando ele a cada mudança que a gennte faz então isso pode levar a confusão de não ver o que fazemos surtir efeito. para evitar isso vamos logo no inicio do projeto fazer um watch. então ao executarmos o node vamos executar com watch
node --watch src/server.js
por qlgum motivo não funciona comigo, talvez por conta da memoria do pc.
vamos adicionar um scrip de dev para fazer essa chamada agora podemos rodar com o npm run dev.
o scrip fica assim no package jason
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node --watch src/server.js"
  },

  # rotas
  rotas são caminhos de entrada para serem utilizados pela nossa api. ou seja quando um frontEdn for consumir nossa aplicação ele vai fazer atravez de rotas. meio de entrada e forma de usar nossa api como listar usuarios, remover usuarios, adicionar usuarios etc.
  uma requisição http é composta dedois recursos principais.
  o metodo http e a url
  no backend a gente recebe essas informações atravez do req
  podemos dar uma olhada neles usando a const 
  const {method, URL} = req

  então se a gente deixar o codigo assim e rodar ele 
  import http from 'node:http'


const server = http.createServer((req, res)=>{
    const {method, url} = req
    console.log(method, url)
return res.end('hello world')
})

server.listen(3333)

no nosso console.log de onde a gente esta rodando o npm run dev a gente vai ter o get / ou seja o metodo e o endereço. e no nosso terminal que rodarmos o http localhost:3333 teremos o hellowordl.

se a gente tivesse colocardo http localhost:3333/users
ele teria mostrado get /users
podemos trocar tambem o metodo da requisiçõ.
se a gente rodar isso:
http POST localhost:3333/users

o console.log de onde temos o node rodando vai nos dar isso 
POST /users

dentro  do http temos varios metodos mas os que vamos usar mais são os
GET
POST
DELETE
PATCH
PUT
os 5 que vamos sar sempre.
eles são mais semanticos do que fucnionais, na verdade podemos usar quaquer um mas semanticamente tem diferença
* GET 
usado quando vou buscar uma informação do backend

* POST
para criar alguma recurso no backend

* PUT 
para editar ou atualizar um recurso no backend

* PATCH
confundivel com o put mas ele serve principalmente para atualizar uma informação UNIca ou especifica de um recurso no backend put é para atualizar praticamente tudo em uma entidade. o patch é para atualizar so uma pequena coisa.
por exemplo o usuario vai atualizar seu formulario de usuario, foto, nome, descrição etc. usa o put.
temos uma rota para atualizar apenas se o usuario quer ou nõ receber notificação. usamos o patch, é algo especifico.

* DELETE 
serve para deletar um recurso do backend

no backend vamos diferenciar cada rota unicamente pela soma do metodo com a url.
o que quer dizer que posso ter duas rotas no meu backend
ex
/users as duas serem a mesma url porem com metodos diferentes dessa forma
POST /users => criou um usuario no backend
DELETE /users => deletou um usuario do backend

uma forma simples de a gente fazer isso para iniciar, que vai ser melhorada depois é com if
vamos ver que como o primeiro if ja da um return nos chamamos isso de early return, o java script se isso for verdadeiro nem le o resto da função então podemos na segunda continuar com um novo if
import http from 'node:http'


const server = http.createServer((req, res)=>{
    const {method, url} = req
    
if (method === 'GET' && url === '/users') {
    return res.end('listagem de usuarios')
}
if (method === 'POST' && url === '/users') {
    return res.end('usuario adicionado')
}
return res.end('hello world')
})

server.listen(3333)


com esse codigo vamos ter la onde fazemos a requizição um retorno de usuario adicionado ou listagem de usuario a depender do que usarmos em nossarequisiçãp e se fizermos na /users. se não vai ser helloworld 

# add users
vamos salvar os usuarios dentro da memoria de nossa aplicação.
,no node o projeto fica executando até se parar o projeto com cntrl c então todo que a gente declarar vai ficando salvo na memoria do node.
isso é o ocnceito statefull 
o statefull sempre vai ter agum tipo e informação sendo guardado em memoria, a aplicação depende das informação que sao salvas em memoria para continuar funcionando. caso ela perca seus dados e as informações em memoria ela pode não funcionar mais como estava
uma aplicação stateless não salva nada em memoria então se a gente parar a aplicação e rodar ela de novo tudo vai se manter igual.
porquequanto vamos criar uma ap statefull.
vamos criar uma constante users que vai ser um array vazio.
e a gente pode colocar um novo usuario dessa forma:
if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        name: 'jhon doe',
        email: 'jhon@doe.com'
    })
    return res.end('usuario adicionado')

    porem para ver o usuario criado no pofdemos fazerso:
    if (method === 'GET' && url === '/users') {
    return res.end(users)

    porque a resposta do backend nao pode ser so um array
    ela pode ser uma string um buffer ou um uint8array (que tem a ver com o buffer)
    por isso vamos transformar o array em json, assim ele voltqa como string.
    para isso a gente vai fazer o JSON.stringfy(users)
    claro que sempre que a gente resetar o servidor a gente perde os informações, por isso a aplicação statefull é problematica em produção, não podemos perder os dados do servidor. por isso nos usamos mecanismos como banco de dados queveremos a frente.
    a nossa app esta assim e esta postando e trazendo de volta o users ela esta assim:
    import http from 'node:http'

const users = []
const server = http.createServer((req, res)=>{


    const {method, url} = req
    
if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users))
}
if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        name: 'jhon doe',
        email: 'jhon@doe.com'
    })
    return res.end('usuario adicionado')
}
return res.end('hello world')
})

server.listen(3333)


porem, como o front end vai saber que trouxemos de volta um json?
por isso é necessario o cabeçalho

# headers
tanto da req quanto da res eles são metadados e metadados são informações para que o back e o front end saiba lidar com aqueles dados da melhor forma.
o headers não são bem a ver com o dado em si, mas sim meio que um manual de instruções para como o dado devo ser interpretado.
então la no res.end vamos separar para ficar assim
res
.end
e vamos setar tambem headers fica 
res
.setHeader(' aqui comocamos nome do cabeçalho  )
.end()

podemos pesquisar header mdn que tem uma lista de varios cabeçalhos comuns para termos em requisições. nos podemos dar o nome que quisermos mas tem alguns que são padroes de serem usados em api como o Content-type, onde a gente fala o conteudo e o tipo o tipo json vamos chamar de aplication/json
fica assim:
import http from 'node:http'

const users = []
const server = http.createServer((req, res)=>{


    const {method, url} = req
    
if (method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-type', 'aplication/json')
    .end(JSON.stringify(users))
}
if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        name: 'jhon doe',
        email: 'jhon@doe.com'
    })
    return res.end('usuario adicionado')
}
return res.end('hello world')
})

server.listen(3333)

dessa forma ele ja entende o que é e quando devolve para a gente ja devolve na estrutura mais correta, dentro do array e do objeto.

é bom saber que o frontend tambem envia headers em cada requisição
e a cada devoulção do backend tambem vamos mandar com headers.
se a gente der um req.headers a gente vai vr os metadados da requisição.

# http status code
quando devolvemos uma resposta cpara o frontend temos varios tipos de codigos numericos que enviamos para o frentend para dizer para o frontend o qeu aconteceu, erro, qual tipo de erro, se deu certo, qua tipo de informação estamos dando, etc. 
se a gente procurar mdn http status code encontramos um guia com os status code mais importante
eles tem 3 numeros e caminham por centenas de 100 a 600 e cada casa de centena se relaciona ao mesmo tipo de ocorrencia tipo 400 erros.
o 200 é ok e é um padrão caso de sucesso ela responde 200 a n éao ser que a gente modifique ela.
os 300 são redirecionamentos
400 erros da parte do cliente ou seja o cliente informou um endereço errado, um email errado algo errado
500 a 600 (termina em 599 não tem600) erro do server, o server não conseguiu responder por qlgum motivo. são erros inesperados, algo esta errado no backend. o banco de dados fora do ar por exemplo.

como vamos usar isso então.
na nossa resposta, não precisamos colocar algo como usuario criado, isso foi so para visualizar. e na resposta podemos informar o status ode usando o metodo writeHead(201) o 201 nesse caso simboliza uma resposta de sucesso de criação de algo.
com isso ele vai simbolizar para o frontend que foi criado. e isso vem no cabeçalho que podemos ver com o httpie. fica assim
if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        name: 'jhon doe',
        email: 'jhon@doe.com'
    })
    return res.writeHead(201).end()
}

ao lançar o post o http a gente recebe isso
HTTP/1.1 201 Created
Connection: keep-alive
Date: Wed, 26 Jul 2023 14:30:49 GMT
Keep-Alive: timeout=5
Transfer-Encoding: chunked

repare que tem o 201 created.
paa brincar vamos fazer que se nem a rota de get nem a de post for chamada, vamos retornar um 404 de not found
 



