# Integration Notes - Student App (Michela Ensina)

## Objetivo desta fase

- Definir base tecnica da integracao do `apps/student` com o backend.
- Sem implementacao de UI, sem auth no front por enquanto.
- Sem alteracao de comportamento da landing page.

## Decisoes iniciais para o front student

1. Tratar o backend como API REST com prefixo `/api`.
2. Padronizar cliente para envelopes:
   - sucesso: `{ success: true, data }`
   - erro: `{ success: false, error }`
3. Isolar integracao HTTP em uma camada unica (`lib/api`) para evitar chamadas diretas em componentes.
4. Considerar desde ja modelagem de tipos para:
   - `User`
   - `Material`
   - `ProgressItem`
   - `ProgressSummary`
5. Nao implementar ainda:
   - tela/fluxo de login
   - persistencia de token
   - guards de rota

## Sugestao de estrutura da camada de API (proxima etapa)

Sugestao de organizacao em `apps/student`:

```txt
lib/
  api/
    client.ts           # fetch wrapper (base URL + headers + parse de envelope)
    errors.ts           # tipos/helpers de erro da API
    contracts.ts        # tipos compartilhados do contrato
    student.ts          # endpoints /student/*
    auth.ts             # endpoints /auth/* (quando auth front comecar)
```

Comportamento sugerido para `client.ts`:

- receber `baseUrl` de `NEXT_PUBLIC_API_URL`
- montar URL absoluta
- permitir injecao opcional de `Authorization` (quando auth for implementada)
- fazer parse do envelope de erro para mensagens consistentes no app

## Variaveis de ambiente provaveis para `apps/student`

- `NEXT_PUBLIC_API_URL`
  - exemplo dev: `http://localhost:8000/api`
  - exemplo prod: `https://api.michelaensina.com.br/api`

Observacao:

- Nao adicionar secrets em variaveis `NEXT_PUBLIC_*`.
- Token de usuario (quando existir) deve ficar fora de `.env` e fora de controle de versao.

## Riscos conhecidos

1. **Migrations/base local no backend**
   - inconsistencias de schema (Sanctum + UUID) podem impedir validacao ponta a ponta do front.

2. **CORS/stateful domains para dev do student app**
   - risco de bloqueio local se dominio/porta nao estiverem previstos.

3. **Possiveis divergencias entre `openapi.yaml` e implementacao real**
   - contrato deve continuar sendo validado pelo codigo do backend.

## Proximos passos recomendados

1. Alinhar apenas pendencias de infraestrutura local/backend (migrations, CORS, stateful domains).
2. Congelar uma versao inicial do contrato em `student-area/backend-contract.md`.
3. Implementar somente a camada de API tipada em `apps/student/lib/api` (sem UI).
4. Definir estrategia de tratamento de erro padrao no front baseada em `error.code`.
5. Depois iniciar fluxo de auth no front, ja com contrato validado.

## Etapa 3 — API client/service layer

### Arquivos criados

- `apps/student/lib/api/types.ts`
- `apps/student/lib/api/errors.ts`
- `apps/student/lib/api/client.ts`
- `apps/student/lib/api/auth.ts`
- `apps/student/lib/api/student.ts`
- `apps/student/lib/api/materials.ts`
- `apps/student/lib/api/progress.ts`
- `apps/student/types/auth.ts`

### Arquivos ajustados

- `apps/student/types/student.ts`

### Decisoes tomadas

1. Cliente HTTP centralizado em `lib/api/client.ts` com suporte a `GET`, `POST`, `PUT` e `DELETE`.
2. Base URL vinda de `env.apiUrl` (`NEXT_PUBLIC_API_URL`), com fallback local ja existente.
3. Suporte a header `Authorization: Bearer <token>` opcional por chamada, sem fluxo de sessao implementado.
4. Tratamento de erro padronizado com `ApiClientError`, incluindo `status`, `message`, `code`, `fields` e payload bruto.
5. Services separados por dominio (`auth`, `student`, `materials`, `progress`) usando apenas endpoints documentados no contrato.
6. Tipos de dominio e payloads de auth adicionados para preparar integracao futura, sem conectar telas ainda.

### Contratos alinhados

- O front assume envelope consistente de sucesso com `success` e `data`.
- Erros devem seguir padrao consistente de erro no backend.
- Para web app, a preferencia de integracao e Sanctum stateful/cookie.

## Etapa 4 — Auth real

### Decisao implementada

- Sessao client-side com `localStorage` + Bearer token (temporario e simples para a fase atual).
- Fluxo de login usando endpoint real `/auth/login`.
- Verificacao de sessao usando `/student/me`.
- Logout chama `/auth/logout` quando ha token e limpa sessao local mesmo se a chamada falhar.

### Arquivos criados

- `apps/student/lib/auth/storage.ts`
- `apps/student/lib/auth/session.tsx`
- `apps/student/lib/auth/use-auth.ts`

### Arquivos alterados

- `apps/student/app/providers.tsx`
- `apps/student/app/(auth)/login/page.tsx`
- `apps/student/app/(dashboard)/layout.tsx`
- `apps/student/components/layout/StudentTopbar.tsx`

### Alinhamento funcional

- `must_change_password` passa a ser tratado como aviso de UX no front (nao bloqueante).

## Etapa 5 — Dashboard real

### Dados conectados

- Dashboard conectado aos dados reais do backend para:
  - aluno atual;
  - progresso geral;
  - lista de materiais.

### Endpoints usados

- `GET /student/me`
- `GET /student/progress`
- `GET /student/materials`

### Arquivos criados/alterados

- Criado: `apps/student/lib/student/use-dashboard-data.ts`
- Criado: `apps/student/app/(dashboard)/dashboard/DashboardContent.tsx`
- Alterado: `apps/student/app/(dashboard)/dashboard/page.tsx`

### Pendencias encontradas

- Dashboard ainda usa regra simples para "continuar de onde parou" (primeiro material nao concluido ou primeiro da lista).
- Quando o backend nao retorna materiais, o dashboard exibe estado vazio sem gerar conteudo ficticio.
- Integracao completa das paginas `/materiais` e `/progresso` permanece para etapa posterior.

## Etapa 6 — Materiais reais

### Endpoints usados

- `GET /student/materials`
- `GET /student/progress`

### Arquivos criados/alterados

- Criado: `apps/student/lib/student/use-materials-data.ts`
- Criado: `apps/student/app/(dashboard)/materiais/MaterialsContent.tsx`
- Alterado: `apps/student/app/(dashboard)/materiais/page.tsx`

### Pendencias para a proxima etapa

- A pagina `/progresso` continua sem integracao completa com dados reais.
- Abertura detalhada de material (rota `/materiais/[id]`) ainda nao foi implementada para evitar escopo extra.
- Atualizacao de progresso por material (`POST /student/materials/{id}/progress`) fica para etapa de detalhe/consumo de aula.

## Etapa 7 — Detalhe do material/aula

### Endpoints usados

- `GET /student/materials/{id}`
- `GET /student/progress`
- `POST /student/materials/{id}/progress`

### Arquivos criados

- `apps/student/app/(dashboard)/materiais/[id]/page.tsx`
- `apps/student/app/(dashboard)/materiais/[id]/MaterialDetailContent.tsx`

### Arquivos alterados

- `apps/student/app/(dashboard)/materiais/MaterialsContent.tsx`

### Decisao de renderizacao de conteudo

- Material do tipo `video` com URL de YouTube/Vimeo: renderiza embed simples por `iframe`.
- Material com URL externa (PDF/anexo/outros): renderiza card com acao de abrir link.
- Material sem URL valida: exibe estado amigavel de material em preparacao.

### Pendencias

- O endpoint de progresso foi usado de forma conservadora, sem body, conforme contrato atual.
- Se o backend passar a exigir granularidade maior de progresso (tempo/percentual), ajustar service e UI em etapa futura.

## Etapa 8 — Progresso real

### Endpoints usados

- `GET /student/progress`

### Arquivos criados

- `apps/student/lib/student/use-progress-data.ts`
- `apps/student/app/(dashboard)/progresso/ProgressContent.tsx`

### Arquivos alterados

- `apps/student/app/(dashboard)/progresso/page.tsx`

### Decisao sobre cruzamento com materiais

- Nesta etapa, nao foi necessario cruzar com `GET /student/materials`.
- O backend ja retorna itens de progresso suficientes para lista e resumo.
- Quando o titulo do material nao vier preenchido no item de progresso, o front usa fallback simples com o ID parcial.

### Pendencias encontradas

- Se futuramente o backend deixar de incluir `material` nos itens de progresso, pode ser necessario cruzar com `/student/materials` para enriquecer nomes.

## Etapa 9 — Configuracoes, tema e troca de senha

### Endpoints usados

- `POST /auth/change-password`
- `GET /student/me` (refresh de usuario apos troca de senha)
- `POST /auth/logout`

### Decisao de persistencia de tema

- Tema controlado por `ThemeProvider` client-side.
- Persistencia em `localStorage` (`student-theme`).
- Aplicacao por `document.documentElement.dataset.theme` mantendo dark mode como padrao.

### Observacao de comportamento

- Se backend invalidar sessao apos troca de senha no futuro, o front ajusta para logout forcado.

## Etapa 10 — Fluxos publicos de auth

### Rotas criadas

- `/esqueci-senha`
- `/redefinir-senha`
- `/primeiro-acesso`

### Endpoints usados

- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/first-access`

### Pendencias sobre token/codigo

- Em `redefinir-senha`, o token pode vir por query param (`?token=`) ou digitado manualmente.
- Se o backend fechar um formato unico de entrega do token (apenas query ou apenas codigo manual), ajustar UX para um unico fluxo.

## Etapa 11 — QA e polish visual

### Principais ajustes feitos

- Padronizacao visual de inputs, botoes e mensagens de feedback (erro/sucesso) para todos os formularios de auth e troca de senha.
- Ajustes de consistencia em cards e estados de loading/erro/empty.
- Pequenos refinamentos de espacamento em topbar e navegacao mobile para melhorar leitura em telas menores.
- Melhoria de acessibilidade basica com labels explicitas em formularios que estavam apenas com placeholder.

### Componentes padronizados

- `SurfaceCard`
- `StatusBadge`
- `EmptyState`
- Novas classes utilitarias globais no student app:
  - `.student-input`
  - `.student-button`
  - `.student-feedback`

### Uso de shadcn/ui

- Nesta etapa, shadcn/ui (Base UI) nao foi adicionado.
- Motivo: foi possivel reduzir inconsistencias com ajustes pontuais sem introduzir dependencia nova.

### Observacoes pendentes

- Em uma etapa futura, se houver demanda de maior padronizacao de UI primitives, avaliar migracao gradual para componentes shadcn/ui com Base UI, preservando os tokens atuais do `globals.css` do student.

## Como rodar o backend localmente

Projeto analisado: `../michela-ensina-back` (Laravel 13 + PHP 8.3 + PostgreSQL).

### 1) Instalar dependências

```bash
cd ../michela-ensina-back
composer install
npm install
```

### 2) Configurar ambiente

```bash
cp .env.example .env
php artisan key:generate
```

Variáveis principais para banco no `.env`:

- `DB_CONNECTION=pgsql`
- `DB_HOST`
- `DB_PORT=5432`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`

### 3) Configurar Neon

Se quiser usar a URL única do Neon localmente, mantenha **somente no seu `.env` local** (nunca commitar):

```env
DB_URL='postgresql://neondb_owner:example'
```

Se preferir manter também `DATABASE_URL` por compatibilidade com outras ferramentas locais, não há problema, mas o Laravel deste projeto lê `DB_URL`/`DB_*`.

Como o backend atual usa variáveis separadas por padrão no `.env.example`, preencha assim:

- `DB_CONNECTION=pgsql`
- `DB_HOST=ep-red-firefly-acs5emma-pooler.sa-east-1.aws.neon.tech`
- `DB_PORT=5432`
- `DB_DATABASE=neondb`
- `DB_USERNAME=neondb_owner`
- `DB_PASSWORD=npg_k0oFI7vafCJS`

Para SSL no PostgreSQL/Laravel, use também:

- `DB_SSLMODE=require`

> Observação: não versionar secrets e não subir `.env` para o repositório.

### 4) Banco e dados iniciais

```bash
php artisan migrate
php artisan db:seed
```

Se quiser executar um seeder específico:

```bash
php artisan db:seed --class=RolesAndPermissionsSeeder
```

### 5) Subir backend local

Opção simples:

```bash
php artisan serve
```

URL padrão: `http://127.0.0.1:8000`

Opção completa (server + queue + logs + vite), conforme `composer.json`:

```bash
composer run dev
```

### 6) Conectar o frontend student na API local

No `apps/student/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Depois, no frontend:

```bash
cd ../michela-ensina-front
npm run dev:student
```

## Correção de feedback e validação de formulários

### Validação padronizada no client

- Login: e-mail obrigatório + formato válido, senha obrigatória.
- Esqueci senha: e-mail obrigatório + formato válido.
- Redefinir senha: e-mail obrigatório + formato válido, código obrigatório, senha obrigatória, mínimo de 8 caracteres, confirmação igual.
- Primeiro acesso: código obrigatório, senha obrigatória, mínimo de 8 caracteres, confirmação igual.
- Configurações/troca de senha: senha atual obrigatória, nova senha obrigatória, mínimo de 8 caracteres, confirmação igual, nova senha diferente da atual.

### Mensagens e feedback

- Mensagens inline no formulário com texto claro e contextual.
- Toaster com Sonner configurado no `apps/student`.
- Uso de `toast.success`, `toast.error` e `toast.info` para eventos importantes, mantendo feedback inline para contexto.

### Motivos suportados no login por query param

- `motivo=sessao-expirada` -> "Sua sessão expirou. Faça login novamente."
- `motivo=senha-redefinida` -> "Senha redefinida com sucesso. Entre com sua nova senha."
- `motivo=primeiro-acesso` -> "Senha configurada com sucesso. Faça login para continuar."
- `motivo=senha-atualizada` -> "Senha atualizada com sucesso. Faça login novamente."

Sem `motivo`, nenhum alerta contextual é exibido.
