import Header from '../../components/Header';
import OrderWizard from '../../components/OrderWizard';
import Footer from '../../components/Footer';

export const metadata = {
    title: "Darmowa Wycena iPhone | Sprawdź Wartość Telefonu",
    description: "Skorzystaj z naszego kreatora wyceny. Wybierz model, stan i pojemność, aby poznać cenę skupu Twojego iPhone'a. To zajmie tylko 3 minuty!",
};

export default function WycenaPage() {
    return (
        <main>
            <Header />
            {/* Spacer for fixed header */}
            <div style={{ height: '64px' }} />

            <OrderWizard />

            <Footer />
        </main>
    );
}
