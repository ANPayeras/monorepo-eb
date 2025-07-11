import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import { BASE_URL } from '../constants/env';

export const EstoyWelcomeEmail = () => (
    <Html>
        <Head />
        <Tailwind>
            <Preview>Gracias por sumarte a Estoy.Link. Contá tu historia...</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={box}>
                        <Img
                            style={img}
                            src={`${BASE_URL}/logo.png`}
                            width="100"
                            height="100"
                            alt="Estoy.Link"
                        />
                        <Hr style={hr} />
                        <Text style={paragraph}>
                            Gracias por sumarte a Estoy.Link. Ya podés empezar a compartir tu contenido.
                        </Text>
                        <Text style={paragraph}>
                            💡 Usa tu creatividad, destacá tu marca, tus productos o servicios y hacé que más personas te encuentren.
                        </Text>
                        <Text style={paragraph}>
                            Ya podés contar tu historia...
                        </Text>
                        <Button style={button} href={`${BASE_URL}/dashboard`}>
                            Comenzar
                        </Button>
                        <Hr style={hr} />
                        <Text style={paragraph}>
                            Aún estamos en fase beta, así que estaremos realizando algunas mejoras. Si encontrás algún error o tenés ideas para mejorar, no dudes en contactarnos.
                        </Text>
                        <Text style={paragraph}>
                            Si tenés alguna duda, estamos para ayudarte.
                            <Link href="mailto:oficial.estoy.link@gmail.com" style={anchor}>
                                {' '}oficial.estoy.link@gmail.com
                            </Link>
                        </Text>
                        <Text style={paragraph}>— Estoy.Link</Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default EstoyWelcomeEmail;

const main = {
    backgroundColor: '#e2e8f0',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#e2e8f0',
    margin: '0 auto',
    padding: '20px',
};

const box = {
    padding: '0 20px',
};

const hr = {
    borderColor: '#ffffff',
    margin: '20px 0',
};

const paragraph = {
    color: '#09090b',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
};

const anchor = {
    color: '#556cd6',
};

const img = {
    borderRadius: '100%',
    margin: '0 auto',
};

const button = {
    backgroundColor: '#09090b',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: 'fit-content',
    minWidth: '200px',
    padding: '10px',
    margin: '0 auto',
};