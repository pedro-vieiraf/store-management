Banco de dados

    usuários: email, senha;
    clientes: nome, cpf;
    endereço: todos os campos de endereço;
    telefones: cliente, número;
    produtos: colocar os dados necessários para um tipo de produto, além de preço.
    vendas: cliente, produto, quantidade, preço unitário, preço total, data e hora.

Rotas do sistema

O sistema deve contar com rotas para:

cadastro de usuário do sistema (signup);
login com JWT de usuário cadastrado (login);

clientes:
    listar todos os clientes cadastrados (index)
        apenas dados principais devem vir aqui;
        ordenar pelo id;
    detalhar um(a) cliente e vendas a ele(a) (show):
        trazer as vendas mais recentes primeiro;
        possibilidade de filtrar as vendas por mês + ano;
    adicionar um(a) cliente (store);
    editar um(a) cliente (update);
    excluir um(a) cliente e vendas a ele(a) (delete);
produtos:
    listar todos os produtos cadastrados (index):
        apenas dados principais devem vir aqui;
        ordenar alfabeticamente.
    detalhar um produto (show);
    criar um produto (store);
    editar um produto (update);
    exclusão lógica ("soft delete") de um produto (delete);
vendas:
    registrar venda de 1 produto a 1 cliente (store).

Observação: as rotas em clientes, produtos e vendas só devem poder ser acessadas por usuário logado.

Requisitos

São requisitos básicos:
    estruturar o sistema observando o MVC (porém, sem as views);
    usar MySQL como banco de dados;
    respostas devem ser em JSON;
    pode-se usar recursos e bibliotecas que auxiliam na administração do banco de dados (Eloquent, Lucid, Knex, Bookshelf etc.);
    documentar as instruções necessárias em um README (requisitos, como instalar e rodar o projeto, detalhamento de rotas e outras informações que julgar relevantes).
