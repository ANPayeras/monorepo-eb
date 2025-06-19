import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

const page = () => {
    return (
        <section className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5 border-b'>
                <div className='flex justify-start items-center gap-2'>
                    <Link href={'/'} className='rounded-full'>
                        <Image src={'/logo.png'}
                            alt='logo-terms'
                            width={40}
                            height={40}
                            className='rounded-full'
                        />
                    </Link>
                    <h1 className='font-bold'>TÉRMINOS Y CONDICIONES</h1>
                </div>
                <p><strong>Última actualización:</strong> 16 de junio de 2025</p>
            </div>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>1. ¡Bienvenido a estoy.link!</h2>
                <p>
                    Nos alegra tenerte por acá. Estos Términos y Condiciones, junto con nuestras políticas vinculadas (los “Términos”), regulan el uso de nuestros servicios, que incluyen estoy.link (https://estoy.link), sus aplicaciones, funcionalidades y cualquier software relacionado (denominados en conjunto como la “Plataforma” o “estoy.link”).
                </p>
                <p>
                    Al utilizar estoy.link, aceptás estos Términos. Te recomendamos que leas estos Términos detenidamente y que te comuniques con nosotros si tenés dudas. Si no estás de acuerdo con estos Términos, por favor no uses estoy.link.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>2. Cambios en estos Términos</h2>
                <p>
                    Estoy.link está en constante evolución y mejora. Ocasionalmente, podemos realizar cambios tanto en la Plataforma como en estos Términos. Estas modificaciones pueden deberse a actualizaciones comerciales, cambios en la Plataforma (incluyendo la decisión de suspender alguna funcionalidad, característica o parte del servicio), razones legales o comerciales, o bien para proteger nuestros intereses legítimos.
                </p>
                <p>
                    Nos reservamos el derecho de modificar estos Términos en cualquier momento. Es tu responsabilidad revisar periódicamente esta página para estar al tanto de los cambios.
                </p>
                <p>
                    Si realizamos algún cambio que, razonablemente a nuestro criterio, pueda tener un efecto negativo importante sobre vos, haremos todo lo posible por notificarte con al menos un (1) mes de anticipación a que dicho cambio entre en vigencia.
                </p>
                <p>
                    Tu uso continuo de la plataforma luego de la publicación de los cambios será interpretado como aceptación de los Términos modificados. Si no estás de acuerdo con los cambios, te pedimos que dejes de utilizar estoy.link y cierres tu cuenta.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>3. Tu cuenta</h2>
                <p>
                    Para crear una cuenta y convertirte en usuario de estoy.link, aceptás cumplir con estos Términos y confirmás que tenés al menos 18 años de edad y que sos legalmente capaz de aceptar estos Términos. Debés proporcionarnos información precisa y actualizada sobre vos. En algunos casos, es posible que te solicitemos verificar tu cuenta o cuentas de terceros asociadas. Si alguno de tus datos cambia, por favor informanos para poder actualizarlos.
                </p>
                <p>
                    Si usás estoy.link en nombre de una empresa o de otra persona, confirmás que estás autorizado para aceptar estos Términos en su representación.
                </p>
                <p>
                    Sos responsable de la seguridad de tu cuenta y de asegurarte de que se utilice únicamente de manera legal. Recomendamos que elijas una contraseña segura y que no la compartas con nadie. Si creés que tu cuenta ha sido comprometida, comunicate con nosotros de inmediato.
                </p>
                <p>
                    No podés ceder ni transferir tu cuenta a otra persona, ni utilizarla (ni permitir que se utilice) de una forma que, a nuestro criterio razonable, pueda dañar a estoy.link, su reputación, infringir derechos de terceros o violar leyes o regulaciones aplicables. También aceptás no utilizar dispositivos automatizados, como bots o scripts, para crear múltiples cuentas.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>4. Tu nombre de usuario</h2>
                <p>
                    Al crear una cuenta en estoy.link, deberás elegir un nombre de usuario apropiado que respete los derechos de todas las personas. Sabemos que tu nombre de usuario puede tener un significado especial, pero también debe ser adecuado para todo público y no infringir derechos de terceros, incluidos derechos de propiedad intelectual como marcas registradas o derechos de autor.
                </p>
                <p>
                    No podés usar el nombre de otra persona (como un famoso o una marca), ni elegir un nombre ofensivo, vulgar o sin relación alguna con vos solo con la intención de lucrar más adelante (lo que se conoce como “acaparamiento de dominios” o domain squatting).
                </p>
                <p>
                    Si surge algún problema con tu nombre de usuario, evaluaremos la situación de forma justa y es posible que te pidamos que lo cambies (también podríamos reasignarlo). Si no aceptás, podemos suspender o cancelar tu cuenta. Si alguien alega que tu nombre de usuario infringe sus derechos de propiedad intelectual, deberá presentar un reporte formal, y vos vas a tener la oportunidad de responder con una contranotificación.
                </p>
                <p>
                    Si no inicias sesión, no agregás nuevos enlaces ni recibís visitas en tu cuenta durante un período de 6 meses, podríamos, a nuestra discreción, reclamar o reasignar tu nombre de usuario sin previo aviso.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>5. Gestión de tu plan</h2>
                <p>
                    Podés registrarte en estoy.link con un plan gratuito o plan pago, ya sea a través de una prueba gratuita o utilizando un código promocional, y podés cancelarlo en cualquier momento. Tu plan comenzará cuando aceptes estos Términos y continuará hasta que:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        vos lo canceles, o
                    </li>
                    <li>
                        nosotros lo demos de baja según lo establecido en estos Términos.
                    </li>
                </ul>
                <p>
                    Al realizar el primer pago de una suscripción, nos autorizás a cobrarte cargos periódicos de manera automática.
                    A MENOS QUE NOS NOTIFIQUES TU INTENCIÓN DE CANCELAR TU SUSCRIPCIÓN (SEGÚN LOS TÉRMINOS DE CANCELACIÓN DETALLADOS EN ESTA CLÁUSULA), TU SUSCRIPCIÓN SE RENOVARÁ AUTOMÁTICAMENTE Y NOS AUTORIZÁS A COBRARTE LA TARIFA CORRESPONDIENTE JUNTO CON LOS IMPUESTOS APLICABLES EN CADA PERÍODO DE RENOVACIÓN.
                </p>
                <p>
                    Entendemos que en algunos países y jurisdicciones existen leyes obligatorias sobre derechos de cancelación, por lo que esta cláusula no anula ningún derecho legal obligatorio.
                </p>
                <p>
                    Nos reservamos el derecho, a nuestro exclusivo criterio, de modificar o actualizar nuestros planes de suscripción en cualquier momento. Esto puede incluir, por ejemplo:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        Agregar nuevas funciones (lo que podría aumentar el precio del plan),
                    </li>
                    <li>
                        Quitar funciones existentes (lo que podría reducir el precio), o
                    </li>
                    <li>

                        Cambiar la cantidad y tipo de planes disponibles.
                    </li>
                </ul>
                <p>
                    En caso de que hagamos un cambio que, razonablemente, tenga un efecto significativo sobre tu experiencia, te daremos un aviso con suficiente antelación. Si seguís usando la plataforma después de que esos cambios entren en vigor, eso se considerará como aceptación del nuevo plan (incluyendo cualquier cambio en el precio). Si no estás de acuerdo, podés cancelar tu suscripción según la política de cancelación que figura más abajo.
                </p>
                <h3><strong>Cancelación de un Plan Pago</strong></h3>
                <p>
                    Si cancelás tu plan pago, este se convertirá automáticamente en un plan gratuito.
                    Para cancelar tu plan, ingresá a la sección de planes en el panel de perfil de estoy.link.
                    Los pagos no son reembolsables.
                </p>
                <h3><strong>Eliminación permanente de tu cuenta</strong></h3>
                <p>
                    Si ya cancelaste tu plan y querés eliminar tu cuenta de forma permanente, podés hacerlo desde el panel de administración.
                    Tené en cuenta que, si eliminás tu cuenta, no vas a poder reactivarla ni recuperar ningún contenido o información que hayas agregado.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>6. Tu Contenido</h2>
                <p>
                    Nos encanta la diversidad de contenido que los usuarios publican en estoy.link. Sin embargo, queremos asegurarnos de que todos puedan usar la plataforma de forma segura. Por eso, contamos con estándares, los cuales establecen qué tipo de contenido está permitido y cuál no. Asegurate de cumplir con estas reglas, ya que si no lo hacés, podríamos suspender o eliminar tu cuenta de forma permanente.
                </p>
                <p>
                    Cuando hablamos de tu “contenido”, nos referimos a los textos, gráficos, videos, enlaces, productos y cualquier otro material que agregues a tu perfil en estoy.link.
                </p>
                <p>
                    Vos sos el único responsable de tu contenido y, al publicarlo, declarás y garantizás que:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        El contenido es de tu autoría, o contás con los derechos necesarios para usar contenido de terceros y compartirlo en estoy.link (y permitirnos utilizarlo conforme a estos Términos).
                    </li>
                    <li>
                        Tu contenido no infringe la privacidad, imagen, propiedad intelectual u otros derechos de terceros.
                    </li>
                    <li>
                        La información que compartís es veraz y precisa. No debe ser engañosa, falsa, ni violar leyes vigentes ni dañar nuestra reputación.
                    </li>
                    <li>
                        Tu contenido está libre de virus, malware o cualquier código dañino que pueda afectar negativamente el funcionamiento de la plataforma o de otros sistemas.
                    </li>
                    <li>
                        No incluye herramientas automáticas para recolección de datos (como bots, scrapers, o scripts).
                    </li>
                    <li>
                        No contiene publicidad, promociones o patrocinios no autorizados.
                    </li>
                    <li>
                        Tu contenido cumple con nuestros estándares.
                    </li>
                </ul>
                <p>
                    Teniendo en cuenta que las leyes pueden variar según el país, es posible que restrinjamos contenido que sea legal en una región pero no en otra. Nos reservamos el derecho de tomar las medidas necesarias para proteger la integridad y seguridad de estoy.link, incluyendo la eliminación o limitación de acceso a cierto contenido.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>7. Qué podemos hacer con tu contenido</h2>
                <p>
                    Nos encanta tu contenido y queremos ayudarte a que se vea. Al publicar contenido en tu perfil de estoy.link, nos concedés una licencia mundial, sin regalías y por tiempo indefinido para:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        usar, mostrar públicamente, distribuir, modificar, adaptar y crear obras derivadas de ese contenido; y
                    </li>
                    <li>
                        utilizar tu nombre, imagen, voz, fotografía, apariencia y cualquier otro atributo personal incluido en ese contenido, tanto en la Plataforma como en nuestras acciones de marketing (por ejemplo, en redes sociales o campañas publicitarias de cualquier tipo).
                    </li>
                </ul>
                <p>
                    Esto significa que podemos usar tu contenido en cualquier lugar del mundo y durante el tiempo que queramos, sin necesidad de pagarte por ello. Al publicar, confirmás que contás con todos los derechos necesarios de terceros para compartir ese contenido y concedernos esta licencia.
                </p>
                <p>
                    Seguís siendo el titular de todos los derechos sobre tu contenido. Sin embargo, recordá que todo lo que publiques en estoy.link puede ser visible públicamente y potencialmente reutilizado o compartido por otras personas dentro y fuera de la plataforma.
                </p>
                <p>
                    Te pedimos que no compartas información personal sensible que no quieras que sea pública. Por ejemplo, nunca publiques tu número de documento, datos de pasaporte u otra información que pueda ser usada en tu contra. Si vas a compartir información personal de otra persona, debés tener su consentimiento explícito y conservar prueba de ello.
                </p>
                <p>
                    No estamos obligados a monitorear la veracidad, legalidad o confiabilidad de tu contenido, pero podemos hacerlo si lo consideramos necesario.
                </p>
                <p>
                    Nos reservamos el derecho de modificar, eliminar o restringir el acceso a tu contenido en cualquier momento si va en contra de estos Términos. También podemos aplicar advertencias de contenido sensible si lo consideramos inapropiado para todo público.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>8. Tu responsabilidad con tus visitantes y clientes</h2>
                <p>
                    Sos completamente responsable de las personas que visitan tu perfil en estoy.link (en adelante “Visitantes del Perfil”), lo cual incluye a quienes:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        Te dejan su información personal a través de formularios de contacto,
                    </li>
                    <li>
                        Se suscriben a tu perfil, o
                    </li>
                    <li>
                        Compran productos o servicios a través de tu perfil.
                    </li>
                </ul>
                <p>
                    En conjunto, a estas personas las llamamos “Usuarios Finales”.
                </p>
                <p>
                    Como creador de contenido o titular de un perfil en estoy.link, asumís total responsabilidad por:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        Te dejan su información personal a través de formularios de contacto,
                    </li>
                    <li>
                        Que todas las interacciones con tus Usuarios Finales (incluidas ventas, recolección de datos, campañas de email marketing, etc.) cumplan con todas las leyes aplicables, en especial en materia de protección de datos, privacidad del consumidor y comercio electrónico,
                    </li>
                    <li>
                        Que las transacciones realizadas a través de tu perfil cumplan con los términos y condiciones del proveedor de pagos externos que utilices.
                    </li>
                </ul>
                <p>
                    Además, podés acceder a herramientas que permiten recibir aportes económicos voluntarios por parte de tus Usuarios Finales. Reconocés que cualquier contribución que recibas por esta vía es totalmente voluntaria y no implica ningún compromiso de tu parte para entregar productos o servicios a cambio.
                </p>
                <p>
                    Este sistema de aportes está diseñado exclusivamente para apoyo personal, y no puede utilizarse para campañas de recaudación de fondos a nombre de organizaciones benéficas u otras causas sin autorización expresa.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>9. Monetización de tu contenido</h2>
                <p>
                    Como usuario de estoy.link, podés vender productos o servicios digitales a tus Usuarios Finales, incluyendo pero no limitado a: descargas, cursos, comunidades, plantillas, contenido exclusivo, entre otros.
                </p>
                <p>
                    Los siguientes términos se aplican:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        Vos sos responsable de cumplir con todas las obligaciones fiscales asociadas a tus Ganancias, incluyendo la emisión de facturas si corresponde según las leyes locales.
                    </li>
                    <li>
                        Las transacciones con tus Usuarios Finales deben cumplir con las políticas de uso y términos del proveedor de pagos externo utilizado (por ejemplo, Stripe, Mercado Pago, etc.), así como con las leyes de protección al consumidor vigentes.
                    </li>
                    <li>
                        Estoy.link no actúa como agente ni garantiza pagos de los Usuarios Finales, y no será responsable por reembolsos, disputas, ni por la calidad o entrega de los productos o servicios que vos ofrezcas.
                    </li>
                </ul>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>10. Suspensión o cancelación de tu cuenta</h2>
                <p>
                    Si no cumplís con estos Términos, nuestras normas de la comunidad o cualquier otra política vinculada, nos reservamos el derecho de suspender o cancelar tu cuenta, restringir tu acceso a ciertas funcionalidades de la plataforma o modificar el funcionamiento de estoy.link en relación a tu cuenta.
                </p>
                <p>
                    Por ejemplo:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        Si no abonás a tiempo tu suscripción paga, podríamos degradar tu cuenta a una versión gratuita con funciones limitadas.
                    </li>
                </ul>
                <p>
                    Las acciones que tomemos dependerán de la naturaleza y la gravedad del incumplimiento. En algunos casos podremos simplemente advertirte o limitar funciones. Pero si se trata de una falta grave o repetida, podríamos suspender o cancelar tu cuenta de manera permanente.
                </p>
                <p>
                    También podemos suspender o cancelar tu cuenta si:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        Es requerido por ley o por una orden judicial.
                    </li>
                    <li>
                        Consideramos razonablemente que es necesario para prevenir daños a vos, a estoy.link, a otros usuarios o a terceros.
                    </li>
                </ul>
                <p>
                    En caso de suspensión o cancelación, intentaremos notificarte previamente, aunque no estamos obligados a hacerlo.
                </p>
                <p>
                    Además, si tenés una cuenta gratuita o no has iniciado sesión ni recibido tráfico durante un período prolongado (por ejemplo, 6 meses), nos reservamos el derecho de eliminar tu cuenta sin previo aviso.
                </p>
                <p>
                    Si tu cuenta es suspendida o cancelada por estos motivos:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        No tendrás derecho a reembolso de pagos realizados previamente, salvo que así lo exija la ley.
                    </li>
                    <li>
                        Perderás el acceso al contenido que hubieras almacenado o configurado en la plataforma (incluyendo funciones disponibles en planes pagos).
                    </li>
                </ul>
                <p>
                    Si creés que tu cuenta fue cancelada por error, o si tenés algún conflicto con estos Términos o con la plataforma, no dudes en contactarnos. Nos comprometemos a hacer todo lo posible por resolver el problema de buena fe antes de que cualquiera de las partes recurra a medidas legales. Ninguna parte podrá iniciar acciones legales hasta haber intentado una resolución conjunta por al menos un (1) mes.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>11. Comentarios y funcionalidades Beta</h2>
                <p>
                    Nos encanta recibir ideas y sugerencias sobre cómo mejorar estoy.link. Es posible que en algunas ocasiones pongamos a tu disposición funciones en versión “beta” (o similares) y te pidamos tu opinión al respecto.
                </p>
                <p>
                    Al compartir comentarios, ideas o sugerencias con nosotros,
                    nos otorgás el derecho a usarlos libremente, sin obligación de compensarte, aunque también podríamos optar por no utilizarlos.
                    Aceptás que esas funcionalidades en versión beta pueden no ser tan estables o confiables como otras partes de la plataforma, ya que están en etapa de evaluación y prueba.
                </p>
                <p>
                    Tu feedback es valioso para nosotros y nos ayuda a construir una mejor experiencia para toda la comunidad de usuarios.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>12. Nuestra Plataforma</h2>
                <p>
                    Como propietarios de la plataforma estoy.link, te otorgamos un derecho limitado para utilizarla con el fin de compartir contenido y acceder/interactuar con el contenido de otros usuarios. Sin embargo, no nos hacemos responsables por ningún contenido, producto o servicio ofrecido a través de los perfiles de otros usuarios.
                </p>
                <p>
                    Todos los derechos sobre estoy.link, incluyendo la propiedad intelectual asociada a la plataforma, el diseño, la tecnología y cualquier contenido no generado por usuarios (en adelante, “Propiedad Intelectual de estoy.link”), son de nuestra titularidad o de nuestros licenciantes. No adquirís ningún derecho sobre esta propiedad, y no podés usar nuestro nombre comercial, logotipo u otra marca para ningún fin sin autorización expresa por escrito, como por ejemplo, para dar a entender que existe una asociación o respaldo de nuestra parte.
                </p>
                <p>
                    Te otorgamos un derecho limitado, revocable, no exclusivo e intransferible para utilizar la plataforma con el único propósito de crear, mostrar, publicar y gestionar contenido conforme a estos Términos. Está prohibido el uso de scripts, bots, scrapers u otras herramientas automatizadas para acceder, descargar, extraer o recolectar información desde perfiles o contenido de usuarios.
                </p>
                <p>
                    En caso de que te proporcionemos imágenes, íconos, temas, fuentes, videos, gráficos u otros recursos visuales o funcionales, deberás usarlos únicamente en tu perfil y respetando las directrices que proporcionemos. No podés ocultar, eliminar ni modificar avisos legales, marcas registradas u otras notificaciones de derechos sobre dichos elementos.
                </p>
                <p>
                    Está expresamente prohibido copiar, reproducir, distribuir, vender, revender, modificar, traducir, desensamblar, descompilar, descifrar o realizar ingeniería inversa sobre nuestra plataforma, así como intentar derivar su código fuente total o parcialmente.
                </p>
                <p>
                    Cuando accedés a un perfil como visitante, te otorgamos un derecho limitado, no exclusivo e intransferible para visualizar e interactuar con el contenido público publicado por los usuarios. Algunos usuarios (en adelante, “Vendedores”) pueden ofrecer productos o servicios (incluyendo productos digitales), o enlaces patrocinados para realizar compras de marcas desde su perfil. Al realizar alguna compra o interactuar con ese contenido, aceptás que el vínculo legal es directamente con el Vendedor y/o la marca, no con estoy.link.
                </p>
                <p>
                    Esto significa que no somos responsables por esos productos o servicios, incluyendo pero no limitándonos a la entrega, calidad, soporte, reembolsos, disputas, errores o mantenimiento. Tampoco garantizamos la identidad de los Vendedores ni la veracidad de lo que afirman. Es posible que los Vendedores o marcas tengan sus propias condiciones o políticas adicionales, y es tu responsabilidad aceptarlas y cumplirlas.
                </p>
                <p>
                    En la medida permitida por la ley, tampoco nos hacemos responsables por opiniones, declaraciones, consejos, ofertas u otros contenidos publicados por los usuarios en sus perfiles.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>13. Tarifas y pagos</h2>
                <p>Si elegís un plan pago en estoy.link, te comprometés a abonar las tarifas de suscripción correspondientes en tiempo y forma. Según tu ubicación, dichas tarifas pueden incluir impuestos o tasas aplicables, que son adicionales y a tu cargo.</p>

                <p>Las suscripciones se facturan por adelantado y de manera recurrente, ya sea mensual o anualmente, según el ciclo de facturación que selecciones.</p>

                <p>Al registrarte en un plan pago, deberás proporcionar datos de facturación precisos y un método de pago válido (por ejemplo, tarjeta de crédito). Esto nos autoriza a realizar los cargos correspondientes. Si se produce un fallo en el cobro automático (por ejemplo, por fondos insuficientes o una tarjeta vencida), te enviaremos una factura con vencimiento para que regularices el pago.</p>

                <p>estoy.link se reserva el derecho de demorar o cancelar pagos en los casos en que se detecten posibles fraudes, actividades ilícitas o durante procesos de verificación de riesgo o seguridad. En esos casos, podremos suspender temporalmente tu cuenta hasta finalizar dicha revisión.</p>

                <p>Nos reservamos el derecho de modificar nuestras tarifas de suscripción. Si esto ocurre, te daremos aviso con antelación razonable. Si no estás de acuerdo con las nuevas condiciones, podrás cancelar tu suscripción antes de que inicie el siguiente ciclo de facturación.</p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>14. Obligaciones impositivas</h2>
                <p>
                    “Impuestos” hace referencia a todos los tributos aplicables, incluyendo, entre otros:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        impuestos indirectos como el IVA, el impuesto al valor agregado (IVA), impuestos a las ventas, tasas, aranceles, gravámenes u otros tributos similares; y
                    </li>
                    <li>
                        impuestos directos como impuestos a las ganancias, retenciones, impuestos a las transacciones u otros tributos fiscales aplicables según la legislación vigente.
                    </li>
                </ul>
                <p>
                    Los Impuestos se calcularán conforme a las leyes fiscales de tu país, provincia, estado o jurisdicción local. Los cargos impositivos aplicables se detallarán por separado en tu factura.
                </p>
                <p>
                    Dependiendo de las leyes fiscales que rijan en tu país o territorio, las tarifas de suscripción de estoy.link podrán ser expresadas con o sin impuestos incluidos. En caso de que se cobren tarifas sin impuestos incluidos, los mismos se mostrarán claramente como un ítem separado en la factura correspondiente.
                </p>
                <p>
                    En caso de que debas abonar impuestos sobre algún pago realizado a estoy.link, aceptás reembolsarnos y eximirnos de cualquier obligación vinculada a impuestos, intereses o penalidades derivadas del incumplimiento de tu parte. Si contás con alguna exención fiscal, deberás entregarnos la documentación correspondiente antes de la emisión de la factura.
                </p>
                <p>
                    Si cualquier pago se encuentra sujeto a: (i) retenciones impositivas o impuestos similares, (ii) impuestos que no hayan sido cobrados por estoy.link, o (iii) cualquier otro impuesto o gravamen gubernamental, vos serás el único responsable de su liquidación y dichos importes no podrán descontarse de las tarifas que correspondan a estoy.link bajo estos Términos. En los casos aplicables, te facilitaremos los formularios fiscales necesarios para ayudarte a reducir o eliminar retenciones, si correspondiera.
                </p>
                <p>
                    Si obtenés ingresos a través de nuestra plataforma (por ejemplo, venta de productos digitales), vos sos el único responsable de cumplir con tus obligaciones fiscales correspondientes a esos ingresos, incluyendo impuestos a las ganancias o impuestos sobre transacciones, según lo establezcan las leyes fiscales de tu país o región.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>15. Privacidad</h2>
                <p>
                    En estoy.link, proteger tu privacidad y la de las personas que visitan tu perfil (“Visitantes del Perfil”) es una prioridad. Nuestra <Link className='text-blue-400 hover:underline' href={'/privacy'}>Política de Privacidad</Link> y demás políticas asociadas describen cómo recopilamos, usamos y protegemos tus datos personales para fines internos, así como también tus obligaciones (y las nuestras) en relación con los derechos de privacidad de tus Visitantes del Perfil.
                </p>
                <p>
                    Toda la información (incluidos los derechos de propiedad intelectual asociados) que nosotros o la plataforma genere a partir del uso que vos, tus Visitantes del Perfil u otros usuarios hagan de estoy.link (en conjunto, “Datos”), será propiedad exclusiva de estoy.link.
                </p>
                <p>
                    Como parte de los servicios que ofrecemos, es posible que pongamos a tu disposición ciertos informes, gráficos o representaciones visuales de los Datos. Si bien no garantizamos que los Datos sean exactos o completos, nos esforzamos en que sean lo más precisos y útiles posible.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>16. Confidencialidad</h2>
                <p>
                    En ciertas ocasiones, podríamos compartir con vos información confidencial sobre estoy.link o sobre el funcionamiento de la Plataforma. Por ejemplo, si participás en pruebas beta, es posible que te mostremos funciones nuevas que aún no se han hecho públicas.
                </p>
                <p>

                    Toda la información que te proporcionemos en estos casos, y que sea razonablemente considerada confidencial (ya sea porque así lo indiquemos de manera expresa o por su propia naturaleza), deberá ser mantenida en estricta confidencialidad. Esto incluye, sin limitarse a ello, detalles técnicos, estrategias comerciales, nuevas funcionalidades o cualquier otro contenido no disponible públicamente.
                </p>
                <p>
                    Te comprometés a:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        No divulgar dicha información confidencial a terceros;
                    </li>
                    <li>
                        Implementar medidas razonables de seguridad para protegerla del acceso no autorizado; y
                    </li>
                    <li>
                        Usar esa información únicamente para los fines permitidos en el marco de tu relación con estoy.link.
                    </li>
                </ul>
                <p>
                    En caso de que exista alguna información que podamos permitirte compartir públicamente —por ejemplo, como parte de una campaña o programa de prueba— te lo haremos saber expresamente por escrito.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>17. Contenido recomendado</h2>
                <p>
                    Estoy.link puede sugerirte productos, servicios u otro tipo de contenido que consideremos que puede ser de tu interés como usuario de ciertas funcionalidades de la Plataforma, o bien que pueda resultar atractivo para tu audiencia.
                </p>
                <p>
                    Estas recomendaciones se basan en datos que nos proporcionás directamente, así como en información agregada sobre cómo otros usuarios utilizan estoy.link. Nuestro objetivo es ofrecerte sugerencias relevantes para mejorar tu experiencia y ayudarte a generar mayor valor a través de tu perfil.
                </p>
                <p>
                    Es importante aclarar que dichas recomendaciones no constituyen un respaldo, aprobación o garantía por parte de estoy.link respecto del contenido o los productos sugeridos. Vos tenés siempre el control de decidir si querés interactuar o mostrar ese contenido en tu perfil.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>18. Responsabilidad</h2>
                <p>Queremos dejar en claro que estoy.link no se responsabiliza por el uso que hagas de la Plataforma. Es tu responsabilidad realizar copias de seguridad de tu contenido, y proteger adecuadamente tus datos, dispositivos y sistemas. No seremos responsables por daños que puedan surgir del uso, descarga, instalación o distribución del contenido de la Plataforma, ni por el contenido publicado por vos, tus visitantes o cualquier otro usuario, incluyendo mensajes, comentarios, opiniones o expresiones compartidas.</p>

                <p>Al aceptar estos Términos, te comprometés a indemnizarnos frente a cualquier pérdida, daño o reclamo que pueda surgir como consecuencia del incumplimiento de estos Términos por tu parte, o por reclamos de terceros vinculados a tu contenido.</p>

                <p>Ninguna de las partes será responsable frente a la otra por daños indirectos, punitivos, especiales, incidentales o consecuentes, incluyendo, pero no limitado a, pérdida de ingresos, beneficios, datos, reputación o cualquier otro perjuicio económico, ya sea por incumplimiento de contrato, negligencia u otra causa, incluso si se nos hubiera advertido sobre la posibilidad de tales daños.</p>

                <p>Nuestra responsabilidad total hacia vos por cualquier reclamo relacionado con estos Términos o con el uso de la Plataforma estará limitada al mayor de los siguientes montos: (i) las tarifas que nos hayas pagado en los 12 meses anteriores al hecho que dio origen a la responsabilidad, o (ii) el equivalente en pesos argentinos a USD $100.</p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>19. Exclusión de garantías</h2>
                <p>
                    Queremos aclarar algunos puntos importantes. Al utilizar estoy.link y acceder al contenido disponible en la Plataforma, lo hacés bajo tu propio riesgo. La Plataforma se proporciona “TAL CUAL” y “SEGÚN DISPONIBILIDAD”, sin garantías de ningún tipo, expresas ni implícitas. Esto incluye, entre otras, garantías implícitas de comerciabilidad, adecuación para un propósito particular, no infracción o cumplimiento.
                </p>
                <p>
                    Ni estoy.link, ni nuestras empresas afiliadas o licenciantes, realizamos declaraciones ni ofrecemos garantías de que:
                </p>
                <ul className='list-disc ml-10'>
                    <li>
                        La Plataforma funcionará sin interrupciones, de forma segura o estará disponible en todo momento o lugar;
                    </li>
                    <li>
                        Cualquier error o defecto será corregido;
                    </li>
                    <li>
                        La Plataforma estará libre de virus u otros componentes dañinos;
                    </li>
                    <li>
                        La Plataforma será efectiva o cumplirá con tus expectativas o necesidades específicas;
                    </li>
                    <li>
                        El contenido publicado en la Plataforma (incluido contenido de usuarios) será completo, exacto, confiable, útil o estará disponible para cualquier fin.
                    </li>
                </ul>
                <p>
                    Estos Términos se aplican en la máxima medida permitida por la legislación vigente. Nada de lo aquí dispuesto pretende excluir, limitar o modificar los derechos legales que puedas tener y que, por ley, no puedan ser excluidos, limitados o modificados por contrato.
                </p>
                <p>
                    Si estos Términos están regidos por la Ley de Defensa del Consumidor en Argentina o leyes equivalentes en otra jurisdicción, nuestra responsabilidad ante cualquier incumplimiento de una garantía legal se limitará —cuando sea permitido por ley— a: (i) volver a prestar el servicio, o (ii) el reembolso del monto correspondiente al valor del servicio afectado.
                </p>
            </section>

            <section className='flex flex-col gap-2'>
                <h2 className='font-semibold text-slate-300 underline'>20. Servicios de terceros</h2>
                <p>En estoy.link trabajamos con diversos productos y servicios ofrecidos por terceros. Es posible que dentro de la Plataforma tengas acceso a funciones, integraciones o servicios específicos de terceros, como portales de pago, tiendas de comercio electrónico, herramientas de marketing de afiliados o conexiones con marcas.</p>

                <p>A menos que se indique expresamente lo contrario, no respaldamos ni garantizamos ningún producto o servicio proporcionado por terceros, ni ofrecemos reembolsos por pagos realizados a dichos terceros. El uso que hagas de cualquier servicio o producto de terceros puede estar sujeto a sus propios términos y condiciones, los cuales sos responsable de revisar, aceptar y cumplir.</p>

                <p>La falta de aceptación o el incumplimiento de estos términos de terceros podría derivar en la suspensión, cancelación o limitación de tu cuenta, o del acceso a ciertas funciones dentro de la Plataforma.</p>
            </section>
        </section>
    )
}

export default page