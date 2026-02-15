import { NextResponse } from 'next/server';
import axios from 'axios';
import { supabase } from '../../../../lib/supabaseClient';

// SHIPX API URL (Sandbox for testing, switch to Production for live)
const INPOST_API_URL = process.env.INPOST_ENV === 'production'
    ? 'https://api-shipx-pl.easypack24.net/v1'
    : 'https://sandbox-api-shipx-pl.easypack24.net/v1';

export async function POST(request) {
    try {
        const { orderId, packageDetails } = await request.json();

        // 1. Validate environment variables
        if (!process.env.INPOST_TOKEN || !process.env.INPOST_ORG_ID) {
            return NextResponse.json({ error: 'InPost API not configured' }, { status: 500 });
        }

        // 2. Fetch order data from Supabase to ensure integrity
        const { data: order, error: fetchError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (fetchError || !order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // 3. Prepare payload for InPost SHIPX
        const payload = {
            service: 'inpost_locker_standard', // or 'inpost_courier_standard'
            reference: `ORDER-${orderId.slice(0, 8)}`,
            // Sender is the customer (returning the phone)
            sender: {
                name: order.customer_info.name,
                email: order.customer_info.email,
                phone: order.customer_info.phone.replace(/\D/g, ''), // remove non-digits
                address: {
                    street: 'Unknown', // InPost needs this even for lockers sometimes
                    building_number: '1',
                    city: order.customer_info.city,
                    post_code: '00-000', // Placeholder if not collected
                    country_code: 'PL'
                }
            },
            // Receiver is YOU (the store)
            receiver: {
                name: 'Skup iPhone - Antigravity',
                email: 'skup@antigravity.pl',
                phone: '500000000',
                address: {
                    street: 'Twoja Ulica',
                    building_number: '10',
                    city: 'Warszawa',
                    post_code: '00-001',
                    country_code: 'PL'
                }
            },
            parcels: [
                {
                    template: 'small', // small, medium, large
                    dimensions: {
                        length: 200,
                        width: 200,
                        height: 80,
                        unit: 'mm'
                    },
                    weight: {
                        amount: 0.5,
                        unit: 'kg'
                    }
                }
            ],
            insurance: {
                amount: order.price,
                currency: 'PLN'
            }
        };

        // 4. Send request to InPost
        const response = await axios.post(`${INPOST_API_URL}/organizations/${process.env.INPOST_ORG_ID}/shipments`, payload, {
            headers: {
                'Authorization': `Bearer ${process.env.INPOST_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const shipment = response.data;

        // 5. Update order in Supabase with shipment info
        await supabase
            .from('orders')
            .update({
                tracking_number: shipment.tracking_number,
                status: 'label_generated'
            })
            .eq('id', orderId);

        return NextResponse.json({ success: true, shipment });

    } catch (error) {
        console.error('InPost API Error:', error.response?.data || error.message);
        return NextResponse.json({
            error: error.response?.data?.details?.join(', ') || 'Failed to create shipment'
        }, { status: 500 });
    }
}
