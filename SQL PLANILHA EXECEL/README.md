# Biblioteca de Informacoes

Site estatico para criar uma biblioteca de informacoes usando Google Sheets como base de dados.

O sistema tem uma tela inicial com tutorial, criacao de acesso local e suporte para varias planilhas diferentes.

## Funcionalidades

- Criar acesso local por usuario e senha.
- Cadastrar varias planilhas Google diferentes.
- Escolher qual planilha fica ativa no momento.
- Criar categorias personalizadas por usuario.
- Guardar informacoes com titulo, categoria e conteudo.
- Consultar informacoes salvas na planilha ativa.
- Excluir informacoes diretamente pela tela de consulta.
- Filtrar por texto e categoria.
- Publicar facilmente no GitHub Pages.

## Importante sobre o login

O login deste projeto e local. Isso significa que usuario, senha e planilhas cadastradas ficam salvos apenas no navegador da pessoa, usando `localStorage`.

Esse login serve para organizar o uso da ferramenta, mas nao e uma autenticacao segura de servidor. Nao use senha importante.

## Arquivos do projeto

- `index.html`: site principal da biblioteca.
- `google-apps-script.gs`: codigo usado no Google Apps Script da planilha.
- `README.md`: instrucoes do projeto.

## Planilha usada

O Apps Script cria automaticamente uma aba chamada `Biblioteca` com as colunas:

```text
Data | Titulo | Categoria | Conteudo
```

## Apps Script

O projeto usa um Web App do Google Apps Script para salvar e consultar os dados da planilha.

Cada usuario cadastra suas proprias URLs de App da Web pela tela **Planilhas**. Um usuario novo comeca sem planilha cadastrada.

## Como configurar em outra planilha

1. Crie uma planilha no Google Sheets.
2. Dentro da planilha, clique em **Extensoes > Apps Script**.
3. Apague o codigo inicial.
4. Cole o conteudo do arquivo `google-apps-script.gs`.
5. Salve o projeto.
6. Clique em **Implantar > Nova implantacao**.
7. Escolha o tipo **App da Web**.
8. Em **Executar como**, escolha **Eu**.
9. Em **Quem pode acessar**, escolha **Qualquer pessoa**.
10. Clique em **Implantar**.
11. Copie a URL em **App da Web > URL**.

Atencao: copie a URL do **App da Web**, nao a URL de **Biblioteca**. A URL correta tem este formato:

```text
https://script.google.com/macros/s/SEU_CODIGO/exec
```

Depois, substitua a constante `DEFAULT_LIBRARY_URL` no `index.html` pela nova URL.

Se quiser usar varias planilhas, repita esse processo para cada planilha e cadastre cada URL dentro do sistema pela opcao **Adicionar planilha**.

## Como testar

Abra a URL do App da Web no navegador. Ela deve retornar um JSON parecido com:

```json
{"ok":true,"items":[]}
```

Para testar salvamento direto, abra:

```text
SUA_URL_DO_APP_DA_WEB?action=save&titulo=Teste&categoria=Geral&conteudo=Funcionando
```

Se funcionar, a planilha recebera uma nova linha.

Depois abra o `index.html` e teste:

1. Crie um acesso local na tela inicial.
2. Entre no sistema.
3. Clique em **Adicionar planilha**.
4. Informe um nome e cole a URL do App da Web.
5. Clique em **Planilhas** e use a planilha cadastrada.
6. Clique em **Guardar** e salve uma informacao.
7. Confira se apareceu uma linha nova na planilha.
8. Clique em **Pegar**.
9. Clique em **Pesquisar** para listar os registros.
10. Use **Excluir** em um registro para remover a linha da planilha.

## Categorias

Cada usuario pode usar as categorias padrao ou criar novas categorias pela tela **Guardar**.

Categorias padrao:

```text
Geral | SQL | Sistema | Contato | Processo | Outro
```

Ao clicar em **Nova**, o usuario informa o nome da categoria. Ela passa a aparecer no campo de categoria e tambem no filtro da tela **Pegar**.

As categorias aparecem na janela **Gerenciar categorias** e podem ser selecionadas ou excluidas. O sistema mantem pelo menos uma categoria para o formulario continuar funcionando.

## Como adicionar outra planilha

1. Crie ou abra outra planilha Google.
2. Configure o Apps Script com o mesmo codigo de `google-apps-script.gs`.
3. Publique como **App da Web**.
4. Copie a URL do **App da Web**.
5. No site, entre com seu usuario.
6. Clique em **Adicionar planilha**.
7. Informe um nome e cole a URL.
8. A nova planilha passa a aparecer na lista de bibliotecas.
