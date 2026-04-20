-- CreateEnum
CREATE TYPE "PlanoAnuncio" AS ENUM ('ORGANICO', 'PAGO', 'SUPER_DESTAQUE', 'SUPERTOP', 'ULTRATOP');

-- CreateEnum
CREATE TYPE "StatusAnuncio" AS ENUM ('EM_ANALISE', 'ATIVO', 'PAUSADO', 'EXPIRADO', 'REMOVIDO');

-- CreateEnum
CREATE TYPE "StatusPagamento" AS ENUM ('PENDENTE', 'PAGO', 'CANCELADO', 'REEMBOLSADO');

-- CreateEnum
CREATE TYPE "TipoMetrica" AS ENUM ('VISUALIZACAO', 'CLIQUE_WHATS', 'CLIQUE_LIGAR', 'FAVORITO');

-- CreateEnum
CREATE TYPE "TipoMidia" AS ENUM ('FOTO', 'VIDEO');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ANUNCIANTE', 'CLIENTE', 'ADMIN');

-- CreateTable
CREATE TABLE "anuncios" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT,
    "estado" CHAR(2) NOT NULL,
    "dataNascimento" TIMESTAMP(3),
    "cache" DECIMAL(10,2),
    "telefonePublico" TEXT,
    "whatsapp" TEXT,
    "plano" "PlanoAnuncio" NOT NULL DEFAULT 'ORGANICO',
    "status" "StatusAnuncio" NOT NULL DEFAULT 'EM_ANALISE',
    "verificada" BOOLEAN NOT NULL DEFAULT false,
    "disponivelAgora" BOOLEAN NOT NULL DEFAULT false,
    "temLocal" BOOLEAN NOT NULL DEFAULT false,
    "temAr" BOOLEAN NOT NULL DEFAULT false,
    "temGaragem" BOOLEAN NOT NULL DEFAULT false,
    "atende24h" BOOLEAN NOT NULL DEFAULT false,
    "aceitaCartao" BOOLEAN NOT NULL DEFAULT false,
    "fazPernoite" BOOLEAN NOT NULL DEFAULT false,
    "expiracaoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anuncios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anuncios_tags" (
    "anuncioId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "anuncios_tags_pkey" PRIMARY KEY ("anuncioId","tagId")
);

-- CreateTable
CREATE TABLE "favoritos" (
    "usuarioId" TEXT NOT NULL,
    "anuncioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("usuarioId","anuncioId")
);

-- CreateTable
CREATE TABLE "metricas" (
    "id" TEXT NOT NULL,
    "anuncioId" TEXT NOT NULL,
    "tipo" "TipoMetrica" NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "metricas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "midias" (
    "id" TEXT NOT NULL,
    "anuncioId" TEXT NOT NULL,
    "tipo" "TipoMidia" NOT NULL DEFAULT 'FOTO',
    "url" TEXT NOT NULL,
    "isCapa" BOOLEAN NOT NULL DEFAULT false,
    "aprovada" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "midias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parceiros" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "siteUrl" TEXT,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parceiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos_contratados" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "anuncioId" TEXT NOT NULL,
    "plano" "PlanoAnuncio" NOT NULL,
    "valorPago" DECIMAL(10,2) NOT NULL,
    "statusPagamento" "StatusPagamento" NOT NULL DEFAULT 'PENDENTE',
    "gatewayId" TEXT,
    "inicioEm" TIMESTAMP(3),
    "expiracaoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planos_contratados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cluster" TEXT,
    "procuras" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL DEFAULT 'CLIENTE',
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "emailVerificado" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anuncios_slug_key" ON "anuncios"("slug");

-- CreateIndex
CREATE INDEX "anuncios_cidade_estado_idx" ON "anuncios"("cidade", "estado");

-- CreateIndex
CREATE INDEX "anuncios_slug_idx" ON "anuncios"("slug");

-- CreateIndex
CREATE INDEX "anuncios_status_plano_idx" ON "anuncios"("status", "plano");

-- CreateIndex
CREATE INDEX "metricas_anuncioId_tipo_idx" ON "metricas"("anuncioId", "tipo");

-- CreateIndex
CREATE INDEX "metricas_criadoEm_idx" ON "metricas"("criadoEm");

-- CreateIndex
CREATE INDEX "midias_anuncioId_idx" ON "midias"("anuncioId");

-- CreateIndex
CREATE UNIQUE INDEX "parceiros_slug_key" ON "parceiros"("slug");

-- CreateIndex
CREATE INDEX "planos_contratados_anuncioId_idx" ON "planos_contratados"("anuncioId");

-- CreateIndex
CREATE INDEX "planos_contratados_usuarioId_idx" ON "planos_contratados"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "anuncios" ADD CONSTRAINT "anuncios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anuncios_tags" ADD CONSTRAINT "anuncios_tags_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anuncios_tags" ADD CONSTRAINT "anuncios_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metricas" ADD CONSTRAINT "metricas_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "midias" ADD CONSTRAINT "midias_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planos_contratados" ADD CONSTRAINT "planos_contratados_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planos_contratados" ADD CONSTRAINT "planos_contratados_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
