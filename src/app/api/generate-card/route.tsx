import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const ejemplosCartas = `"Beben todas las mujeres."
"Cuenta una anécdota divertida. Al terminar, cada 4 jugadores deberá decir si es verdad o mentira y beben los que se equivoquen."
"Cualquier persona que reciba una llamada aquí al final del juego deberá contestar 'QUIERO SEXO'."
"Bebe el que tenga más edad de los que están."
"El jugador que saca la carta puede asignar 4 tragos, ya sea al mismo jugador o repartirlos entre cuatro jugadores."
"Hoy la carta astral dice que beben todos quienes hayan nacido bajo el signo zodiacal que corresponda al día de hoy. Si es Virgo, beben el triple."
"Yo nunca he tenido sexo en un lugar público. (Quien lo haya hecho debe beber)."
"Bebe un trago de cada vaso de los otros jugadores."
"A crear una palabra que exista en español, diciendo cada uno una letra comenzando por ti. Continúa hasta que alguien no pueda seguir armando la palabra."
"Comienza con una palabra. Cada jugador deberá repetir las palabras anteriores creando una historia y agregar una nueva palabra, hasta que alguien se equivoque al no recordar como era la historia o no sepa qué más agregar."
"Debe beber el jugador de tu derecha."
"Con esta carta, rechazas lo que te toca hacer o beber y lo entregas a una persona del sexo opuesto. (Solo la puedes usar 3 veces)."
"No te toca beber en toda esta ronda, pero cada vez que a alguien le toque beber, debes pararte y aplaudir. Si te olvidas, debes beber 3 veces."
"Todos los que tengan bigote o barba deben beber."
"Nadie puede ir al baño por 2 rondas. A menos que el jugador beba 3 veces."
"Hay que contar una anécdota divertida que le haya pasado a alguien del grupo, pero sin decir quién es el protagonista. Los jugadores tienen que adivinar quién es. Si no adivinan en el primer intento, todos beben."
"La cultura dice que todos los jugadores deben decir una marca de auto. Bebe el que repite o no sabe."
"El jugador a tu lado debe susurrarte una pregunta y debes responder gritando la respuesta. Si alguien quiere saber cuál es la pregunta, esa persona debe beber."
"Voy a comenzar y necesito pedir un terremoto. Después de eso, el jugador que le sigue debe mencionar la bebida que el jugador anterior mencionó, pero agregar otra bebida a la lista. Bebe el que se equivoca."
"Dale un beso en el ombligo a todos. Si no lo haces, bebes un shot."
"Elige el teléfono de un jugador(a). Si el número de la última llamada hecha o recibida termina en par, bebe él o ella. Si termina en impar, bebes tú."
"Cada jugador debe elegir una palabra que comience con la misma sílaba con la que termina la palabra que dijo el jugador anterior. Ejemplo: casa, saco, comer, mercado, domingo, etc."
"Realiza un movimiento o acción que creas que nadie más puede repetir. Beben todos los que no logran hacerlo si alguien lo repite."
"Besa la oreja de la persona de tu derecha."
"Di el nombre de una ciudad. Los demás deben decir otra ciudad que comience con la misma letra."
"Durante una ronda, si alguien habla a gritos a los del sexo contrario y decide no hacerlo, debe beber."
"Cada jugador deberá decir el nombre de un animal e imitar el sonido, comenzando por ti. Pero el que muestre los dientes, bebe."
"Por favor, envía esta carta a quien tú quieras."
"Al seco y ponlo boca abajo. Si encuentras gotas, deberás trapear con tu boca."
"En una ronda, cada jugador va diciendo un personaje de Los Simpsons (Ejemplo: Ned). La ronda cambia de sentido si el jugador dice correctamente el apellido del personaje en 3 segundos."
"Di una letra, los demás deberán decir un nombre que empiece con esa letra. Si alguien no puede, bebe."
"Debes ir al primer contacto de la agenda de tu celular con esa letra y bajar tantos contactos como el número. Luego les enviarás un mensaje: 'Tengo tu tanga.'"
"Elijan una prenda de color. El que no tenga una prenda de ese color, bebe."
"Cada jugador deberá buscar algo de ese color. El último en tocar un objeto de ese color pierde."
"Realiza sentadillas. Por cada 5 que hagas, tus amigos beben una vez."
"Deben nombrar 12 países de Sudamérica, comenzando por ti. El que no sepa, se equivoque o repita, tiene que beber. (Comienza con Surinam)."
"¡Chirpila! Eres el juez. Ahora deberás gritar '¡El traidor!' mientras apuntas a un jugador."
"Lánzate una moneda al aire. Si sale cara, te quitas la prenda que tú quieras, y si sale cruz, el jugador de tu derecha te dice qué prenda quitarte."
"Elige que un jugador participe, excepto tú, durante dos rondas. Mientras él o ella bebe, tú bebes el doble."
"El primer jugador al que le suene el teléfono debe tomar."
"Durante una ronda, todos los jugadores deberán hablar con acento italiano. El que no lo haga, bebe."
"Durante una ronda, todos los jugadores deberán hablar como franceses. El que no lo haga, debe beber."
"Los próximos 5 minutos todos deben beber cada vez que suene alguno de los teléfonos en la mesa. Todos deben activar el sonido de sus teléfonos y dejarlos sobre la mesa."
"Prohibido utilizar garabatos por una ronda. El que diga alguna palabra prohibida, debe beber."
"Los que no puedan tocar la punta de sus pies, sin doblar las rodillas, deben tomar."
"Este es un juego de números. Consiste en que cada jugador va diciendo un número, en orden, excepto el 3, los múltiplos de 3 y los números que contengan 3; en su lugar se dice 'CHU'. Ejemplo: uno, dos, chu, cuatro, cinco, chu, siete..."
"Coloca un poco de sal en el cuello de la persona de tu derecha. Ahora, chúpala lentamente."
"Chupilca. Puedes elegir que un jugador no beba y en su lugar debe beber otro jugador a tu elección."
"Durante una ronda, todos los jugadores deberán hablar con acento español. El que no lo haga, bebe."
"Haz una pregunta graciosa o sin sentido. Deberán beber todos aquellos jugadores que se rían. Si nadie ríe, bebes tú."
"Todos los jugadores deben nombrar algo que vendan en un sex shop. Pierde el que no sepa o que repita."`.split(
    "\n"
)

export async function GET() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: `
                    Tengo un juego de beber compuesto por cartas, cada una contiene una regla o un mini-juego. Aquí hay algunos ejemplos de cartas existentes:
                    
                    ${ejemplosCartas.join("\n")}
                    
                    Usando estos ejemplos como inspiración, por favor crea una carta nueva para mi juego de beber. Cada nueva carta debe contener una regla o un juego único, y deben ser creativas, divertidas y adecuadas para un ambiente de fiesta. Asegúrate de que las nuevas cartas mantengan un tono y formato similar a las cartas existentes.
                `,
                },
                {
                    role: "user",
                    content: "Dame una carta nueva",
                },
            ],
        })

        const card = completion.choices[0].message.content

        return NextResponse.json({ card })
    } catch (error) {
        console.error("Error generating card:", error)
        return NextResponse.json(
            { error: "Failed to generate card" },
            { status: 500 }
        )
    }
}
