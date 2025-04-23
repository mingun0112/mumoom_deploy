"use client"
import {useActionState} from "react";

export async function addToCart(prevState: string, queryData: FormData) {
    const itemID = queryData.get('itemID');
    if (itemID === "1") {
        return "Added to cart";
    } else {
        // Add a fake delay to make waiting noticeable.
        await new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
        return "Couldn't add to cart: the item is sold out.";
    }
}

function AddToCartForm({ itemID, itemTitle }: { itemID: string; itemTitle: string }) {
    const [message, formAction, isPending] = useActionState(addToCart, "");
    return (
        <form action={formAction}>
            <h2>{itemTitle}</h2>
            <input type="hidden" name="itemID" value={itemID} />
            <button type="submit">Add to Cart</button>
            {isPending ? "Loading..." : message}
        </form>
    );
}

export default function RegisterTestPage() {


    return(
    <div><AddToCartForm itemID="1" itemTitle="JavaScript: The Definitive Guide" />
        <AddToCartForm itemID="2" itemTitle="JavaScript: The Good Parts" />
    </div>
)}