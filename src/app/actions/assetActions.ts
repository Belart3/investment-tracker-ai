"use server"
import { AssetFormSchema, FormState } from "@/lib/definitions";
import { addAsset } from "@/lib/asset";
import { deleteAssetById } from "@/lib/asset";


export async function addAssetAction(state: FormState, formData: FormData): Promise<FormState> {

    const validatedFields = AssetFormSchema.safeParse({
        assetSymbol: formData.get('assetSymbol'),
        quantity: formData.get('assetQuantity') ? Number(formData.get('assetQuantity')) : NaN,
        purchasePrice: formData.get('purchasePrice') ? Number(formData.get('purchasePrice')) : NaN,
        transactionDate: formData.get('transactionDate'),
        notes: formData.get('notes'),
    })

    if (!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const {assetSymbol, quantity, purchasePrice, transactionDate, notes} = validatedFields.data;
    console.log('Adding asset with data:', validatedFields.data);

    try {
        const newAsset = await addAsset(assetSymbol, quantity, purchasePrice, transactionDate, notes);
        console.log('Saved asset:', newAsset);
        if (!newAsset) {
            return {
                error: 'Failed to add asset. Please try again.',
            }
        }
        return {
            message: 'Asset added successfully',
        };
    } catch (error) {
        console.error('Error adding asset:', error);
        return {
            error: 'An unexpected error occurred. Please try again later.',
        };
    }
}

export async function deleteAssetAction(assetId: string) {
    try {
        const deleted = await deleteAssetById(assetId);
        if (!deleted) {
            return {
                error: 'Failed to delete asset. Please try again.',
            }
        }           
        return {
            message: 'Asset deleted successfully',
        };
    } catch (error) {
        return {
            error: 'An unexpected error occurred. Please try again later.',
        };
    }    
}