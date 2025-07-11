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

export const EstoyEndFreeTrialEmail = () => (
    <Html>
        <Head />
        <Tailwind>
            <Preview>Tu prueba gratuita está por finalizar.</Preview>
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
                            Tu prueba gratuita está por finalizar.
                        </Text>
                        <Text style={paragraph}>
                            Recordá que una vez finalizada pasaras a tener el plan gratuito. Todas las funciones pagas ya no estarán habilitadas y no podrás usarlas.
                        </Text>
                        <Text style={paragraph}>
                            Las funciones que hayas usado quedaran guardas, y podrás volver a usarlas una vez cuentes con un plan pago.
                        </Text>
                        <Text style={paragraph}>
                            Para más información, revisa la sección de pagos.
                        </Text>
                        <Button style={button} href={`${BASE_URL}/profile/price`}>
                            Ver
                        </Button>
                        <Hr style={hr} />
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

export default EstoyEndFreeTrialEmail;

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