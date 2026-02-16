
import { supabase } from '../../../lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { orderId, email } = body;

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        // Query the order
        let query = supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        const { data: order, error } = await query;

        if (error) {
            console.error('Supabase status check error:', error);
            // Don't leak details if not found or error
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Verify email if provided (optional but recommended for privacy)
        // If email is provided, we strictly match it.
        // If not provided in request, we might mask sensitive data or just return basic status.
        // For this implementation, let's require email implicitly or just return status if no email, 
        // but hide PII.

        // Actually, let's simply require email to view detailed status to protect privacy.
        // Or at least, check if the email in order matches the provided email.

        let isVerified = false;
        if (email && order.customer_info && order.customer_info.email) {
            if (order.customer_info.email.toLowerCase() === email.toLowerCase()) {
                isVerified = true;
            }
        }

        // Return public info (status, model, price) + detailed info if verified
        const responseData = {
            id: order.id,
            status: order.status,
            model: order.model,
            capacity: order.capacity,
            created_at: order.created_at,
        };

        if (isVerified) {
            responseData.price = order.price;
            responseData.details = order.details;
            // Add tracking number if available later
        } else {
            // If email doesn't match or not provided, maybe obscure price? 
            // For now, let's just return basic info. 
            // Actually, for better UX, let's return limited info if email is wrong/missing 
            // OR return an error if we enforce email check.
            // Decision: To be safe, let's require email match for ANY data if we can,
            // but user might just have Order ID. 
            // Compromise: Require email for full details. 
        }

        // To keep it simple for the user "Check Status" form, we usually ask for both Order ID and Email.
        if (email && !isVerified) {
            return NextResponse.json({ error: 'Email does not match order records' }, { status: 403 });
        }

        return NextResponse.json({
            success: true,
            order: isVerified ? order : responseData // If verified return full, else partial
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
