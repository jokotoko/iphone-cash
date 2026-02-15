import { jsPDF } from "jspdf";

export const generateSalesAgreement = (order) => {
    const { customer_info, model, price, id, created_at, details } = order;
    const date = new Date(created_at).toLocaleDateString('pl-PL');

    // Create a hidden container for the PDF content
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.zIndex = '-9999'; // Hide behind everything
    container.style.width = '700px'; // A4 width approx in screen pixels for PDF mapping
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '12px';
    container.style.lineHeight = '1.5';
    container.style.color = '#000';
    container.style.padding = '40px';

    container.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px;">UMOWA KUPNA-SPRZEDAŻY URZĄDZENIA</h1>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <div><strong>Nr zamówienia:</strong> ${id.slice(0, 8)}</div>
                <div><strong>Data zawarcia:</strong> ${date}</div>
            </div>

            <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">§1. Strony Umowy</h3>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <div style="width: 48%;">
                    <div style="font-weight: bold; margin-bottom: 5px;">Sprzedający:</div>
                    <div>${customer_info.name}</div>
                    <div>${customer_info.address || ''}</div>
                    <div>${customer_info.zip || ''} ${customer_info.city}</div>
                    <div>Email: ${customer_info.email}</div>
                    <div>Tel: ${customer_info.phone}</div>
                </div>
                <div style="width: 48%;">
                    <div style="font-weight: bold; margin-bottom: 5px;">Kupujący:</div>
                    <div>Skup iPhone - Antigravity</div>
                    <div>ul. Technologiczna 1</div>
                    <div>00-000 Warszawa</div>
                    <div>NIP: 123-456-78-90</div>
                </div>
            </div>

            <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">§2. Przedmiot Umowy</h3>
            
            <div style="margin-bottom: 20px;">
                <p style="margin-bottom: 10px;">1. Przedmiotem umowy jest sprzedaż używanego telefonu komórkowego:</p>
                <ul style="list-style-type: none; padding-left: 20px; margin-bottom: 15px;">
                    <li><strong>Model:</strong> ${model}</li>
                    <li><strong>Pojemność:</strong> ${order.capacity}</li>
                    <li><strong>Bateria:</strong> ${details?.battery || '-'}%</li>
                </ul>
                <p>2. Sprzedający oświadcza, że urządzenie jest jego własnością, nie jest obciążone prawami osób trzecich i nie pochodzi z przestępstwa.</p>
            </div>

            <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">§3. Cena i Płatność</h3>
            
            <div style="margin-bottom: 40px;">
                <p style="margin-bottom: 10px;">1. Strony ustaliły cenę sprzedaży na kwotę: <strong>${price} USD</strong>.</p>
                <p style="margin-bottom: 5px;">2. Zapłata nastąpi przelewem na rachunek:</p>
                <div style="padding-left: 20px; font-style: italic;">
                    ${customer_info.bankAccount || customer_info.blikPhone || 'Zgodnie z formularzem'}
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-top: 60px;">
                <div style="width: 40%; border-top: 1px dashed #000; text-align: center; padding-top: 10px;">
                    Podpis Sprzedającego
                </div>
                <div style="width: 40%; border-top: 1px dashed #000; text-align: center; padding-top: 10px;">
                    Podpis Kupującego
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    const doc = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4'
    });

    doc.html(container, {
        callback: function (doc) {
            doc.save(`umowa_sprzedazy_${id.slice(0, 8)}.pdf`);
            document.body.removeChild(container);
        },
        x: 20,
        y: 20,
        width: 550, // Target width in PDF points
        windowWidth: 700 // Width of the source container
    });
};
