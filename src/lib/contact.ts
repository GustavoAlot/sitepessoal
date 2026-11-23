export type ContactErrors = { email?: string; message?: string };

export function validateContact(email: string, message: string): ContactErrors {
  const errors: ContactErrors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }
  if (message.trim().length < 8) {
    errors.message = "Escreva uma mensagem com pelo menos 8 caracteres.";
  }
  return errors;
}

export const CONTACT_ERROR =
  "Não foi possível enviar a mensagem. Tente novamente ou entre em contato por e-mail.";
