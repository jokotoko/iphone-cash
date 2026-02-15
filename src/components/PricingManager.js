'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from '../app/admin/Admin.module.css';

export default function PricingManager() {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        const { data, error } = await supabase
            .from('models')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching models:', error);
            alert('Błąd pobierania modeli.');
        } else {
            setModels(data);
        }
        setLoading(false);
    };

    const handlePriceChange = (id, newPrice) => {
        setModels(models.map(model =>
            model.id === id ? { ...model, base_price: parseInt(newPrice) || 0 } : model
        ));
    };

    const saveChanges = async () => {
        setSaving(true);
        try {
            // Update all modified models
            // Ideally we should track dirty state, but for simplicity we update all or map
            const updates = models.map(model =>
                supabase.from('models').update({ base_price: model.base_price }).eq('id', model.id)
            );

            await Promise.all(updates);
            alert('Cennik zaktualizowany!');
        } catch (error) {
            console.error('Error saving prices:', error);
            alert('Wystąpił błąd podczas zapisywania.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Ładowanie cennika...</div>;

    return (
        <div className={styles.pricingContainer}>
            <div className={styles.pricingHeader}>
                <h2>Zarządzanie Cenami Bazowymi</h2>
                <button
                    onClick={saveChanges}
                    className={styles.saveButton}
                    disabled={saving}
                >
                    {saving ? 'Zapisywanie...' : 'Zapisz zmiany'}
                </button>
            </div>

            <div className={styles.pricingGrid}>
                {models.map(model => (
                    <div key={model.id} className={styles.pricingCard}>
                        <div className={styles.modelName}>{model.name}</div>
                        <div className={styles.priceInputWrapper}>
                            <input
                                type="number"
                                value={model.base_price}
                                onChange={(e) => handlePriceChange(model.id, e.target.value)}
                                className={styles.priceInput}
                            />
                            <span className={styles.currency}>zł</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
