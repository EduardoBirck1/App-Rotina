# Prumo — Gerenciador de Rotina, Refeições e Guias Práticos

Aplicação web progressiva (**PWA**) inspirada em produtividade minimalista, pronta para ser hospedada gratuitamente no **GitHub Pages** e instalada diretamente como aplicativo no **Android** e **iPhone**.

## Funcionalidades Principais

- **Painel Hoje:** Progresso diário em tempo real, bloco de horário atual, contador de hidratação (água com lembretes), timer Pomodoro de foco, registro de sono/humor e checklist rápido.
- **Agenda por Blocos:** Organização visual de horários por categoria (*Saúde, Estudo e trabalho, Casa, Lazer, Descanso*).
- **Refeições & Pesquisa Nutricional:**
  - Catálogo pesquisável por nome, ingrediente ou categoria (*Café da manhã, Almoço, Lanche, Jantar*).
  - Exibe **calorias (kcal)**, **macronutrientes**, **descrição**, **lista de ingredientes** e **modo de preparo passo a passo (como fazer)**.
  - Adição direta ao plano alimentar do dia e lista de compras integrada.
- **Guias & Treino (Alongamento e Postura):**
  - Instruções detalhadas passo a passo de como executar alongamentos matinais, pausas ativas para postura no trabalho, pós-treino e respiração 4-7-8 para dormir.
  - Integração direta com o cronômetro guiado.
- **Hábitos, Tarefas e Resumo Semanal:** Acompanhamento de constância semanal e gráficos de desempenho.
- **Integração App de Celular (PWA) + Sync:** Funciona offline no celular e permite transferir dados entre PC e smartphone via código rápido ou arquivo `.json`.

## Como publicar no GitHub e instalar no celular

1. Crie um novo repositório no GitHub (ex: `prumo-rotina`).
2. Faça upload de todos os arquivos desta pasta (`index.html`, `style.css`, `data.js`, `app.js`, `manifest.json`, `sw.js` e a pasta `icons/`).
3. No GitHub, acesse **Settings → Pages**.
4. Em **Source**, selecione `Deploy from a branch`, escolha `main` e `/ (root)`, e clique em **Save**.
5. Abra o link gerado (`https://seu-usuario.github.io/prumo-rotina/`) no navegador do celular e toque em **"Adicionar à tela inicial" / "Instalar aplicativo"**.
