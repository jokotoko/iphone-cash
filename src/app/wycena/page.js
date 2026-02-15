import OrderWizard from '../../components/OrderWizard';

export const metadata = {
    title: "Darmowa Wycena iPhone | Sprawdź Wartość Telefonu",
    description: "Skorzystaj z naszego kreatora wyceny. Wybierz model, stan i pojemność, aby poznać cenę skupu Twojego iPhone'a. To zajmie tylko 3 minuty!",
};

export default function WycenaPage() {
    return (
        <main>
            {/* Spacer for fixed header */}
            <div style={{ height: '64px' }} />

            <OrderWizard />
        </main>
    );
}
