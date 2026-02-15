
import { supabase } from '../../../lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { selections, price, contact } = body;

        // Validation (basic)
        if (!contact.email || !selections.model) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }


        const { data, error } = await supabase
            .from('orders')
            .insert([
                {
                    model: selections.model,
                    capacity: selections.capacity,
                    price: price,
                    status: 'new',
                    customer_info: contact,
                    details: {
                        battery: selections.battery,
                        functional: selections.functional,
                        screen: selections.screen,
                        body: selections.body
                    }
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Send email confirmation (don't block response if it fails)
        try {
            const { sendOrderConfirmation } = await import('../../../lib/email');
            await sendOrderConfirmation(data[0]);
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // We still return success because the order was saved
        }

        return NextResponse.json({ success: true, order: data[0] });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
