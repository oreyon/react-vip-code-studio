import CardProduct from "../components/Fragments/CardProduct.tsx";

const ProductsPage = () => {
    return (
        <div className="flex justify-center py-5">
        <CardProduct>
            <CardProduct.Header hrefProps={"#"} srcProps={'/images/book-1.jpg'} altProps={"products"}/>
            <CardProduct.Body titleProps={'Book'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?</CardProduct.Body>
            <CardProduct.Footer priceProps={'Rp 1.000.000'} />
        </CardProduct>
        </div>
    )
}
export default ProductsPage
