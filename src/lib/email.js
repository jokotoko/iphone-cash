import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmation = async (order) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is missing. Email not sent.');
        return { error: 'Missing API Key' };
    }

    const { customer_info, model, price, details, id } = order;

    // Formatting currency
    const formattedPrice = new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN'
    }).format(price);

    const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Dziękujemy za zlecenie sprzedaży!</h2>
            <p>Cześć ${customer_info.name},</p>
            <p>Otrzymaliśmy Twoje zgłoszenie sprzedaży iPhone'a. Twój numer zamówienia to: <strong>#${id.slice(0, 8)}</strong></p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Szczegóły wyceny:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Model:</strong> ${model}</li>
                    <li><strong>Pojemność:</strong> ${order.capacity}</li>
                    <li><strong>Bateria:</strong> ${details.battery}%</li>
                    <li><strong>Stan ekranu:</strong> ${details.screen === 'perfect' ? 'Idealny' : (details.screen === 'scratched' ? 'Porysowany' : 'Zbity')}</li>
                    <li><strong>Stan obudowy:</strong> ${details.body === 'perfect' ? 'Idealna' : (details.body === 'dents' ? 'Obicia' : 'Uszkodzona')}</li>
                </ul>
                <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
                <p style="font-size: 1.25rem; margin-bottom: 0;">Przewidywana kwota wypłaty:</p>
                <div style="font-size: 2rem; font-weight: bold; color: #10b981;">${formattedPrice}</div>
            </div>

            <h3>Co dalej?</h3>
            <ol>
                <li>Nasz pracownik zweryfikuje Twoje zgłoszenie w ciągu 24h.</li>
                <li>Skontaktujemy się z Tobą telefonicznie, aby potwierdzić odbiór urządzenia.</li>
                <li>Kurier odbierze od Ciebie paczkę (na nasz koszt).</li>
            </ol>

            <p style="color: #666; font-size: 0.875rem; margin-top: 40px;">
                Jeśli masz pytania, odpowiedz na ten email lub zadzwoń do nas.
            </p>
        </div>
    `;

    try {
        const data = await resend.emails.send({
            from: 'Skup iPhone <onboarding@resend.dev>', // Use verified domain later
            to: [customer_info.email],
            subject: `Potwierdzenie zgłoszenia #${id.slice(0, 8)} - ${model}`,
            html: emailHtml,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { error };
    }
};
