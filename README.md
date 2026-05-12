# Projeto Salomão - Front-End

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Context API](https://img.shields.io/badge/Context_API-000000?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## Sobre o Projeto

O **Projeto Salomão** nasceu com um objetivo claro: modernizar e centralizar a gestão de dados, eliminando o uso exaustivo de planilhas manuais. A dependência de processos descentralizados frequentemente resultava em dados inconsistentes, dificuldade na manutenção das informações e baixa eficiência no dia a dia.

Com este sistema, a ideia é fornecer uma ferramenta robusta e acessível, trazendo segurança, agilidade e confiabilidade para a gestão de todos os processos envolvidos.

## Arquitetura e Decisões Técnicas

O projeto inicialmente começou a tomar forma no universo mobile, sendo construído com **React Native e Expo**. Contudo, visando a democratização do acesso e uma distribuição sem atritos, decidi migrar toda a aplicação para a web utilizando o framework **Next.js**.

Essa transição arquitetônica foi fundamental para garantir que o sistema pudesse ser acessado tranquilamente por qualquer pessoa através de um navegador. Assim, entregamos valor de forma imediata e universal, sem depender de instalações complexas ou publicações em lojas de aplicativos.

A stack de tecnologias foi escolhida com foco em performance, manutenibilidade e uma experiência de usuário (UX) fluida:

- **Next.js & React**: Para construção de interfaces dinâmicas, renderização otimizada e roteamento eficiente.
- **Tailwind CSS**: Para uma estilização rápida, responsiva e altamente customizável.
- **Context API & Axios**: Para o gerenciamento global de estados e comunicação segura com o back-end através de requisições HTTP e interceptors.
- **Zod & React Hook Form**: Garantindo tipagem rigorosa e validação segura de ponta a ponta na entrada de dados.
- **Shadcn UI & Lucide React**: Para construção de componentes acessíveis e uma interface elegante.

## Desafios Técnicos Superados

Um dos maiores desafios técnicos durante a construção desta versão web foi a implementação de um fluxo de autenticação seguro e contínuo. 

Para lidar com a rotação de *Refresh Tokens*, desenvolvi uma arquitetura robusta baseada em **Cookies HTTP-Only e um Proxy interno** utilizando a API Routes do Next.js. Além disso, configurei um **Interceptor do Axios** (`apiWrapper`) no lado do cliente que monitora as respostas e detecta erros `401 Unauthorized`. Quando o token de acesso principal expira, o interceptor pausa as requisições pendentes, solicita silenciosamente um novo token através da nossa rota de proxy (renovando as credenciais no servidor e atualizando os cookies do cliente) e, em caso de sucesso, reprocessa as chamadas originais sem que o usuário perceba qualquer interrupção, garantindo uma experiência fluida, segura e ininterrupta.

## Status do Projeto

🚧 **Em Desenvolvimento** 🚧

A aplicação está em pleno desenvolvimento, ganhando novas formas e funcionalidades a cada ciclo. O roadmap para as próximas entregas inclui:

- [ ] Registro e gerenciamento de grupos
- [ ] Registro de caixinha e controle de frequência
- [ ] Filtragem avançada de crismandos
- [ ] Geração de relatórios

## Como Executar Localmente

Para testar e rodar o projeto na sua máquina, siga os passos abaixo:

1. Clone este repositório:
   ```bash
   git clone https://github.com/Joao-Victor-Queiroz/frontend-salomao.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```
4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 👨‍💻 Autor

Feito por **João Victor Queiroz**.


[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)]([SEU_LINK_DO_LINKEDIN_AQUI](https://www.linkedin.com/in/joaovictorqueirozdearaujo/))
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joaovictorqueiroz.dev@gmail.com)