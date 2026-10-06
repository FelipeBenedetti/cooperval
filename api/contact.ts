import type { IncomingMessage, ServerResponse } from "node:http";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
};

type VercelRequest = IncomingMessage & {
  body?: unknown;
};

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

const SUBJECTS: Record<string, string> = {
  informacoes: "Informações Gerais",
  mercado: "Mercado",
  agropecuaria: "Agropecuária",
  racoes: "Fábrica de Rações",
  leite: "Recebimento de Leite",
  tecnica: "Assistência Técnica",
  associacao: "Quero me Associar",
  outro: "Outro",
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function clean(value: unknown, maxLength: number): string {
  return isString(value) ? value.trim().slice(0, maxLength) : "";
}

function sendJson(res: VercelResponse, status: number, body: unknown) {
  res.status(status).json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Método não permitido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL || "marketing@cooperval-eg.com.br";
  const sender = process.env.CONTACT_FROM_EMAIL || "Site Cooperval <site@coopervalcooperativa.com.br>";

  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada.");
    return sendJson(res, 500, { error: "O serviço de e-mail não está configurado." });
  }

  const body = (req.body || {}) as ContactPayload;
  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const subjectKey = clean(body.subject, 40);
  const message = clean(body.message, 5000);

  if (!name || !email || !subjectKey || !message) {
    return sendJson(res, 400, { error: "Preencha todos os campos obrigatórios." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(res, 400, { error: "Informe um e-mail válido." });
  }

  const subject = SUBJECTS[subjectKey] || "Mensagem pelo site";
  const html = `
    <h2>Nova mensagem pelo site da Cooperval</h2>
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefone:</strong> ${escapeHtml(phone || "Não informado")}</p>
    <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `[Contato do site] ${subject}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend retornou erro:", response.status, errorText);
      return sendJson(res, 502, { error: "Não foi possível enviar sua mensagem agora." });
    }

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Erro ao chamar o Resend:", error);
    return sendJson(res, 500, { error: "Não foi possível enviar sua mensagem agora." });
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20kb",
    },
  },
};
