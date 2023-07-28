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
 

# stream
vamos criar uma pasta temporaria chamada stream para entendermos os conceitos do stream no node.
o stream é muito importante para o node e ele é oresponsavel pelo sucesso do node.
o stream permite que a gente obtenha e leia pequenas partes de algo mesmo sem estar com ele todo carregado.
a gente pode trabalhar com qaueles dados mesmo antes de ter aquele arquivo por completo.
imagina que vams fazer uma importação de clientes via excel
é comum que a gente forneça para o usuario uma certa importação, o usuario da um upload de um aquivo em csv e a gente vai salvar ele no nosso sistema.
mas imagina que o usuario vai mandar algo de um giga de tamanho. se a gente não estiver utilizando o stream e a gente permitir que isso aconteça o usuario vai subir o csv e ele vai ser enviado atravez por exemplo de uma rota post algo como
POST /upload import.csv
o node vai ter que ler esse arquivo completo e depois disso ele vai percorrer o arquivo inteiro fazendo cada uma das operações de post dele.
agora imagina que o upload com a net da pessoa seja 10mb/s  vai demorar 100segudos para ela conseguir subir o arquivo. antes que o node comece a ler o arquivo e comece a fazer as incersoes.
com o conceito de stream a gente pode ter a vantagem de que no primeiro segundo do upload ja entrou 10mg ali o node podia começar a ler esses dez megas, e ja ir começando a inserir ele no banco de dados, antes de esperar todo 1 giga ser enviado para o servidor.
ou seja enquanto o upload esta sendo feito nos ja vamos processando ele.
então temos ai dois tipos de stream

os readble stream - stream de leitura - exemplo do csv - estamos lendo a informação aos poucos.

writable stream - stream de escritura - netflix spotfy - nos estamos enviando (escrevendo para o usuario) uma informação aos poucos

vamos criar esses conceitos em nossa aplicação.
no node toda porta de entrada e saida é automaticamente uma stream
ou seja o req e o res são streams.
então ao fazer uma requisição http, eu posso manter essa requisição aberta e enviar dados para ela aos poucos.
a mesma coisa quando devolvemos uma resposta, podemos devolver aos poucos.
no node temos varias portas de entrada e saida. alem da das portas req e res nos vamos lidar para entender esse conceito com o processo do node. o stdin e stdout
que é o que nos digitamos no terminal.


# solução vs code sem reconhecer o node
para solucionar isso nos precisamos adicionar o tipo node ao pacakge json.
com o comando  npm install --save-dev @types/node

agora ele vai reconhecer coisas com process e etc.

# criando um stream de leitura
vamos pegar o process é o processo que acontece no node
o stdin retorna uma string conectada a ele. o std é = tudo que o usuario digita no terminal, por isso são strings
depois disso vamos dar um .pipe() que é o encanamento no node a gente vai conectando as streams então por isso o pipe então se a gente pode ler dados aos poucos, a gente pode enviar esses dados aos poucos para uma stream que vai tratar deles. ai dentro do pipe vamos utilizar o process.stdout que vai ser o retorno da aplicação no terminal para mostrar como isso funciona.
fica assim e vamos executar esse arquivo
 node src/stream/fundamentsJS.js

 ai o node fica rodando e tudo que a gente digitar no terminal e der enter ele devolve a mesma coisa para nos.

 em outras palavras com o codigo que fizemos tudo que recebemos de entrada nos encaminhamos atravez do pipe para uma saida, o stdout. essa stream é de leitura e escrita por isso, estou lendo e escrevendo.
 agora vamos construir streams do zero dentr de um projeto.
 vamos  importr do node:stream a readeble e vamos criar uma classe que extende o readeble fica assim:
 import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
    
}

toda classe readelbe recebe obrigatoriamenteo metodo _read() {}
esse metodo vai retornar quais são os dados dessa stream
vamos fazer essa função ir de um pra cem então vamos criar uma const index = 1
e dentro do read vamos fazer const i = this.index++
ou seja ir somando 1
agora vamos fazer
se o i for maior que 100 vamos executar this.push(null) push é o metodo para uma stream fornecer informações para quem estiver consumindo ela. ou seja dessa forma significa que ao ser maior que 100 não tem mais informações para serem adicionadas. ou seja, para.
caso sontrario queremo enviar o i então fazemos um this.push(i)
fica assim:
import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
    _read() {
        const i = this.index++

    if (i > 100) {
        this.push(null)
    } else {
        this.push(i)
    }
    }
}
new OneToHundredStream().pipe(process.stdout)
a linha do new é para ler a stream enquanto ele esta lendo a stream ele ja vai escrevendo.

porem esse codigo da erro.
porque?
dentro da stream eu não posso trabalhar apenas com strings ou numeros. o pedaço de dados que eu estou consumindo (chamado de chunk) não pode estar em um tipo primitivo (stinrg, numero, boolean etc). a gente precisa trabalhar com o formato de buffer.
então vamos criar uma variavel buff = Buffer.from(i)
esse Buffer.from(i) vai receber qual informação eu quero converter nesse formato buffer e ai damos push buff e não push i. porem o buffer não aceita numeros, apenas string, então temos quedar um String *não stringfy*. fica assim:
import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
    _read() {
        const i = this.index++

    if (i > 100) {
        this.push(null)
    } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
    }
    }
}
new OneToHundredStream().pipe(process.stdout)

vamos deixar isso mais interessante. ao inves de apenas ler o i e adicionar mais 1 a gente colocar esse codigo dentro de um setTimeout dessa forma nos poderemos ver o funcionamento da stream indo aos poucos e andando e criando o resultado.
um setTimeout normal demoraria um tempo para iniciar e quando iniciasse mostraria todos os numeros muito rapido(praticamente de vez).
com uma stream ele vai mostrando cada numero aos poucos porque mesmo ates de terminar de ler ele ja entregou o primeiro ciclo e escreveu, depois ele inicia o segundo cilco e escreve etc.
então para resumo com stream a gente consegue ir trabalhando os dados antes de eles estarem completamente processados.
a gente fez essa stream do Zero mas os modulos internos do node vao nos permitir de não precisar fazer sempre do zero, por exemplo o req e res ja são streams se a gente der req.pipe ele ja aparece.

# stream de escritura
vai receber dados de uma stream de leitura e fazer algo com eles. como por exemplo o stdout na nossa função anterior que escrivia os numeros no terminal.
vamos fazer nossa stream de escritura. vamos importar writable
vamos tambem fazer a classe e extender o wrtible
class multiplyByTenStream extends Writable {
    _write
}
colocamos o metodo write la dentro e ess metodo recebe tres parametros chunk encoding e callback

o chunk é o pedaço que a genteleu na stream de leitura; ou seja o que esta no .push.
encoding é como essa informação eta codificada callback é a função que a stream de escrita precisa chamar quando ela terminar de fazer o que ela precisa com essa informação.
dentro de uma stream de escrita a gente não retorna nada. ela processa o dado. ela nunca transforma o dado em outra coisa, ela so processa.
então vamos colocar ela pra escrever no console.log
vamos pegar o chunk que é o buffer o chunk = this.push(buff) da função anterior, precisamos converter ele em uma string com o .toString() vamos colocar tudo dentro de um number para transformar essa string em um numero. e depois vamos multiplicar tudo por10 depois disso chamamos a callback pra demonstrar que encerrou. o encoding por enquanto não usamos. . fica assim:
class multiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback() 
    }
}
agora no lugar do pipe ao invez do stdout a gente vai colocar uma new multiplybytenstream() fica assim:

class multiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback() 
    }
}


new OneToHundredStream()
.pipe(new multiplyByTenStream())

# stream de transformação
essa stream funciona para transformar um chunk em outro.
vamos criar uma para transformar todo o numero em numero negativo.
vamos importar o transform e fazer a classe, o parametro transform recebe os mesmos do wrtite chunk encoding callback
class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback)
}
a diferença é que agora ao inves de um console.log e mudar o dado como eu quiser a gente vai pegar o dado com uma const. fica assim para transformar em negativo
 _transform(chunk, encoding, callback) {
    const transformedNumber = Number(chunk.toString()) * -1
}
agora quando chamarmos o callback vamos enviar para ele como primeiro parametro o null isso para representar o erro, caso tenha um erro ele vai retornar nulo o segundo parametro é o transformado. então vamos colocar o transformedNumber como um buffer e como string.
fica assim:
class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback) {
    const transformedNumber = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformedNumber)))

}
}

agora la na nossa chamada a gente vai colocar um novo pipe antes do pipe do write para ele primeiro usar o transformed. ou seja é uma conexão que fazemos antes.
a stream de leitura ela le dados, a de escrita escreve dados. a de transformação precisa ler dados e escrever. porque para transformar vc tem que ter a materia prima e tem que devolver algo.

tem o ulimo tipo de stream que é a duplex que pode servir tanto para leitura quanto para escrita.
podemos pensar em uma streamduplex como sendo um aquivo do nosso sistema. se a gente abre um novo file a gente pode tanto escrever quanto ler ele.
mas néao necessariamente podemos transformar algo nele.

na pasta de stream vamos criar um servidor http a parte para poder conectar o que a gente viu de steramcom os conhecimentos de http. nesse arquivo vamos criar um servidor http:
import http from 'node:http'

const server = http.createServer((req, res) => {
    
})
sever.listen(3334)
feito isso vamos criar outro arquivo chamado fakeuploadtoserver.
e nele vamos criar uma requisição ficticia, como se fosse o frontend chamando uma requisição pesada que precisa ser enviada ao backend.
vamos copiar o oneToHundredStream nesse novo arquivo.
o node ja suporta a fetch api nativamente. então podemos utilizar a fetchApi para lidar com requisições de um endereço para outro.
então no fim do arquivo fake vamos chamar a fetch de tro dela passamos o endereço do backend e no segundo arguento enviamos o metodo post porque para simular que estamos enviando uma informação aos poucos a stream so vai ser enviada por metodo post ou put, os outros medotos vao ser para um backend que vai dar write. e no body que é o conteudo da requisição vamos passar a new oneToHundredStream(). 
fica assim:
 fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
  })

  agora vamos no nosso servidor http e vamos copiar a inverse do e colocar ela antes da const server. 
  agora dentro do server a gente vai pegar a req que é uma stream tambem. a gente pode pensar no req como uma readeble stream e o res como uma writable stream.
  vamos dar um console.log na nossa inverseStream pegando a variavl transform.
  agora dentro do nosso server a gente vai fazer um return.
  pegar a req dar um pipe nela e esse pipe vai encaminhar a requisição para passar pela nossa função de inverse. e depois damos outro pipe para reencaminhar ela para a nossa resposta.
  em outras palavras, da no mesmo de fazer isso:
  new OneToHundredStream()
.pipe(new InverseNumbersStream())

so que ao invess de criarmos as streams de leitura e escrita a gente ta usando as stream ja criadas pelo node.
a pagina fica assim:
import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback) {
    const transformedNumber = Number(chunk.toString()) * -1
    console.log(transformedNumber)
        callback(null, Buffer.from(String(transformedNumber)))
}
}

const server = http.createServer((req, res) => {
return req
.pipe(new InverseNumbersStream())
.pipe(res)
})
server.listen(3334)

agora  gente executa o nosso server, para ele escutar a porta 3334 e em outro terminal executamos tambem o nosso fake upload to server.



