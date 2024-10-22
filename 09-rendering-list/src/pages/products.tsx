import CardProduct from "../components/Fragments/CardProduct.tsx";

const products = [
    {
        id: 1,
        name: "Wuthering Heights",
        price: "Rp 1.000.000",
        image: "/images/book-1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?"
    },
    {
        id: 2,
        name: "Jane Eyre",
        price: "Rp 1.000.000",
        image: "/images/book-2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?"
    },
    {
        id: 3,
        name: "The Picture of Dorian Gray",
        price: "Rp 1.000.000",
        image: "/images/book-3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?"
    },
    {
        id: 4,
        name: "The Great Gatsby",
        price: "Rp 1.000.000",
        image: "/images/book-4.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?"
    }
]

const ProductsPage = () => {
    return (
        <div className="flex justify-center py-5">
            {products.map((product) => (
                <CardProduct key={product.id}>
                    <CardProduct.Header hrefProps={"#"} srcProps={product.image} altProps={product.name}/>
                    <CardProduct.Body titleProps={product.name}>{product.description}</CardProduct.Body>
                    <CardProduct.Footer priceProps={product.price} />
                </CardProduct>
            ))}
        </div>
    )
}
export default ProductsPage
