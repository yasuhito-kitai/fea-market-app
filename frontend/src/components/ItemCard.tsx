import { Item } from "../types/item";
import Image from "next/image";
import Link from "next/link";

type Props = {
    item: Item;
};

export const ItemCard = ({ item }: Props) => {
    return (
        <Link href={`/items/${item.id}`}>
        <div className="border rounded p-4">
            <Image src={item.image} alt={item.name} width={200} height={200} />
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-gray-700">¥{new Intl.NumberFormat("ja-JP").format(item.price)}</p>
            </div>
        </Link>
    );
};