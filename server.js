import express from 'express'; // Importa o módulo Express para criar a aplicação web
import routes from './src/routes/postsRoutes.js';

// Cria uma instância do Express e armazena em uma constante para facilitar o uso
const app = express();
app.use(express.static("uploads"));
routes(app)

// Inicia o servidor escutando por requisições na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log('Servidor escutando...');
});
