# README

Este README fornece instruções detalhadas para configurar o projeto **API de Gerenciamento de Contatos**, incluindo todas as configurações necessárias para a aplicação, API e banco de dados.

---

## **1. Requisitos Prévios**

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

1. **Node.js** (versão 14 ou superior) - [Baixar Node.js](https://nodejs.org/)
2. **MySQL Server** (versão 5.7 ou superior) - [Baixar MySQL](https://dev.mysql.com/downloads/)
3. **Postman** (para testar a API) - [Baixar Postman](https://www.postman.com/downloads/)
4. Um terminal ou ferramenta de linha de comando (e.g., Prompt de Comando, Bash ou PowerShell).

---

## **2. Configuração do Projeto**

### **2.1 Clonar o Repositório**
1. Abra o terminal e navegue até o diretório desejado.
2. Clone o repositório do projeto:
   ```bash
   git clone git@github.com:JulianoSudecum/contact-manager.git
   ```
3. Navegue para a pasta do projeto:
   ```bash
   cd contact-manager
   ```

### **2.2 Instalar Dependências**
Execute o seguinte comando para instalar todas as dependências necessárias do Node.js:
```bash
npm install
```

### **2.3 Configuração do Ambiente**
1. Crie um arquivo `.env` no diretório raiz do projeto:
   ```bash
   touch .env
   ```
2. Adicione a seguinte configuração ao arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_DATABASE=contact_manager
   ```
3. Substitua `sua_senha` pela senha real do usuário root do MySQL (ou outro usuário com privilégios suficientes).

---

## **3. Configuração do Banco de Dados**

### **3.1 Iniciar o Servidor MySQL**
Certifique-se de que o servidor MySQL está em execução no seu sistema. Abra o cliente de linha de comando do MySQL ou uma ferramenta de gerenciamento de banco de dados (e.g., MySQL Workbench).

### **3.2 Criar o Banco de Dados**
Execute os seguintes comandos SQL para criar o banco de dados e as tabelas:

#### **Criar o Banco de Dados**
```sql
CREATE DATABASE contact_manager;
USE contact_manager;
```

#### **Criar as Tabelas**

1. **Tabela `contacts`**:
   ```sql
   CREATE TABLE contacts (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       phone VARCHAR(15) UNIQUE NOT NULL
   );
   ```

2. **Tabela `groups`**:
   ```sql
   CREATE TABLE `groups` (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) UNIQUE NOT NULL
   );
   ```

3. **Tabela `contacts_groups`**:
   ```sql
   CREATE TABLE contacts_groups (
       contact_id INT,
       group_id INT,
       PRIMARY KEY (contact_id, group_id),
       FOREIGN KEY (contact_id) REFERENCES contacts(id),
       FOREIGN KEY (group_id) REFERENCES `groups`(id)
   );
   ```

### **3.3 Verificar a Configuração**
Execute o seguinte comando para verificar se todas as tabelas foram criadas:
```sql
SHOW TABLES;
```
Você deve ver as tabelas `contacts`, `groups` e `contacts_groups` na lista.

---

## **4. Executando a Aplicação**

### **4.1 Iniciar o Servidor**
1. Execute o seguinte comando para iniciar o servidor:
   ```bash
   npm run dev
   ```
2. Se bem-sucedido, você verá:
   ```
   Server is running on port 3000
   Connected to the database!
   ```

### **4.2 Testar a API**
Use o **Postman** ou outro cliente de API para testar os endpoints. Abaixo estão as rotas disponíveis:

#### **Rotas de Contatos**
1. **Criar um Contato**:
   - **POST** `/contacts`
   - Corpo:
     ```json
     {
       "name": "João Silva",
       "phone": "(11) 98765-4321"
     }
     ```
   - Resposta:
     ```json
     {
       "id": 1,
       "name": "João Silva",
       "phone": "(11) 98765-4321"
     }
     ```

2. **Listar Todos os Contatos (Paginado)**:
   - **GET** `/contacts?page=1&limit=10`
   - Resposta:
     ```json
     [
       {
         "id": 1,
         "name": "João Silva",
         "phone": "(11) 98765-4321"
       }
     ]
     ```

3. **Atualizar um Contato**:
   - **PATCH** `/contacts/:id`
   - Corpo:
     ```json
     {
       "name": "Maria Souza",
       "phone": "(21) 98765-4321"
     }
     ```

4. **Excluir um Contato**:
   - **DELETE** `/contacts/:id`

#### **Rotas de Grupos**
1. **Criar um Grupo**:
   - **POST** `/groups`
   - Corpo:
     ```json
     {
       "name": "Friends"
     }
     ```
   - Resposta:
     ```json
     {
       "id": 1,
       "name": "Friends"
     }
     ```

2. **Atualizar um Grupo**:
   - **PATCH** `/groups/:id`
   - Corpo:
     ```json
     {
       "name": "Family"
     }
     ```
   - Resposta:
     ```json
     {
       "id": 1,
       "name": "Family"
     }
     ```

3. **Excluir um Grupo**:
   - **DELETE** `/groups/:id`
   - Resposta: Status **204 No Content**

4. **Listar Todos os Contatos de um Grupo**:
   - **GET** `/groups/:id/contacts`
   - Resposta:
     ```json
     [
       {
         "contact_id": 1,
         "name": "John Doe",
         "phone": "(123) 456-7890"
       }
     ]
     ```

#### **Rotas de Associação de Contatos e Grupos**
1. **Adicionar Contato a um Grupo**:
   - **POST** `/contacts-groups`
   - Corpo:
     ```json
     {
       "contact_id": 1,
       "group_id": 1
     }
     ```
   - Resposta:
     ```json
     {
       "message": "Contact added to group successfully."
     }
     ```

2. **Listar Contatos de um Grupo**:
   - **GET** `/contacts-groups/:group_id`
   - Resposta:
     ```json
     [
       {
         "contact_id": 1,
         "name": "John Doe",
         "phone": "(123) 456-7890"
       }
     ]
     ```

3. **Remover Contato de um Grupo**:
   - **DELETE** `/contacts-groups`
   - Corpo:
     ```json
     {
       "contact_id": 1,
       "group_id": 1
     }
     ```
   - Resposta: Status **204 No Content**

#### **Relatórios**
1. **Relatório de Contatos por Grupo**:
   - **GET** `/report/contacts-groups`
   - Resposta:
     ```json
     [
       {
         "group_name": "Friends",
         "contact_count": 10
       }
     ]
     ```

---

## **5. Solução de Problemas**

### **Erros Comuns**
1. **Erro de Conexão com o Banco de Dados**:
   - Certifique-se de que o servidor MySQL está em execução.
   - Verifique as credenciais no arquivo `.env`.

2. **Erro de Autenticação (ER_NOT_SUPPORTED_AUTH_MODE)**:
   - Atualize o plugin de autenticação para o usuário do MySQL:
     ```sql
     ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha';
     ```

---

## **6. Notas Adicionais**
- Esta API foi desenvolvida utilizando **Node.js**, **Express** e **MySQL**.
- Certifique-se de ter conhecimento básico de APIs REST e SQL para trabalhar com este projeto.
- Se encontrar problemas, fique à vontade para entrar em contato ou depurar usando os logs fornecidos no terminal.

---

Com essas etapas concluídas, sua API deve estar totalmente funcional e pronta para uso!
