# Configuração do Sanity.io para Notícias da Cooperval

## Passo 1: Criar Projeto no Sanity

1. Acesse [sanity.io](https://www.sanity.io)
2. Crie uma conta ou faça login
3. Clique em "Create project"
4. Escolha o template "Blank project"
5. Dê um nome ao projeto (ex: "cooperval-news")
6. Selecione o dataset "production"
7. Copie o **Project ID** e o **Dataset** - você precisará deles

## Passo 2: Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo `.env.local` (copie de `.env.example`)
2. Preencha com seus dados do Sanity:
   ```
   VITE_SANITY_PROJECT_ID=seu-project-id-aqui
   VITE_SANITY_DATASET=production
   VITE_SANITY_TOKEN=seu-token-aqui-opcional
   ```

## Passo 3: Criar o Schema de Notícias no Sanity Studio

No Sanity Studio, crie um novo documento type chamado "news" com os seguintes campos:

### Estrutura do Schema

```javascript
{
  name: 'news',
  title: 'Notícias',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo'
            }
          ]
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Notícia', value: 'noticia' },
          { title: 'Evento', value: 'evento' },
          { title: 'Comunicado', value: 'comunicado' },
          { title: 'Destaque', value: 'destaque' }
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt'
    }
  }
}
```

## Passo 4: Instalar Sanity CLI e Inicializar Studio

```bash
# Instalar Sanity CLI globalmente (opcional)
npm install -g @sanity/cli

# Ou usar npx diretamente
npx sanity@latest init

# Quando perguntado, selecione seu projeto
# Escolha "React" como framework
```

## Passo 5: Gerar Token de Autenticação (Opcional)

Se quiser usar um token para leitura/escrita programática:

1. No Sanity Dashboard, vá para **Settings > API**
2. Clique em **Tokens**
3. Crie um novo token com permissões de **Editor** ou **Viewer**
4. Copie o token e adicione ao `.env.local` como `VITE_SANITY_TOKEN`

## Passo 6: Acessar o Sanity Studio

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse o Studio em:
# http://localhost:3000/studio

# Ou use o Studio hospedado:
# https://seu-project-id.sanity.studio
```

## Passo 7: Publicar Primeira Notícia

1. No Sanity Studio, clique em **Create**
2. Selecione **News**
3. Preencha os campos:
   - **Título**: Nome da notícia
   - **Slug**: URL-friendly (gerado automaticamente)
   - **Resumo**: Breve descrição
   - **Conteúdo**: Texto e imagens (use blocos)
   - **Galeria**: Adicione múltiplas imagens
   - **Data de Publicação**: Quando a notícia foi publicada
   - **Autor**: Nome do autor (opcional)
   - **Categoria**: Tipo de notícia
4. Clique em **Publish**

## Passo 8: Testar Integração

1. Acesse `http://localhost:3000/noticias` no seu navegador
2. Você deve ver a notícia publicada listada
3. Clique em "Ler Mais" para ver os detalhes

## Dicas Importantes

- **Slug**: Deve ser único e em minúsculas (ex: "noticia-importante-2024")
- **Imagens**: Recomendado usar imagens de alta qualidade (mínimo 1200x800px)
- **Conteúdo**: Use blocos de texto e imagens para melhor formatação
- **Publicação**: Defina a data/hora de publicação para agendar notícias
- **Categorias**: Use categorias consistentes para melhor organização

## Troubleshooting

### Notícias não aparecem no site
- Verifique se as variáveis de ambiente estão corretas
- Certifique-se de que o CORS está configurado no Sanity
- Verifique o console do navegador para erros

### Erro de autenticação
- Verifique se o token está correto (se usando)
- Certifique-se de que o dataset é "production"

### Imagens não carregam
- Verifique se as imagens foram enviadas corretamente ao Sanity
- Teste a URL da imagem diretamente no navegador

## Próximos Passos

- Adicione mais categorias conforme necessário
- Configure webhooks para notificações automáticas
- Personalize o Studio com campos adicionais
- Implemente cache para melhor performance
