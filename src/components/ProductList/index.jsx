import styles from "./styles.module.scss";

import { ProductCard } from "./ProductCard";

export const ProductList = ({ addProduct, productsSearchResults }) => {
  return (
    <div className="container">
      {productsSearchResults.length > 0 ? (
        <ul className={styles.products_list}>
          {productsSearchResults.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addProduct={() => addProduct(product)}
            />
          ))}
        </ul>
      ) : (
        <p>{productsSearchResults.length}</p>
      )}
    </div>
  );
};
