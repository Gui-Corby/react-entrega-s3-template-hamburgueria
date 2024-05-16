import styles from "./styles.module.scss";
export const ProductCard = ({ product, addProduct }) => {
  return (
    <li className={styles.product_card}>
      <img src={product.img} alt={product.name} />
      <div className={styles.card_details}>
        <h3>{product.name}</h3>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.price}>
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <button onClick={addProduct}>Adicionar</button>
      </div>
    </li>
  );
};
