# Backend Contract - Area do Aluno (Michela Ensina)

## Escopo deste documento

- Fonte: leitura do backend em `../michela-ensina-back` (Laravel).
- Objetivo: mapear contrato tecnico para a futura integracao de `apps/student`.
- Sem inferencias de endpoint nao encontrado no codigo.
- Quando algo nao ficou 100% claro no backend, marcado como pendencia para Marco.

## Visao geral do backend

- Stack principal:
  - PHP `^8.3`
  - Laravel `^13.8`
  - Laravel Sanctum `^4.3`
  - Spatie Laravel Permission `^7.4`
  - Banco: PostgreSQL (indicativo por `DB_CONNECTION=pgsql` e uso de `gen_random_uuid()`)
- Arquivo de entrada da aplicacao Laravel: `public/index.php`.
- Config de bootstrap principal: `bootstrap/app.php`.
- Rotas API definidas em: `routes/api.php`.
- Prefixo de API:
  - Runtime Laravel padrao para rotas em `routes/api.php`: `/api`
  - Em `docs/openapi.yaml`, servidores tambem apontam para `/api`.
  - URL base esperada (docs):
    - local: `http://localhost:8000/api`
    - prod: `https://api.michelaensina.com.br/api`

## Formato de autenticacao

- Mecanismo: Sanctum com token Bearer.
- Login retorna token em `data.token`.
- Endpoints protegidos usam middleware `auth:sanctum`.
- Endpoints do aluno usam tambem middleware `student.access` (exige compra aprovada).
- Header esperado para rotas autenticadas:
  - `Authorization: Bearer <token>`

## Formato padrao de resposta

- Sucesso:

```json
{
  "success": true,
  "data": {}
}
```

- Erro (padrao global via `bootstrap/app.php`):

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem",
    "fields": {}
  }
}
```

- Codigos observados no backend: `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `ACCESS_DENIED`, `NOT_FOUND`, `METHOD_NOT_ALLOWED`, `TOO_MANY_REQUESTS`, `SERVER_ERROR`.

## Endpoints encontrados

Observacao: os caminhos abaixo estao sem o prefixo `/api` para ficar igual ao `routes/api.php`.

### Publicos

1. `POST /waitlist`

- Controller: `WaitlistController@store`
- Request (validado por `StoreWaitlistRequest`):

```json
{
  "name": "string (required, max 255)",
  "email": "email (required, unique em waitlist)"
}
```

- Response `201`:

```json
{
  "success": true,
  "data": {
    "message": "Cadastro realizado com sucesso! Verifique seu e-mail.",
    "email": "..."
  }
}
```

2. `POST /auth/login`

- Request:

```json
{
  "email": "email required",
  "password": "string required"
}
```

- Response `200`:

```json
{
  "success": true,
  "data": {
    "token": "...",
    "user": {
      "id": "uuid",
      "name": "...",
      "email": "...",
      "is_active": true,
      "must_change_password": false,
      "roles": ["student"],
      "created_at": "ISO datetime"
    }
  }
}
```

3. `POST /auth/forgot-password`

- Request:

```json
{ "email": "email required" }
```

- Response `200` (mensagem generica):

```json
{
  "success": true,
  "data": {
    "message": "Se este e-mail estiver cadastrado, voce recebera as instrucoes em breve."
  }
}
```

4. `POST /auth/reset-password`

- Request:

```json
{
  "email": "email required",
  "token": "string required",
  "password": "string required min 8",
  "password_confirmation": "string required"
}
```

- Response `200`: mensagem de sucesso.

5. `POST /auth/first-access`

- Request:

```json
{
  "token": "string required",
  "password": "string required min 8",
  "password_confirmation": "string required"
}
```

- Response `200`: mensagem + `user`.

6. `POST /webhooks/hotmart`

- Header esperado:
  - `x-hotmart-webhook-token: <token>` (quando configurado)
- Uso principal: integracao Hotmart (nao e endpoint para front student).

### Autenticados (auth:sanctum)

7. `POST /auth/logout`

- Invalida tokens do usuario.

8. `POST /auth/change-password`

- Request:

```json
{
  "current_password": "string required",
  "password": "string required min 8",
  "password_confirmation": "string required"
}
```

- Response `200`: mensagem de sucesso.

### Aluno (auth:sanctum + student.access)

9. `GET /student/me`

- Retorna usuario autenticado (`UserResource`).

10. `GET /student/materials`

- Retorna materiais ativos, ordenados por `order`.

11. `GET /student/materials/{id}`

- Retorna um material ativo por `id`.
- `404` se nao encontrar/nao ativo.

12. `POST /student/materials/{id}/progress`

- Sem body obrigatorio.
- Marca item como visto (`viewed=true`, `viewed_at=now`) com `updateOrCreate` por `(user_id, material_id)`.
- Comportamento idempotente.

13. `GET /student/progress`

- Response inclui:
  - `total_materials`
  - `viewed_count`
  - `percentage`
  - `items` (lista de progresso)

### Admin (fora do escopo inicial do front student)

- `GET/POST /admin/materials`
- `PUT/DELETE /admin/materials/{id}`
- `GET/POST/DELETE /admin/launch`

## Entidades/tipos relevantes para o front

### User

```ts
type User = {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  must_change_password: boolean;
  roles: string[];
  created_at: string | null;
};
```

### Material

```ts
type Material = {
  id: string;
  title: string;
  description: string | null;
  type: "pdf" | "video" | "attachment" | "other";
  url: string;
  order: number;
  is_active: boolean;
  created_at: string | null;
};
```

### ProgressItem

```ts
type ProgressItem = {
  id: string;
  material_id: string;
  material?: Material;
  viewed: boolean;
  viewed_at: string | null;
};
```

### ProgressSummary

```ts
type ProgressSummary = {
  total_materials: number;
  viewed_count: number;
  percentage: number;
  items: ProgressItem[];
};
```

## Variaveis de ambiente relevantes (backend)

- `APP_URL` (exemplo prod: `https://api.michelaensina.com.br`)
- `FRONTEND_URL`
- `SANCTUM_STATEFUL_DOMAINS`
- `DB_*`
- `HOTMART_WEBHOOK_TOKEN`
- `FIRST_ACCESS_TOKEN_EXPIRES_HOURS`

## Como rodar backend localmente (documentado no projeto back)

Pelo `composer.json`:

- Setup inicial: `composer run setup`
- Desenvolvimento: `composer run dev`
- Testes backend: `composer run test`

Observacao: nesta etapa, nenhum comando foi executado no backend.

## Decisoes de integracao alinhadas

1. Envelope de resposta:
   - sucesso com `success` e `data`;
   - erro em padrao consistente de erro.

2. Estrategia de autenticacao para web app:
   - preferencia por Sanctum stateful/cookie;
   - backend deve refletir isso em CORS e `SANCTUM_STATEFUL_DOMAINS` por ambiente.

3. `must_change_password`:
   - tratado no front como aviso de UX;
   - nao bloqueia login nem exige redirecionamento obrigatorio.

## Pendencias reais de implementacao backend

1. Ajustar/garantir migrations base consistentes para PostgreSQL/Neon (incluindo Sanctum com UUID).
2. Garantir funcionamento local estavel do fluxo de login + token + rotas autenticadas.
3. Consolidar configuracao de CORS/stateful domains para ambiente local da area do aluno.
