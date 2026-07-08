import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { CSSProperties } from "react";

interface Props {
  url: string;
  appName?: string;
}

export default function ResetPasswordEmail({
  url,
  appName = "YourApp",
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Сброс пароля</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Сброс пароля</Text>

            <Text style={text}>
              Вы запросили восстановление пароля в {appName}.
            </Text>

            <Text style={text}>
              Если это были не вы - проигнорируйте письмо.
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button href={url} style={button}>
              Задать новый пароль
            </Button>
          </Section>

          <Text style={textSmall}>Или скопируйте ссылку:</Text>

          <Text style={link}>{url}</Text>

          <Hr style={divider} />

          <Text style={footer}>
            Если вы не запрашивали сброс пароля, просто проигнорируйте это
            письмо.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: CSSProperties = {
  margin: 0,
  backgroundColor: "#f5f7fb",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
};

const container: CSSProperties = {
  width: "100%",
  maxWidth: "560px",
  margin: "0 auto",
  padding: "32px 24px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
};

const heading: CSSProperties = {
  margin: "0 0 16px",
  color: "#111827",
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: "36px",
};

const text: CSSProperties = {
  margin: "0 0 20px",
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
};

const textSmall: CSSProperties = {
  margin: "0 0 8px",
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "22px",
};

const buttonContainer: CSSProperties = {
  margin: "32px 0",
  textAlign: "center",
};

const button: CSSProperties = {
  display: "inline-block",
  padding: "14px 24px",
  backgroundColor: "#16a34a",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 700,
  textDecoration: "none",
};

const link: CSSProperties = {
  margin: "0 0 24px",
  color: "#16a34a",
  fontSize: "14px",
  lineHeight: "22px",
  wordBreak: "break-all",
};

const divider: CSSProperties = {
  margin: "28px 0",
  borderColor: "#e5e7eb",
};

const footer: CSSProperties = {
  margin: 0,
  color: "#6b7280",
  fontSize: "13px",
  lineHeight: "20px",
};
