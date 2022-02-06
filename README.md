# Medby-web
Esta é uma UI que consome a API do [Medby](https://github.com/GE28/medby-web), construída em React.js.

## Principais tecnologias utilizadas 
* **[Node.js](https://nodejs.org/pt-br/)**: Um runtime de desenvolvimento JavaScript que permite que a linguagem seja utilizada em nível back-end e sem a necessidade de um navegador.
* **[TypeScript](https://www.typescriptlang.org/)**: Uma linguagem de programação que estende o JavaScript comum para possibilitar a tipagem do código.
* **[React.js](https://pt-br.reactjs.org/)**: Uma biblioteca JavaScript muito conhecida para a construção de interfaces de usuário web
* **[Create React App](https://github.com/facebook/create-react-app)**: Ferramenta oficial para criar projetos React com o mínimo de configurações necessárias.
* **[Formik](https://formik.org/):** Uma biblioteca que facilita a criação de formulários em aplicações React

## Como usar
Por padrão a aplicação executa no endereço [http://localhost:3000](http://localhost:3000/)

É necessário ter o NodeJS (versão 13 ou superior) disponível na máquina

* É recomendado que faça a instalação através de um gerenciador de pacotes (https://nodejs.org/en/download/package-manager/)
* Ou baixe o instalador para a sua plataforma através do site oficial (https://nodejs.org/en/download/)

Também é necessária a parte back-end da aplicação **em execução** para o funcionamento correto. Siga as instruções em: https://github.com/GE28/medby-web

**Primeiro, clone este repositório através do comando abaixo:**
```bash
git clone https://www.github.com/GE28/medby-web
```

**Após isso, navegue até o diretório do projeto e instale os arquivos necessários para a execução do código:**
```bash
cd ./medby-web
npm install
```

**Para executar em modo de desenvolvimento:**
```bash
npm start
```

**Também é possível criar uma versão otimizada da aplicação, pronta para ser executada, através dos comandos:**
```bash
npm build
```
E então, um arquivo .js será criado na pasta `build`, que poderá ser executado em navegadores.

## Licença

Medby-web está sob licença [MIT](./LICENSE).
