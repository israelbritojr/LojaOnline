// Array para armazenamento de produtos
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Função para exibir produtos na vitrine
function exibirProdutos() {
    const vitrine = document.getElementById('vitrine');
    if (vitrine) {
        vitrine.innerHTML = '';
        produtos.forEach(produto => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h2>${produto.nome}</h2>
                <img src="${produto.img}" alt="${produto.nome}" style="width: 20em; height: 20em;">
                <h3>R$${produto.valor}</h3>
                <p>ou em 10x de R$${produto.valor/10},00 S/ JUROS</p>
            `;
            vitrine.appendChild(productDiv);
        });
    }
}

// Função para cadastrar um novo produto
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const valor = document.getElementById('valor').value;
        const fileInput = document.getElementById('imageUpload');
        const file = fileInput.files[0];

        // Verificar se o arquivo é PNG
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = e.target.result; // Obtém a URL da imagem em base64
                const novoProduto = { nome, img, valor };
                produtos.push(novoProduto);
                localStorage.setItem('produtos', JSON.stringify(produtos));
                alert('Produto cadastrado com sucesso!');
                formCadastro.reset();
                window.location.href = 'index.html';
            };
            reader.readAsDataURL(file); // Lê o arquivo como uma URL base64
        } else {
            alert('Por favor, selecione um arquivo PNG.');
        }
    });
}

// Função para listar todos os produtos
function listarProdutos() {
    const listaProdutos = document.getElementById('lista-produtos');
    if (listaProdutos) {
        listaProdutos.innerHTML = '';
        produtos.forEach((produto, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h2>${produto.nome}</h2>
                <img src="${produto.img}" alt="${produto.nome}" style="width: 20em; height: 20em;">
                <p>Valor: R$${produto.valor}</p>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="deletarProduto(${index})">Deletar</button>
            `;
            listaProdutos.appendChild(productDiv);
        });
    }
}

// Função para editar um produto
function editarProduto(index) {
    const produto = produtos[index];
    const nome = prompt('Nome:', produto.nome);
    const valor = prompt('Valor:', produto.valor);

    // Verificar se o usuário quer atualizar a imagem
    const novaImagem = confirm("Deseja alterar a imagem do produto?");
    let img = produto.img;
    if (novaImagem) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/png';
        fileInput.onchange = function() {
            const file = fileInput.files[0];
            if (file && file.type === 'image/png') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    img = e.target.result;
                    atualizarProduto(index, nome, img, valor);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Por favor, selecione um arquivo PNG.');
            }
        };
        fileInput.click();
    } else {
        atualizarProduto(index, nome, img, valor);
    }
}

function atualizarProduto(index, nome, img, valor) {
    produtos[index] = { nome, img, valor };
    localStorage.setItem('produtos', JSON.stringify(produtos));
    listarProdutos();
    exibirProdutos();
}

// Função para deletar um produto
function deletarProduto(index) {
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    listarProdutos();
    exibirProdutos();
}

// Inicialização
window.onload = () => {
    exibirProdutos();
    listarProdutos();
}
