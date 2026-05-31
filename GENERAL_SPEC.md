# Unum People - Especificação Geral de Sites

Este documento define os padrões obrigatórios para todos os sites desenvolvidos ou mantidos pela Unum People Creative Solutions.

## 🎯 Requisitos Obrigatórios

### 1. Google Ads & Rastreamento
Todos os sites de clientes (prefixo `site-` ou `site_`) devem obrigatoriamente:
- Configurar o Global Site Tag (gtag.js) no `layout.tsx`.
- Capturar parâmetros de rastreamento da URL (`gclid`, `fbclid`, `msclkid`, `utm_source`, `utm_medium`, `utm_campaign`).
- Persistir esses dados em um contexto de aplicação (`LeadContext`) para uso posterior.
- Disparar eventos de conversão (ex: clique no WhatsApp) via `gtag`.

### 2. Integração com CRM
Todos os sites de clientes devem implementar a chamada para o endpoint `/ingest` do CRM da Unum People.

#### 📋 Schema de Dados Padronizado (LeadData)
```typescript
interface LeadData {
  nome: string;           // Obrigatório
  email?: string;         // Opcional
  telefone: string;       // Obrigatório
  origem: string;         // Obrigatório. Deve indicar a fonte (ex: "Google Ads", "Orgânico", "Instagram")
  gclid?: string | null;
  fbclid?: string | null;
  msclkid?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  metadados?: {
    url_conversao: string;
    data_hora: string;
    [key: string]: any;
  };
}
```

#### 🛠️ Lógica de Origem
- Se `gclid` estiver presente → `origem = "Google Ads"`
- Se `utm_source` for "facebook" ou "instagram" → `origem = "Social Ads"` (ou conforme mapeamento)
- Caso contrário, se for tráfego direto/orgânico → `origem = "Orgânico"` ou "Direto".

### 3. SEO (Search Engine Optimization)
- **Metadata**: Todos os sites devem definir `title` e `description` únicos por página.
- **Estrutura**: Uso correto de tags semânticas (`main`, `section`, `h1`-`h6`).
- **Arquivos Técnicos**: `robots.ts` e `sitemap.ts` (ou equivalentes XML) são obrigatórios na raiz da `src/app`.
- **JSON-LD**: Implementar dados estruturados relevantes (ex: `MedicalBusiness` para clínicas, `LocalBusiness` para profissionais).

### 4. Performance & UX
- Uso obrigatório de `next/image` para otimização de imagens.
- Carregamento de fontes via `next/font`.
- Acessibilidade básica (contraste, labels em inputs, botões com ARIA labels se necessário).

## 🏗️ Padrões de Código
- **Framework**: Next.js (App Router).
- **Linguagem**: TypeScript.
- **Estilização**: Tailwind CSS.
- **Documentação**: Cada repositório deve ter um arquivo `AGENTS.md` atualizado seguindo as diretrizes do `tlc-spec-driven`.
